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

import { ADDRESS_ZERO, ONE } from './helpers/common';


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
  _nft.owner = event.params.receiver;
  _nft.save();

  const _lepton = loadOrCreateLepton(event.address);
  _lepton.totalMinted = _lepton.totalMinted.plus(ONE);
  _lepton.save();
}

export function handleLeptonBatchMinted(event: LeptonBatchMinted): void {
  // let startTokenId = event.params.tokenId;

  // for (let i = 0; i < event.params.count.toI32(); i++) {
  //   let _nft = loadOrCreateLeptonNFT(event.address, startTokenId.plus(BigInt.fromI32(i)));
  //   _nft.owner = event.params.receiver;
  //   _nft.save();
  // }

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

  if (event.params.from.toHex() == ADDRESS_ZERO) {
    const ipfsHashParts = _nft.metadataUri.split('/');
    const ipfsHash = ipfsHashParts[ipfsHashParts.length-1];
    // ipfs.mapJSON(ipfsHash, 'processProtonMetadata', Value.fromString(_nft.id));
    let data = ipfs.cat(ipfsHash)
    if (data) {
      processLeptonMetadata(json.fromBytes(data as Bytes), Value.fromString(_nft.id));
    }
  }
}

export function handleTransferBatch(event: TransferBatch): void {
  log.info('TODO: handleTransferBatch', []);
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
  const _approvedAllIndicator = BigInt.fromI32(-1);
  _approvedOperator.tokenIds.push(_approvedAllIndicator); //A value of -1 means approval for all tokens owned by ownerAddress
  _approvedOperator.save();
}



export function processLeptonMetadata(value: JSONValue, userData: Value): void {
  const leptonNftId = userData.toString();
  const leptonMetadata = value.toObject();
  if (leptonMetadata == null) {
    log.info('NO METADATA FOUND FOR LEPTON {}', [leptonNftId]);
  }

  const _nft = LeptonNFT.load(leptonNftId);
  _nft.name = leptonMetadata.get('name').toString();
  _nft.description = leptonMetadata.get('description').toString();
  _nft.external_url = leptonMetadata.get('external_url').toString();
  _nft.animation_url = leptonMetadata.get('animation_url').toString();
  _nft.youtube_url = leptonMetadata.get('youtube_url').toString();
  if (leptonMetadata.isSet('thumbnail')) {
    _nft.thumbnail = leptonMetadata.get('thumbnail').toString();
  }
  _nft.image = leptonMetadata.get('image').toString();
  _nft.symbol = leptonMetadata.get('symbol').toString();
  _nft.save();
}
