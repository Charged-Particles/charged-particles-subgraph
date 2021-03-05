import { Address } from '@graphprotocol/graph-ts';

import {
  MaxNfts
} from '../../generated/schema';

import { maxNftsId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateMaxNfts(
  contractAddress: Address,
  assetTokenAddress: Address,
): MaxNfts {
  const id = maxNftsId(contractAddress.toHex(), assetTokenAddress.toHex());
  let _maxNfts = MaxNfts.load(id);


  if (!_maxNfts) {
    _maxNfts = new MaxNfts(id);
    _maxNfts.nftSettings = contractAddress.toHex();
    _maxNfts.tokenAddress = assetTokenAddress;
    _maxNfts.maxNfts = ZERO;
    _maxNfts.save();
  }

  return  _maxNfts as MaxNfts;
}
