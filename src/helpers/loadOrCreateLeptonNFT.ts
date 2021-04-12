import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  LeptonNFT,
} from '../../generated/schema';

import {
  Lepton as LeptonContract,
} from '../../generated/Lepton/Lepton';

import { leptonNftId } from './idTemplates';
import { ZERO } from './common';


export function loadOrCreateLeptonNFT(
  leptonAddress: Address,
  tokenId: BigInt,
  leptonVersion: string = '1'
): LeptonNFT {
  const id = leptonNftId(leptonAddress.toHex(), tokenId.toString());
  let _nft = LeptonNFT.load(id);

  if (!_nft) {
    _nft = new LeptonNFT(id);
    _nft.tokenId = tokenId;
    if (leptonVersion == '1') {
      _nft.lepton = leptonAddress.toHex();
    } else {
      _nft.lepton2 = leptonAddress.toHex();
    }

    const boundLepton = LeptonContract.bind(leptonAddress);
    _nft.metadataUri = boundLepton.tokenURI(tokenId);

    _nft.price = ZERO;
    _nft.supply = ZERO;
    _nft.multiplier = ZERO;
    _nft.bonus = ZERO;

    _nft.save();
  }

  return _nft as LeptonNFT;
}
