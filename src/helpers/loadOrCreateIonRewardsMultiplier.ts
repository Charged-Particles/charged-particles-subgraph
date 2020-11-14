import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  IonRewardsMultiplier,
} from '../../generated/schema';

import { ionRewardsMultiplierId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateIonRewardsMultiplier(
  universeAddress: Address,
  assetTokenAddress: Address,
): IonRewardsMultiplier {
  const id = ionRewardsMultiplierId(universeAddress.toHex(), assetTokenAddress.toHex());
  let _ionRewardsMultiplier = IonRewardsMultiplier.load(id);

  if (!_ionRewardsMultiplier) {
    _ionRewardsMultiplier = new IonRewardsMultiplier(id);
    _ionRewardsMultiplier.universe = universeAddress.toHex();
    _ionRewardsMultiplier.assetToken = assetTokenAddress;
    _ionRewardsMultiplier.multiplier = ZERO;
    _ionRewardsMultiplier.save();
  }

  return _ionRewardsMultiplier as IonRewardsMultiplier;
}
