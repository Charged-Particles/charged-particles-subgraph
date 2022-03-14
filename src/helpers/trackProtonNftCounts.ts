import {
  ProtonNftCount,
} from '../../generated/schema';

import {
  Transfer as TransferA,
} from '../../generated/Proton/Proton';

import {
  Transfer as TransferB,
} from '../../generated/ProtonB/ProtonB';

import { ADDRESS_ZERO, ZERO, ONE } from './common';
import { loadOrCreatePlatformMetric } from './loadOrCreatePlatformMetric';
import { Address } from '@graphprotocol/graph-ts';


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
  event: TransferA
): void {
  const from = event.params.from.toHex();
  const to = event.params.to.toHex();
  _trackProtonNftCounts(event.address, from, to);
}


export function trackProtonNftCountsB(
  event: TransferB
): void {
  const from = event.params.from.toHex();
  const to = event.params.to.toHex();
  _trackProtonNftCounts(event.address, from, to);
}


function _trackProtonNftCounts(
  address: Address,
  from: string,
  to: string
): void {

  let counts: ProtonNftCount;

  // Mint
  if (from == ADDRESS_ZERO) {
    counts = _getCountsObj(to);
    counts.createdCount = counts.createdCount.plus(ONE);
    counts.ownedCount = counts.ownedCount.plus(ONE);
    counts.save();

    const platformMetric = loadOrCreatePlatformMetric(address);
    platformMetric.platformProtonsMinted = platformMetric.platformProtonsMinted.plus(ONE);
    platformMetric.save();
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
