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
  PausedStateSet,
  Transfer,
  Approval,
  ApprovalForAll,
} from '../generated/Lepton2/Lepton2';

import { loadOrCreateLepton2 } from './helpers/loadOrCreateLepton2';
import { loadOrCreateLeptonClassification } from './helpers/loadOrCreateLeptonClassification';
import { loadOrCreateLeptonNFT } from './helpers/loadOrCreateLeptonNFT';
import { loadOrCreateApprovedOperator } from './helpers/loadOrCreateApprovedOperator';
import { loadOrCreateProfileMetric } from './helpers/loadOrCreateProfileMetric';

import { ADDRESS_ZERO, ONE, NEG_ONE, getStringValue, parseJsonFromIpfs } from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _lepton = loadOrCreateLepton2(event.address);
  _lepton.owner = event.params.newOwner;
  _lepton.save();
}

export function handleMaxMintPerTxSet(event: MaxMintPerTxSet): void {
  const _lepton = loadOrCreateLepton2(event.address);
  _lepton.maxMintPerTx = event.params.maxAmount;
  _lepton.save();
}

export function handleLeptonTypeAdded(event: LeptonTypeAdded): void {
  const _type = loadOrCreateLeptonClassification(event.address, event.params.bonus, '2');
  _type.metadataUri = event.params.tokenUri;
  _type.price = event.params.price;
  _type.supply = event.params.supply;
  _type.multiplier = event.params.multiplier;
  _type.upperBounds = event.params.upperBounds;
  _type.save();

  const _lepton = loadOrCreateLepton2(event.address);
  _lepton.maxSupply = _type.upperBounds;
  _lepton.save();
}

export function handleLeptonTypeUpdated(event: LeptonTypeUpdated): void {
  const _lepton = loadOrCreateLeptonClassification(event.address, event.params.bonus, '2');
  _lepton.metadataUri = event.params.tokenUri;
  _lepton.price = event.params.price;
  _lepton.supply = event.params.supply;
  _lepton.multiplier = event.params.multiplier;
  _lepton.upperBounds = event.params.upperBounds;
  _lepton.save();
}

export function handleLeptonMinted(event: LeptonMinted): void {
  // no-op
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const _lepton = loadOrCreateLepton2(event.address);
  _lepton.paused = event.params.isPaused;
  _lepton.save();
}

export function handleTransfer(event: Transfer): void {
  const _nft = loadOrCreateLeptonNFT(event.address, event.params.tokenId, '2');
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

  // Mint Transfer
  else {
    const _lepton = loadOrCreateLepton2(event.address);
    _lepton.totalMinted = _lepton.totalMinted.plus(ONE);
    _lepton.save();

    const _leptonBuyer = loadOrCreateProfileMetric(event.params.to);
    _leptonBuyer.buyLeptonCount = _leptonBuyer.buyLeptonCount.plus(ONE);
    _leptonBuyer.save();

    const jsonData: Wrapped<JSONValue> | null = parseJsonFromIpfs(_nft.metadataUri);
    if (jsonData != null) {
      processLeptonMetadata(jsonData.inner, Value.fromString(_nft.id));
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
