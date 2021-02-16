import { ipfs, json, Bytes, JSONValue, Value, log } from '@graphprotocol/graph-ts';

import {
  Lepton,
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
// import { loadOrCreateLeptonNFT } from './helpers/loadOrCreateLeptonNFT';
// import { trackLeptonNftCounts } from './helpers/trackLeptonNftCounts';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';

import { ADDRESS_ZERO } from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _lepton = loadOrCreateLepton(event.address);
  _lepton.owner = event.params.newOwner;
  _lepton.save();
}

export function handleMaxMintPerTxSet(event: MaxMintPerTxSet): void {
  log.info('TODO: handleMaxMintPerTxSet', []);
}

export function handleLeptonTypeAdded(event: LeptonTypeAdded): void {
  log.info('TODO: handleLeptonTypeAdded', []);
}

export function handleLeptonTypeUpdated(event: LeptonTypeUpdated): void {
  log.info('TODO: handleLeptonTypeUpdated', []);
}

export function handleLeptonMinted(event: LeptonMinted): void {
  log.info('TODO: handleLeptonMinted', []);
}

export function handleLeptonBatchMinted(event: LeptonBatchMinted): void {
  log.info('TODO: handleLeptonBatchMinted', []);
}

export function handlePausedStateSet(event: PausedStateSet): void {
  log.info('TODO: handlePausedStateSet', []);
}

export function handleTransfer(event: Transfer): void {
  log.info('TODO: handleTransfer', []);
}

export function handleTransferBatch(event: TransferBatch): void {
  log.info('TODO: handleTransferBatch', []);
}

export function handleApproval(event: Approval): void {
  log.info('TODO: handleApproval', []);
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('TODO: handleApprovalForAll', []);
}
