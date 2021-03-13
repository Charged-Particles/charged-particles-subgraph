import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ProtonNFT,
} from '../../generated/schema';

import {
  Proton as ProtonContract,
} from '../../generated/Proton/Proton';

import { protonNftId } from './idTemplates';
import { ZERO } from './common';


export function loadOrCreateProtonNFT(
  protonAddress: Address,
  tokenId: BigInt
): ProtonNFT {
  const id = protonNftId(protonAddress.toHex(), tokenId.toString());
  let _nft = ProtonNFT.load(id);

  if (!_nft) {
    _nft = new ProtonNFT(id);
    _nft.tokenId = tokenId;
    _nft.proton = protonAddress.toHex();

    const boundProton = ProtonContract.bind(protonAddress);
    _nft.owner = boundProton.ownerOf(tokenId);
    _nft.creator = boundProton.creatorOf(tokenId);
    _nft.metadataUri = boundProton.tokenURI(tokenId);

    _nft.salePrice = ZERO;
    _nft.resaleRoyalties = ZERO;
    _nft.overallSalesTotal = ZERO;

    _nft.save();
  }

  return _nft as ProtonNFT;
}
