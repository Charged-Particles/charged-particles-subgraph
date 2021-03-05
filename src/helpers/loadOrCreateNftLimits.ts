import { Address } from '@graphprotocol/graph-ts';

import {
  NftLimits
} from '../../generated/schema';

import { NftLimitsId } from './idTemplates';

import { ZERO } from './common';

export function loadOrCreateNftLimits(
  contractAddress: Address,
  assetTokenAddress: Address,
): NftLimits {
  const id = NftLimitsId(contractAddress.toHex(), assetTokenAddress.toHex());
  let _nftLimit = NftLimits.load(id);


  if (!_nftLimit) {
    _nftLimit = new NftLimits(id);
    _nftLimit.nftSettings = contractAddress.toHex();
    _nftLimit.tokenAddress = assetTokenAddress;
    _nftLimit.maxNfts = ZERO;
    _nftLimit.save();
  }

  return  _nftLimit as NftLimits;
}
