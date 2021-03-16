import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftAnalytics,
} from '../../generated/schema';

import { ONE, ZERO } from './common';

import { nftId } from './idTemplates';
import { loadOrCreateNftAnalytics } from './loadOrCreateNftAnalytics';

export function updateNftAnalytics(
    contractAddress: Address,
    tokenId: BigInt,
    tokenSold: boolean,
    royaltiesClaimed: BigInt
): void {

    let _nftAnalytics = loadOrCreateNftAnalytics(contractAddress, tokenId)
    
    if (tokenSold === true) {
       _nftAnalytics.totalSales = _nftAnalytics.totalSales.plus(ONE);
    }

    if (royaltiesClaimed) {
        _nftAnalytics.totalRoyalties = _nftAnalytics.totalRoyalties.plus(royaltiesClaimed);
    }

    _nftAnalytics.save();
}