import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  StandardNFT,
} from '../../generated/schema';

// import { standardNftId } from './idTemplates';
import {
  standardEntityId,
  getStandardNFTOwnerOf,
  getStandardNFTTokenURI,
} from './common';


export function loadOrCreateStandardNFT(
  tokenAddress: Address,
  tokenId: BigInt
): StandardNFT {
  const id = standardEntityId([tokenAddress.toHex(), tokenId.toString()]);
  let _nft = StandardNFT.load(id);

  if (!_nft) {
    _nft = new StandardNFT(id);
    _nft.tokenId = tokenId;
    _nft.tokenAddress = tokenAddress;

    _nft.owner = getStandardNFTOwnerOf(tokenAddress, tokenId);
    _nft.metadataUri = getStandardNFTTokenURI(tokenAddress, tokenId);
    _nft.save();
  }

  return _nft as StandardNFT;
}
