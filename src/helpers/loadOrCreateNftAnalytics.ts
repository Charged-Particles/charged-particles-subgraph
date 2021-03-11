import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftAnalytics,
} from '../../generated/schema';

import { ZERO } from './common';

import { nftId } from './idTemplates';


export function loadOrCreateNftAnalytics(
  contractAddress: Address,
  tokenId: BigInt): NftAnalytics {
    const id = nftId(contractAddress.toHex(), tokenId.toString());
    let _nftAnalytics = NftAnalytics.load(id);

    if (!_nftAnalytics) {
        _nftAnalytics = new NftAnalytics(id);
        _nftAnalytics.contractAddress = contractAddress;
        _nftAnalytics.tokenId = tokenId;
        _nftAnalytics.totalRoyalties = ZERO;
        _nftAnalytics.totalSales = ZERO;
        _nftAnalytics.save();
    }

    return _nftAnalytics as NftAnalytics;    
  }