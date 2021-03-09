import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftAnalytics,
} from '../../generated/schema';

import { ZERO } from './common';

import { nftAnalyticsId } from './idTemplates';


export function loadOrCreateNftAnalytics(
  contractAddress: Address,
  tokenId: BigInt): NftAnalytics {
    const id = nftAnalyticsId(contractAddress.toHex(), tokenId.toString());
    let _nftAnalytics = NftAnalytics.load(id);

    if (!_nftAnalytics) {
        _nftAnalytics.id = id;
        _nftAnalytics.contractAddress = contractAddress;
        _nftAnalytics.tokenId = tokenId;
        _nftAnalytics.totalRoyalties = ZERO;
        _nftAnalytics.totalSales = ZERO;
        _nftAnalytics.save();
    }

    return _nftAnalytics as NftAnalytics;    
  }