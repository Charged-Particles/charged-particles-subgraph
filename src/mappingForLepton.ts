import { Wrapped, BigInt, JSONValue, Value } from '@graphprotocol/graph-ts';

import {
  LeptonNFT,
} from '../generated/schema';

import {
  OwnershipTransferred,
  MaxMintPerTxSet,
  LeptonTypeAdded,
  LeptonTypeUpdated,
  LeptonMinted,
  LeptonBatchMinted,
  PausedStateSet,
  Transfer,
  TransferBatch,
  Approval,
  ApprovalForAll,
} from '../generated/Lepton/Lepton';

import { loadOrCreateLepton } from './helpers/loadOrCreateLepton';
import { loadOrCreateLeptonClassification } from './helpers/loadOrCreateLeptonClassification';
import { loadOrCreateLeptonNFT } from './helpers/loadOrCreateLeptonNFT';
import { loadOrCreateApprovedOperator } from './helpers/loadOrCreateApprovedOperator';
import { loadOrCreateProfileMetric } from './helpers/loadOrCreateProfileMetric';

import { ADDRESS_ZERO, ONE, NEG_ONE, getStringValue, parseJsonFromIpfs } from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _lepton = loadOrCreateLepton(event.address);
  _lepton.owner = event.params.newOwner;
  _lepton.save();
}

export function handleMaxMintPerTxSet(event: MaxMintPerTxSet): void {
  const _lepton = loadOrCreateLepton(event.address);
  _lepton.maxMintPerTx = event.params.maxAmount;
  _lepton.save();
}

export function handleLeptonTypeAdded(event: LeptonTypeAdded): void {
  const _type = loadOrCreateLeptonClassification(event.address, event.params.bonus);
  _type.metadataUri = event.params.tokenUri;
  _type.price = event.params.price;
  _type.supply = event.params.supply;
  _type.multiplier = event.params.multiplier;
  _type.upperBounds = event.params.upperBounds;
  _type.save();

  const _lepton = loadOrCreateLepton(event.address);
  _lepton.maxSupply = _type.upperBounds;
  _lepton.save();
}

export function handleLeptonTypeUpdated(event: LeptonTypeUpdated): void {
  const _lepton = loadOrCreateLeptonClassification(event.address, event.params.bonus);
  _lepton.metadataUri = event.params.tokenUri;
  _lepton.price = event.params.price;
  _lepton.supply = event.params.supply;
  _lepton.multiplier = event.params.multiplier;
  _lepton.upperBounds = event.params.upperBounds;
  _lepton.save();
}

export function handleLeptonMinted(event: LeptonMinted): void {
  const _nft = loadOrCreateLeptonNFT(event.address, event.params.tokenId);

  const _nftMetadataUri = _nft.metadataUri;
  if (_nftMetadataUri) {
    const jsonData: Wrapped<JSONValue> | null = parseJsonFromIpfs(_nftMetadataUri);
    if (jsonData) {
      processLeptonMetadata(jsonData.inner, Value.fromString(_nft.id));
    }
  }

  const _lepton = loadOrCreateLepton(event.address);
  const _totalMinted = _lepton.totalMinted;
  if (_totalMinted) {
    _lepton.totalMinted = _totalMinted.plus(ONE);
  } else {
    _lepton.totalMinted = ONE;
  }
  _lepton.save();

  const _leptonBuyer = loadOrCreateProfileMetric(event.params.receiver);
  _leptonBuyer.buyLeptonCount = _leptonBuyer.buyLeptonCount.plus(ONE);
  _leptonBuyer.save();
}

export function handleLeptonBatchMinted(event: LeptonBatchMinted): void {
  //
  // WARNING: Event Param: tokenId is INCORRECT in this event - do not rely on it!
  //
  const _lepton = loadOrCreateLepton(event.address);
  const _totalMinted = _lepton.totalMinted;
  if (_totalMinted) {
    _lepton.totalMinted = _totalMinted.plus(event.params.count);
  } else {
    _lepton.totalMinted = event.params.count;
  }
  _lepton.save();

  const _leptonBuyer = loadOrCreateProfileMetric(event.params.receiver);
  _leptonBuyer.buyLeptonCount = _leptonBuyer.buyLeptonCount.plus(ONE);
  _leptonBuyer.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const _lepton = loadOrCreateLepton(event.address);
  _lepton.paused = event.params.isPaused;
  _lepton.save();
}

