import { Address } from '@graphprotocol/graph-ts';

import {
  NftState,
} from '../../generated/schema';

import { ADDRESS_ZERO } from './common';

export function trackLastKnownOwner(chargedNftState: NftState, owner: Address): void {
  if (chargedNftState.lastKnownOwner != owner) {
    chargedNftState.lastKnownOwner = owner;

    chargedNftState.dischargeApproval = Address.fromString(ADDRESS_ZERO);
    chargedNftState.releaseApproval = Address.fromString(ADDRESS_ZERO);
    chargedNftState.timelockApproval = Address.fromString(ADDRESS_ZERO);
    chargedNftState.save();
  }
}
