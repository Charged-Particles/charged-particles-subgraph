import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftCreatorSettings,
} from '../../generated/schema';

import { nftCreatorSettingsId } from './idTemplates';


export function loadOrCreateNftCreatorSettings(
  chargedParticlesAddress: Address,
  contractAddress: Address,
  tokenId: BigInt,
  creatorAddress: Address,
): NftCreatorSettings {
  const id = nftCreatorSettingsId(contractAddress.toHex(), tokenId.toString(), creatorAddress.toHex());
  let _nftCreatorSettings = NftCreatorSettings.load(id);

  if (!_nftCreatorSettings) {
    _nftCreatorSettings = new NftCreatorSettings(id);
    _nftCreatorSettings.chargedParticles = chargedParticlesAddress.toHex();
    _nftCreatorSettings.contractAddress = contractAddress;
    _nftCreatorSettings.tokenId = tokenId;
    _nftCreatorSettings.creatorAddress = creatorAddress;
    _nftCreatorSettings.save();
  }

  return _nftCreatorSettings as NftCreatorSettings;
}
