import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AllowedAssetToken,
} from '../../generated/schema';

import { allowedAssetId } from './idTemplates';


export function loadOrCreateAllowedAsset(
  nftSettingsAddress: Address,
  nftContractAddress: Address,
  assetAddress: Address,
): AllowedAssetToken {
  const id = allowedAssetId(nftSettingsAddress.toHex(), nftContractAddress.toHex(), assetAddress.toHex());
  let _allowedAsset = AllowedAssetToken.load(id);

  if (!_allowedAsset) {
    _allowedAsset = new AllowedAssetToken(id);
    _allowedAsset.nftSettings = nftSettingsAddress.toHex();
    _allowedAsset.assetToken = assetAddress;
    _allowedAsset.isAllowed = false;
    _allowedAsset.save();
  }

  return _allowedAsset as AllowedAssetToken;
}
