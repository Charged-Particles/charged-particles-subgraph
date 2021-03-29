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
    _profileMetric.mintProtonCount = ZERO;
    _profileMetric.buyProtonCount = ZERO;
    _profileMetric.sellProtonCount = ZERO;
    _profileMetric.buyLeptonCount = ZERO;
    _profileMetric.royaltiesClaimedCount = ZERO;
    _profileMetric.transferLeptonCount = ZERO;
    _profileMetric.releaseMassCount = ZERO;
    _profileMetric.dischargeInterestCount = ZERO;
    _profileMetric.energizeAaveCount = ZERO;
    _profileMetric.energizeERC20Count = ZERO;
    _profileMetric.save();
  }

  return _profileMetric as ProfileMetric;
}
