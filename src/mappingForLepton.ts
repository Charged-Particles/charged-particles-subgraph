import { ipfs, json, BigInt, Bytes, JSONValue, Value, log } from '@graphprotocol/graph-ts';

import {
  Lepton,
  LeptonNFT,
  NFTAttributes,
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

import { nftAttributeId } from './helpers/idTemplates';
import { loadOrCreateLepton } from './helpers/loadOrCreateLepton';
import { loadOrCreateLeptonClassification } from './helpers/loadOrCreateLeptonClassification';
import { loadOrCreateLeptonNFT } from './helpers/loadOrCreateLeptonNFT';
// import { trackLeptonNftCounts } from './helpers/trackLeptonNftCounts';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import { loadOrCreateApprovedOperator } from './helpers/loadOrCreateApprovedOperator';

import { ADDRESS_ZERO, ONE, NEG_ONE, getStringValue } from './helpers/common';


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
  const ipfsHashParts = _nft.metadataUri.split('/');
  const ipfsHash = ipfsHashParts[ipfsHashParts.length - 1];
  let data = ipfs.cat(ipfsHash)
  if (data) {
    processLeptonMetadata(json.fromBytes(data as Bytes), Value.fromString(_nft.id));
  }

  const _lepton = loadOrCreateLepton(event.address);
  _lepton.totalMinted = _lepton.totalMinted.plus(ONE);
  _lepton.save();
}

export function handleLeptonBatchMinted(event: LeptonBatchMinted): void {
  //
  // WARNING: Event Param: tokenId is INCORRECT in this event - do not rely on it!
  //
  const _lepton = loadOrCreateLepton(event.address);
  _lepton.totalMinted = _lepton.totalMinted.plus(event.params.count);
  _lepton.save();
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
}

export function handleTransferBatch(event: TransferBatch): void {
  let nft: LeptonNFT;
  let tokenId: BigInt;
  let ipfsHashParts: string[];
  let ipfsHash: string;
  let data: Bytes;
  for (let i = 0, n = event.params.count.toI32(); i < n; i++) {
    tokenId = event.params.startTokenId.plus(BigInt.fromI32(i));
    nft = loadOrCreateLeptonNFT(event.address, tokenId);
    nft.owner = event.params.to;
    nft.save();

    if (event.params.from.toHex() == ADDRESS_ZERO) {
      ipfsHashParts = nft.metadataUri.split('/');
      ipfsHash = ipfsHashParts[ipfsHashParts.length - 1];
      data = ipfs.cat(ipfsHash) as Bytes;
      if (data) {
        processLeptonMetadata(json.fromBytes(data as Bytes), Value.fromString(nft.id));
      }
    }
  }
}

export function handleApproval(event: Approval): void {
  const assetAddress = event.address;
  const ownerAddress = event.params.owner;
  const operatorAddress = event.params.approved;
  const tokenId = event.params.tokenId;

  const _approvedOperator = loadOrCreateApprovedOperator(assetAddress, ownerAddress, operatorAddress);
  _approvedOperator.tokenIds.push(tokenId);
  _approvedOperator.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  const assetAddress = event.address;
  const ownerAddress = event.params.owner;
  const operatorAddress = event.params.operator;

  const _approvedOperator = loadOrCreateApprovedOperator(assetAddress, ownerAddress, operatorAddress);
  const _approvedAllIndicator = NEG_ONE;
  _approvedOperator.tokenIds.push(_approvedAllIndicator); //A value of -1 means approval for all tokens owned by ownerAddress
  _approvedOperator.save();
}



export function processLeptonMetadata(value: JSONValue, userData: Value): void {
  const leptonNftId = userData.toString();
  const leptonMetadata = value.toObject();
  if (leptonMetadata == null) {
    log.info('NO METADATA FOUND FOR LEPTON {}', [leptonNftId]);
    return;
  }

  const _nft = LeptonNFT.load(leptonNftId);
  if (!_nft) {
    log.info('FAILED TO LOAD OBJECT FOR LEPTON {}', [leptonNftId]);
    return;
  }

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
