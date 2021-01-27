import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ChargedParticlesSet,
  CationSet,
  EsaMultiplierSet,
  ElectrostaticAttraction,
  MetallicBond,
} from '../generated/Universe/Universe';

import { loadOrCreateUniverse } from './helpers/loadOrCreateUniverse';
import { loadOrCreateIonToken } from './helpers/loadOrCreateIonToken';
import { loadOrCreateEsaMultiplier } from './helpers/loadOrCreateEsaMultiplier';



export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _universe = loadOrCreateUniverse(event.address);
  _universe.owner = event.params.newOwner;
  _universe.save();
}

export function handleChargedParticlesSet(event: ChargedParticlesSet): void {
  const _universe = loadOrCreateUniverse(event.address);
  _universe.chargedParticles = event.params.chargedParticles.toHex();
  _universe.save();
}

export function handleCationSet(event: CationSet): void {
  const _ion = loadOrCreateIonToken(event.params.token);
  const _universe = loadOrCreateUniverse(event.address);

  _ion.universe = _universe.id;
  _universe.ionToken = _ion.id;
  _universe.ionMaxSupply = event.params.maxSupply;

  _ion.save();
  _universe.save();
}

export function handleEsaMultiplierSet(event: EsaMultiplierSet): void {
  const _esaMultiplier = loadOrCreateEsaMultiplier(event.address, event.params.assetToken);
  _esaMultiplier.multiplier = event.params.multiplier;
  _esaMultiplier.save();
}

export function handleElectrostaticAttraction(event: ElectrostaticAttraction): void {
  log.info('TODO: handleElectrostaticAttraction', []);
}

export function handleMetallicBond(event: MetallicBond): void {
  log.info('TODO: handleMetallicBond', []);
}
