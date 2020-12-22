import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveAssetTokenBalance,
} from '../../generated/schema';

import { ZERO } from './common';
import { assetTokenBalanceId } from './idTemplates';


export function loadOrCreateAaveAssetTokenBalance(
  aaveSmartWalletId: string,
  assetTokenAddress: Address,
  contractAddress: Address,
  tokenId: BigInt
): AaveAssetTokenBalance {
  const id = assetTokenBalanceId(assetTokenAddress.toHex(), contractAddress.toHex(), tokenId.toString());
  let _assetTokenBalance = AaveAssetTokenBalance.load(id);

  if (!_assetTokenBalance) {
    _assetTokenBalance = new AaveAssetTokenBalance(id);
    _assetTokenBalance.assetToken = assetTokenAddress;
    _assetTokenBalance.tokenId = tokenId;
    _assetTokenBalance.contractAddress = contractAddress;
    _assetTokenBalance.smartWallet = aaveSmartWalletId;
    _assetTokenBalance.principal = ZERO;
    _assetTokenBalance.ownerInterestDischarged = ZERO;
    _assetTokenBalance.creatorInterestDischarged = ZERO;
    _assetTokenBalance.depositFee = ZERO;
    _assetTokenBalance.save();
  }

  return _assetTokenBalance as AaveAssetTokenBalance;
}
