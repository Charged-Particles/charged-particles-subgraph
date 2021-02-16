import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ChargedParticlesSet,
  PhotonSet,
  ProtonTokenSet,
  LeptonTokenSet,
  EsaMultiplierSet,
  ElectrostaticAttraction,
  ElectrostaticDischarge,
} from '../generated/Universe/Universe';

import { loadOrCreateUniverse } from './helpers/loadOrCreateUniverse';
import { loadOrCreateIonToken } from './helpers/loadOrCreateIonToken';
import { loadOrCreateProton } from './helpers/loadOrCreateProton';
import { loadOrCreateLepton } from './helpers/loadOrCreateLepton';
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

export function handlePhotonSet(event: PhotonSet): void {
  const _ion = loadOrCreateIonToken(event.params.photonToken);
  const _universe = loadOrCreateUniverse(event.address);

  _ion.universe = _universe.id;
  _universe.ionToken = _ion.id;
  _universe.ionMaxSupply = event.params.maxSupply;

  _ion.save();
  _universe.save();
}

export function handleProtonTokenSet(event: ProtonTokenSet): void {
  const _proton = loadOrCreateProton(event.params.protonToken);
  const _universe = loadOrCreateUniverse(event.address);

  _proton.universe = _universe.id;
  _universe.protonToken = _proton.id;

  _proton.save();
  _universe.save();
}

export function handleLeptonTokenSet(event: LeptonTokenSet): void {
  const _lepton = loadOrCreateLepton(event.params.leptonToken);
  const _universe = loadOrCreateUniverse(event.address);
  _universe.leptonToken = _lepton.id;
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

export function handleElectrostaticDischarge(event: ElectrostaticDischarge): void {
  log.info('TODO: handleElectrostaticDischarge', []);
}
