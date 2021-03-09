import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftAnalytics,
} from '../../generated/schema';

import { ONE, ZERO } from './common';
import { nftAnalyticsId } from './idTemplates';

import { loadOrCreateNftAnalytics } from './loadOrCreateNftAnalytics';

export function updateNftAnalytics(
    contractAddress: Address,
    tokenId: BigInt,
    tokenSold: boolean,
    royaltiesClaimed: BigInt
): void {
    const id = nftAnalyticsId(contractAddress.toHex(), tokenId.toString())
    let _nftAnalytics = NftAnalytics.load(id);
    
    if (tokenSold) {
        _nftAnalytics.totalSales.plus(ONE);
    }

    if (royaltiesClaimed > ZERO) {
        _nftAnalytics.totalRoyalties.plus(royaltiesClaimed);
    }

    _nftAnalytics.save();
}