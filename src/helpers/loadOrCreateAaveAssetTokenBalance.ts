import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveAssetTokenBalance,
} from '../../generated/schema';

import {
  ERC20 as AssetContract,
} from '../../generated/AaveWalletManager/ERC20';

import { ZERO } from './common';
import { tokenBalanceId } from './idTemplates';


export function loadOrCreateAaveAssetTokenBalance(
  aaveSmartWalletId: string,
  assetTokenAddress: Address,
  contractAddress: Address,
  tokenId: BigInt
): AaveAssetTokenBalance {
  const id = tokenBalanceId(assetTokenAddress.toHex(), contractAddress.toHex(), tokenId.toString());
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

    const boundAssetToken = AssetContract.bind(assetTokenAddress);
    _assetTokenBalance.decimals = BigInt.fromI32(boundAssetToken.decimals());

    _assetTokenBalance.save();
  }

  return _assetTokenBalance as AaveAssetTokenBalance;
}
