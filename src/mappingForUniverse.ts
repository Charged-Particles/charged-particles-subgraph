import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ChargedParticlesSet,
  IonTokenSet,
  IonRewardsMultiplierSet,
  RewardIssued,
} from '../generated/Universe/Universe';

import { loadOrCreateUniverse } from './helpers/loadOrCreateUniverse';
import { loadOrCreateIonToken } from './helpers/loadOrCreateIonToken';
import { loadOrCreateIonRewardsMultiplier } from './helpers/loadOrCreateIonRewardsMultiplier';



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

export function handleIonTokenSet(event: IonTokenSet): void {
  const _ion = loadOrCreateIonToken(event.params.ionToken);
  const _universe = loadOrCreateUniverse(event.address);

  _ion.universe = _universe.id;
  _universe.ionToken = _ion.id;

  _ion.save();
  _universe.save();
}

export function handleIonRewardsMultiplierSet(event: IonRewardsMultiplierSet): void {
  const _ionRewardsMultiplier = loadOrCreateIonRewardsMultiplier(event.address, event.params.assetToken);
  _ionRewardsMultiplier.multiplier = event.params.multiplier;
  _ionRewardsMultiplier.save();
}

export function handleRewardIssued(event: RewardIssued): void {
  log.info('TODO: handleRewardIssued', []);
}
