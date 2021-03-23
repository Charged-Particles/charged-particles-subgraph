import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import { ONE } from './common';

import { loadOrCreateNftAnalytic } from './loadOrCreateNftAnalytics';

export function updateNftAnalytics(
    contractAddress: Address,
    tokenId: BigInt,
    tokenSold: boolean,
    royaltiesClaimed: BigInt,
    salePrice: BigInt
): void {


    let _nftAnalytic = loadOrCreateNftAnalytic(contractAddress, tokenId)
    
    if (tokenSold === true) {
       _nftAnalytic.numSales = _nftAnalytic.numSales.plus(ONE);
    }
    _nftAnalytic.totalRoyalties = _nftAnalytic.totalRoyalties.plus(royaltiesClaimed);
    _nftAnalytic.totalSalesVolume = _nftAnalytic.totalSalesVolume.plus(salePrice)

    _nftAnalytic.save();
}