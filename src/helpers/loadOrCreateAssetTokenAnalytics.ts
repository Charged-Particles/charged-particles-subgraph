import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AssetTokenAnalytic,
} from '../../generated/schema';

import { ZERO } from './common';

import { assetTokenId } from './idTemplates';


export function loadOrCreateAssetTokenAnalytics(
  assetTokenAddress: Address
): AssetTokenAnalytic {
  const id = assetTokenId(assetTokenAddress.toHex());
  let _assetTokenAnalytics = AssetTokenAnalytic.load(id);

  if (!_assetTokenAnalytics) {
    _assetTokenAnalytics = new AssetTokenAnalytic(id);
  
    _assetTokenAnalytics.totalAssetsLocked = ZERO;
    _assetTokenAnalytics.totalAssetsLockedAave = ZERO;
    _assetTokenAnalytics.totalAssetsLockedERC20 = ZERO;
    
    _assetTokenAnalytics.save();
  }

  return _assetTokenAnalytics as AssetTokenAnalytic;
}
