import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { RoyaltiesClaimed } from '../../generated/Universe/Proton';

import {
  UserRoyalty,
} from '../../generated/schema';

import { ZERO } from './common';

export function loadOrCreateUserRoyalty(
  accountAddress: Address,

): UserRoyalty {
  const id = accountAddress.toHex();
  let _royalties = UserRoyalty.load(id);

  if (!_royalties) {
    _royalties = new UserRoyalty(id);
    _royalties.accountAddress = accountAddress;
    _royalties.royaltiesClaimed = ZERO;
    _royalties.claimableRoyalties = ZERO;
    _royalties.save();
  }

  return _royalties as UserRoyalty;
}
