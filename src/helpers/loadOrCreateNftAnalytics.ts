import { Address, BigInt } from '@graphprotocol/graph-ts';

import {
  NftAnalytics,
} from '../../generated/schema';

import { nftId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateNftAnalytics(
  contractAddress: Address,
  tokenId: BigInt,
): NftAnalytics {
  const id = nftId(contractAddress.toHex(), tokenId.toString());
  let _nftAnalytics = NftAnalytics.load(id);
  
  if (!_nftAnalytics) {
      _nftAnalytics = new NftAnalytics(id);
      _nftAnalytics.contractAddress = contractAddress;
      _nftAnalytics.tokenId = tokenId;
      _nftAnalytics.totalSales = ZERO;
      _nftAnalytics.totalRoyalties = ZERO;
  }

  return _nftAnalytics as NftAnalytics;
}
