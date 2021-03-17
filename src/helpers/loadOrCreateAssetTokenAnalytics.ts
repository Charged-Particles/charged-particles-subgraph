import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AssetTokenAnalytics,
} from '../../generated/schema';

import { ZERO } from './common';

import { assetTokenId } from './idTemplates';


export function loadOrCreateAssetTokenAnalytics(
  assetTokenAddress: Address
): AssetTokenAnalytics {
  const id = assetTokenId(assetTokenAddress.toHex());
  let _assetTokenAnalytics = AssetTokenAnalytics.load(id);

  if (!_assetTokenAnalytics) {
    _assetTokenAnalytics = new AssetTokenAnalytics(id);
  
    _assetTokenAnalytics.totalAssetsLocked = ZERO;

    _assetTokenAnalytics.save();
  }

  return _assetTokenAnalytics as AssetTokenAnalytics;
}
