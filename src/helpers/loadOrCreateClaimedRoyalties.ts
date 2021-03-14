import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { RoyaltiesClaimed } from '../../generated/Proton/Proton';

import {
  ClaimedRoyalties,
} from '../../generated/schema';

import { ZERO } from './common';

export function loadOrCreateClaimedRoyalties(
  accountAddress: Address,

): ClaimedRoyalties {
  const id = accountAddress.toHex();
  let _royalties = ClaimedRoyalties.load(id);

  if (!_royalties) {
    _royalties = new ClaimedRoyalties(id);
    _royalties.accountAddress = accountAddress;
    _royalties.royaltiesClaimed = ZERO;
    _royalties.save();
  }

  return _royalties as ClaimedRoyalties;
}
