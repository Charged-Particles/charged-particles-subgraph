import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import { ONE } from './common';

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