import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveAssetTokenBalance,
} from '../../generated/schema';

import { ZERO } from './common';
import { assetTokenBalanceId } from './idTemplates';


export function loadOrCreateAaveAssetTokenBalance(
  aaveSmartWalletId: string,
  assetTokenAddress: Address,
  tokenUuid: BigInt
): AaveAssetTokenBalance {
  const id = assetTokenBalanceId(assetTokenAddress.toHex(), tokenUuid.toString());
  let _assetTokenBalance = AaveAssetTokenBalance.load(id);

  if (!_assetTokenBalance) {
    _assetTokenBalance = new AaveAssetTokenBalance(id);
    _assetTokenBalance.assetToken = assetTokenAddress;
    _assetTokenBalance.tokenUuid = tokenUuid;
    _assetTokenBalance.smartWallet = aaveSmartWalletId;
    _assetTokenBalance.principal = ZERO;
    _assetTokenBalance.ownerInterestDischarged = ZERO;
    _assetTokenBalance.creatorInterestDischarged = ZERO;
    _assetTokenBalance.save();
  }

  return _assetTokenBalance as AaveAssetTokenBalance;
}
