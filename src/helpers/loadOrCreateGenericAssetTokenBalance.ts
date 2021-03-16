import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  GenericAssetTokenBalance,
} from '../../generated/schema';

import {
  ERC20 as AssetContract,
} from '../../generated/GenericWalletManager/ERC20';

import { ZERO } from './common';
import { tokenBalanceId } from './idTemplates';


export function loadOrCreateGenericAssetTokenBalance(
  genericSmartWalletId: string,
  assetTokenAddress: Address,
  contractAddress: Address,
  tokenId: BigInt
): GenericAssetTokenBalance {
  const id = tokenBalanceId(assetTokenAddress.toHex(), contractAddress.toHex(), tokenId.toString());
  let _assetTokenBalance = GenericAssetTokenBalance.load(id);

  if (!_assetTokenBalance) {
    _assetTokenBalance = new GenericAssetTokenBalance(id);
    _assetTokenBalance.assetToken = assetTokenAddress;
    _assetTokenBalance.tokenId = tokenId;
    _assetTokenBalance.contractAddress = contractAddress;
    _assetTokenBalance.smartWallet = genericSmartWalletId;
    _assetTokenBalance.principal = ZERO;

    const boundAssetToken = AssetContract.bind(assetTokenAddress);
    _assetTokenBalance.name = boundAssetToken.name();
    _assetTokenBalance.symbol = boundAssetToken.symbol();
    _assetTokenBalance.decimals = BigInt.fromI32(boundAssetToken.decimals());

    _assetTokenBalance.save();
  }

  return _assetTokenBalance as GenericAssetTokenBalance;
}
