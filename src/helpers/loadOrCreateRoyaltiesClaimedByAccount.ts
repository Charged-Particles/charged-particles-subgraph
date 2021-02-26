import { Address, BigInt, log } from '@graphprotocol/graph-ts';
import { RoyaltiesClaimed } from '../../generated/Proton/Proton';

import {
  RoyaltiesClaimedByAccount,
} from '../../generated/schema';

import { ZERO } from './common';

import { royaltiesClaimedId } from './idTemplates';

export function loadOrCreateGenericRoyaltiesClaimedByAccount(
  accountAddress: Address,

): RoyaltiesClaimedByAccount {
  const id = royaltiesClaimedId(accountAddress.toHex());
  let _royaltiesClaimedByAccount = RoyaltiesClaimedByAccount.load(id);

  if (!_royaltiesClaimedByAccount) {
    _royaltiesClaimedByAccount = new RoyaltiesClaimedByAccount(id);
    _royaltiesClaimedByAccount.accountAddress = accountAddress;
    _royaltiesClaimedByAccount.royaltiesClaimed = ZERO;
    _royaltiesClaimedByAccount.save();
  }

  return _royaltiesClaimedByAccount as RoyaltiesClaimedByAccount;
}
