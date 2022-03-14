import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ProtonNFT,
} from '../../generated/schema';

import { protonNftId } from './idTemplates';

import {
  ZERO,
  getProtonOwnerOf,
  getProtonCreatorOf,
  getProtonTokenURI,
} from './common';


export function loadOrCreateProtonNFT(
  protonAddress: Address,
  tokenId: BigInt,
  version: string
): ProtonNFT {
  const id = protonNftId(protonAddress.toHex(), tokenId.toString());
  let _nft = ProtonNFT.load(id);

  if (!_nft) {
    _nft = new ProtonNFT(id);
    _nft.version = version;
    _nft.tokenAddress = protonAddress.toHex();
    _nft.tokenId = tokenId;
    _nft.proton = protonAddress.toHex();

    _nft.owner = getProtonOwnerOf(protonAddress, tokenId);
    _nft.creator = getProtonCreatorOf(protonAddress, tokenId);
    _nft.metadataUri = getProtonTokenURI(protonAddress, tokenId);

    _nft.salePrice = ZERO;
    _nft.resaleRoyalties = ZERO;
    _nft.overallSalesTotal = ZERO;

    _nft.save();
  }

  return _nft as ProtonNFT;
}
