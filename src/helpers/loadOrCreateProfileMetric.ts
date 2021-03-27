import { Address } from '@graphprotocol/graph-ts';

import {
  ProfileMetric,
} from '../../generated/schema';
import { ZERO } from './common';

import { profileMetricId } from './idTemplates';

export function loadOrCreateProfileMetric(
  userAddress: Address,
): ProfileMetric {
  const id = profileMetricId(userAddress.toHex());
  let _profileMetric = ProfileMetric.load(id);

  if (!_profileMetric) {
    _profileMetric = new ProfileMetric(id);
    _profileMetric.totalEthEarned = ZERO;
    _profileMetric.mintProton = ZERO;
    _profileMetric.buyProton = ZERO;
    _profileMetric.sellProton = ZERO;
    _profileMetric.buyLepton = ZERO;
    _profileMetric.royaltiesClaimed = ZERO;
    _profileMetric.transferLepton = ZERO;
    _profileMetric.releaseMass = ZERO;
    _profileMetric.dischargeInterest = ZERO;
    _profileMetric.energizeAave = ZERO;
    _profileMetric.energizeERC20 = ZERO;
    _profileMetric.save();
  }

  return _profileMetric as ProfileMetric;
}