export function handleTransfer(event: Transfer): void {
  const _nft = loadOrCreateLeptonNFT(event.address, event.params.tokenId);
  _nft.owner = event.params.to;
  _nft.save();

  if (event.params.from.toHex() != ADDRESS_ZERO) {
    const _leptonSeller = loadOrCreateProfileMetric(event.params.from);
    _leptonSeller.transferLeptonCount = _leptonSeller.transferLeptonCount.plus(ONE);
    _leptonSeller.save();

    const _leptonBuyer = loadOrCreateProfileMetric(event.params.to);
    _leptonBuyer.transferLeptonCount = _leptonBuyer.transferLeptonCount.plus(ONE);
    _leptonBuyer.save();
  }

}

export function handleTransferBatch(event: TransferBatch): void {
  let nft: LeptonNFT;
  let tokenId: BigInt;
  let jsonData: Wrapped<JSONValue> | null;

  for (let i = 0, n = event.params.count.toI32(); i < n; i++) {
    tokenId = event.params.startTokenId.plus(BigInt.fromI32(i));
    nft = loadOrCreateLeptonNFT(event.address, tokenId);
    nft.owner = event.params.to;
    nft.save();

    if (event.params.from.toHex() == ADDRESS_ZERO) {
      const _nftMetadataUri = nft.metadataUri;
      if (_nftMetadataUri) {
        jsonData = parseJsonFromIpfs(_nftMetadataUri);
        if (jsonData) {
          processLeptonMetadata(jsonData.inner, Value.fromString(nft.id));
        }
      }
    }
    else {
      const _leptonSeller = loadOrCreateProfileMetric(event.params.from);
      _leptonSeller.transferLeptonCount = _leptonSeller.transferLeptonCount.plus(ONE);
      _leptonSeller.save();

      const _leptonBuyer = loadOrCreateProfileMetric(event.params.to);
      _leptonBuyer.transferLeptonCount = _leptonBuyer.transferLeptonCount.plus(ONE);
      _leptonBuyer.save();
    }
  }
}

export function handleApproval(event: Approval): void {
  const assetAddress = event.address;
  const ownerAddress = event.params.owner;
  const operatorAddress = event.params.approved;
  const tokenId = event.params.tokenId;

  const _approvedOperator = loadOrCreateApprovedOperator(assetAddress, ownerAddress, operatorAddress);
  let tokenIds = _approvedOperator.tokenIds;
  if (tokenIds) {
    tokenIds.push(tokenId);
  } else {
    tokenIds = [tokenId];
  }
  _approvedOperator.tokenIds = tokenIds;
  _approvedOperator.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  const assetAddress = event.address;
  const ownerAddress = event.params.owner;
  const operatorAddress = event.params.operator;

  const _approvedOperator = loadOrCreateApprovedOperator(assetAddress, ownerAddress, operatorAddress);
  const _approvedAllIndicator = NEG_ONE;
  let tokenIds = _approvedOperator.tokenIds;
  if (tokenIds) {
    tokenIds.push(_approvedAllIndicator); //A value of -1 means approval for all tokens owned by ownerAddress
  } else {
    tokenIds = [_approvedAllIndicator];
  }
  _approvedOperator.tokenIds = tokenIds;
  _approvedOperator.save();
}



export function processLeptonMetadata(value: JSONValue, userData: Value): void {
  const leptonNftId = userData.toString();
  const leptonMetadata = value.toObject();
  if (leptonMetadata == null) { return; }

  const _nft = LeptonNFT.load(leptonNftId);
  if (!_nft) { return; }

  _nft.name = getStringValue(leptonMetadata, 'name');
  _nft.description = getStringValue(leptonMetadata, 'description');
  _nft.external_url = getStringValue(leptonMetadata, 'external_url');
  _nft.animation_url = getStringValue(leptonMetadata, 'animation_url');
  _nft.youtube_url = getStringValue(leptonMetadata, 'youtube_url');
  _nft.thumbnail = getStringValue(leptonMetadata, 'thumbnail');
  _nft.image = getStringValue(leptonMetadata, 'image');
  _nft.symbol = getStringValue(leptonMetadata, 'symbol');

  _nft.save();
}
