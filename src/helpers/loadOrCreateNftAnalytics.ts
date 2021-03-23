import { Address, BigInt } from '@graphprotocol/graph-ts';

import {
  NftAnalytic,
} from '../../generated/schema';

import { nftId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateNftAnalytic(
  contractAddress: Address,
  tokenId: BigInt,
): NftAnalytic {

  const id = nftId(contractAddress.toHex(), tokenId.toString());
  let _nftAnalytic = NftAnalytic.load(id);

  if (!_nftAnalytic) {
    _nftAnalytic = new NftAnalytic(id);
    _nftAnalytic.contractAddress = contractAddress;
    _nftAnalytic.tokenId = tokenId;
    _nftAnalytic.totalSalesVolume = ZERO;
    _nftAnalytic.totalRoyalties = ZERO;
    _nftAnalytic.numSales = ZERO;
    _nftAnalytic.save();
  }
  return _nftAnalytic as NftAnalytic;
}
