import {
  ProtonNftCount,
} from '../../generated/schema';

import {
  Transfer,
} from '../../generated/Proton/Proton';

import { ADDRESS_ZERO, ZERO, ONE } from './common';


function _getCountsObj(id: string):ProtonNftCount {
  let counts = ProtonNftCount.load(id);
  if (!counts) {
    counts = new ProtonNftCount(id);
    counts.createdCount = ZERO;
    counts.ownedCount = ZERO;
  }
  return counts as ProtonNftCount;
};


export function trackProtonNftCounts(
  event: Transfer
): void {

  let counts: ProtonNftCount;
  const from = event.params.from.toHex();
  const to = event.params.to.toHex();

  // Mint
  if (from == ADDRESS_ZERO) {
    counts = _getCountsObj(to);
    counts.createdCount = counts.createdCount.plus(ONE);
    counts.ownedCount = counts.ownedCount.plus(ONE);
    counts.save();
  }

  // Burn
  else if (to == ADDRESS_ZERO) {
    counts = _getCountsObj(from);
    counts.ownedCount = counts.ownedCount.minus(ONE);
    counts.save();
  }

  // Transfer
  else {
    // From
    counts = _getCountsObj(from);
    counts.ownedCount = counts.ownedCount.minus(ONE);
    counts.save();

    // To
    counts = _getCountsObj(to);
    counts.ownedCount = counts.ownedCount.plus(ONE);
    counts.save();
  }
}
