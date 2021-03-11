import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftAnalytics,
} from '../../generated/schema';

import { ONE, ZERO } from './common';

import { nftId } from './idTemplates';

export function updateNftAnalytics(
    contractAddress: Address,
    tokenId: BigInt,
    tokenSold: boolean,
    royaltiesClaimed: BigInt
): void {

    let id = nftId(contractAddress.toHex(), tokenId.toString());
    let _nftAnalytics = NftAnalytics.load(id);
    
    if (!_nftAnalytics) {
        _nftAnalytics = new NftAnalytics(id);
        _nftAnalytics.contractAddress = contractAddress;
        _nftAnalytics.tokenId = tokenId;
        _nftAnalytics.totalSales = ZERO;
        _nftAnalytics.totalRoyalties = ZERO;
    }
    if (tokenSold === true) {
        _nftAnalytics.totalSales.plus(ONE);
    }

    if (royaltiesClaimed > ZERO) {
        _nftAnalytics.totalRoyalties.plus(royaltiesClaimed);
    }

    _nftAnalytics.save();
}