import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ChargedParticlesSet,
  Transfer,
  Approval,
  ApprovalForAll,
} from '../generated/Proton/Proton';

import { loadOrCreateProton } from './helpers/loadOrCreateProton';
import { loadOrCreateProtonNFT } from './helpers/loadOrCreateProtonNFT';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _proton = loadOrCreateProton(event.address);
  _proton.owner = event.params.newOwner;
  _proton.save();
}

export function handleChargedParticlesSet(event: ChargedParticlesSet): void {
  const _universe = loadOrCreateProton(event.address);
  _universe.chargedParticles = event.params.chargedParticles.toHex();
  _universe.save();
}

export function handleTransfer(event: Transfer): void {
  const _nft = loadOrCreateProtonNFT(event.address, event.params.tokenId);
  _nft.owner = event.params.to;
  _nft.save();
}

export function handleApproval(event: Approval): void {
  log.info('TODO: handleApproval', []);
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('TODO: handleApprovalForAll', []);
}
