import { Address } from '@graphprotocol/graph-ts';

import {
  PlatformMetric
} from '../../generated/schema';

import { ZERO } from './common';

export function loadOrCreatePlatformMetric(
  contractAddress: Address
): PlatformMetric {
  const id = contractAddress.toHex();
  let _platformMetric = PlatformMetric.load(id);


  if (!_platformMetric) {
    _platformMetric = new PlatformMetric(id);
    _platformMetric.platformEthEarned = ZERO;
    _platformMetric.platformInterestDischarged = ZERO;
    _platformMetric.platformProtonsMinted = ZERO;
    _platformMetric.save();
  }

  return  _platformMetric as PlatformMetric;
}
