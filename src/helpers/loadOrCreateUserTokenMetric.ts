import { Address } from '@graphprotocol/graph-ts';

import {
  UserTokenMetric
} from '../../generated/schema';

import { userTokenMetricId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateUserTokenMetric(
  userAddress: Address,
  assetTokenAddress: Address,
): UserTokenMetric {
  const id = userTokenMetricId(userAddress.toHex(), assetTokenAddress.toHex());
  let _userTokenMetric = UserTokenMetric.load(id);


  if (!_userTokenMetric) {
    _userTokenMetric = new UserTokenMetric(id);
    _userTokenMetric.totalInterestDischarged = ZERO;
    _userTokenMetric.totalMassReleased = ZERO;
    _userTokenMetric.lifetimeValueLocked = ZERO;
    _userTokenMetric.save();
  }

  return  _userTokenMetric as UserTokenMetric;
}
