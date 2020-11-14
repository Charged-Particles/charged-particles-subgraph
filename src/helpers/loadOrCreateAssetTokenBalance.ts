import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AssetTokenBalance,
} from '../../generated/schema';

import { ZERO } from './common';
import { assetTokenBalanceId } from './idTemplates';


export function loadOrCreateAssetTokenBalance(
  assetTokenAddress: Address,
  tokenUuid: BigInt
): AssetTokenBalance {
  const id = assetTokenBalanceId(assetTokenAddress.toHex(), tokenUuid.toString());
  let _assetTokenBalance = AssetTokenBalance.load(id);

  if (!_assetTokenBalance) {
    _assetTokenBalance = new AssetTokenBalance(id);
    _assetTokenBalance.assetToken = assetTokenAddress;
    _assetTokenBalance.tokenUuid = tokenUuid;
    _assetTokenBalance.balance = ZERO;
    _assetTokenBalance.interestDischarged = ZERO;
    _assetTokenBalance.save();
  }

  return _assetTokenBalance as AssetTokenBalance;
}
