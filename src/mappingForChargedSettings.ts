import { Address, ByteArray, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  DepositCapSet,
  TempLockExpirySet,
  WalletManagerRegistered,
  BasketManagerRegistered,
  RequiredWalletManagerSet,
  RequiredBasketManagerSet,
  AssetTokenRestrictionsSet,
  AllowedAssetTokenSet,
  AssetTokenLimitsSet,
  MaxNftsSet,
  TokenCreatorConfigsSet,
  TokenCreatorAnnuitiesRedirected,
  PermsSetForCharge,
  PermsSetForBasket,
  PermsSetForTimelockAny,
  PermsSetForTimelockSelf,
} from '../generated/ChargedSettings/ChargedSettings';

import { loadOrCreateChargedSettings } from './helpers/loadOrCreateChargedSettings';
import { loadOrCreateNftSettings } from './helpers/loadOrCreateNftSettings';
import { loadOrCreateAllowedAsset } from './helpers/loadOrCreateAllowedAsset';

import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import { trackLastKnownOwner } from './helpers/nftState';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _chargedSettings = loadOrCreateChargedSettings(event.address);
  _chargedSettings.owner = event.params.newOwner;
  _chargedSettings.save();
}

export function handleDepositCapSet(event: DepositCapSet): void {
  log.info('TODO: handleDepositCapSet', []);
}

export function handleTempLockExpirySet(event: TempLockExpirySet): void {
  const _chargedSettings = loadOrCreateChargedSettings(event.address);
  _chargedSettings.tempLockExpiryBlocks = event.params.expiryBlocks;
  _chargedSettings.save();
}

export function handleWalletManagerRegistered(event: WalletManagerRegistered): void {
  const _chargedSettings = loadOrCreateChargedSettings(event.address);
  if (event.params.walletManagerId.toString() == 'generic') {
    _chargedSettings.genericWalletManager = event.params.walletManager.toHex();
  }
  if (event.params.walletManagerId.toString() == 'aave') {
    _chargedSettings.aaveWalletManager = event.params.walletManager.toHex();
  }
  _chargedSettings.save();
}

export function handleBasketManagerRegistered(event: BasketManagerRegistered): void {
  const _chargedSettings = loadOrCreateChargedSettings(event.address);
  _chargedSettings.genericBasketManager = event.params.basketManager.toHex();
  _chargedSettings.save();
}

export function handleRequiredWalletManagerSet(event: RequiredWalletManagerSet): void {
  const _nftSettings = loadOrCreateNftSettings(
    event.address,
    event.params.contractAddress,
  );
  _nftSettings.requiredWalletManager = event.params.walletManager;
  _nftSettings.save();
}

export function handleRequiredBasketManagerSet(event: RequiredBasketManagerSet): void {
  const _nftSettings = loadOrCreateNftSettings(
    event.address,
    event.params.contractAddress,
  );
  _nftSettings.requiredBasketManager = event.params.basketManager;
  _nftSettings.save();
}

export function handleAssetTokenRestrictionsSet(event: AssetTokenRestrictionsSet): void {
  const _nftSettings = loadOrCreateNftSettings(
    event.address,
    event.params.contractAddress,
  );
  _nftSettings.hasRestrictedAssets = event.params.restrictionsEnabled;
  _nftSettings.save();
}

export function handleAllowedAssetTokenSet(event: AllowedAssetTokenSet): void {
  const _allowedAsset = loadOrCreateAllowedAsset(
    event.address,
    event.params.contractAddress,
    event.params.assetToken,
  );
  _allowedAsset.isAllowed = event.params.isAllowed;
  _allowedAsset.save();
}

export function handleAssetTokenLimitsSet(event: AssetTokenLimitsSet): void {
  log.info('TODO: handleAssetTokenLimitsSet', []);
}

export function handleMaxNftsSet(event: MaxNftsSet): void {
  log.info('TODO: handleMaxNftsSet', []);
}

export function handleTokenCreatorConfigsSet(event: TokenCreatorConfigsSet): void {
  log.info('TODO: handleTokenCreatorConfigsSet', []);
}

export function handleTokenCreatorAnnuitiesRedirected(event: TokenCreatorAnnuitiesRedirected): void {
  log.info('TODO: handleTokenCreatorAnnuitiesRedirected', []);
}

export function handlePermsSetForCharge(event: PermsSetForCharge): void {
  log.info('TODO: handlePermsSetForCharge', []);
}

export function handlePermsSetForBasket(event: PermsSetForBasket): void {
  log.info('TODO: handlePermsSetForBasket', []);
}

export function handlePermsSetForTimelockAny(event: PermsSetForTimelockAny): void {
  log.info('TODO: handlePermsSetForTimelockAny', []);
}

export function handlePermsSetForTimelockSelf(event: PermsSetForTimelockSelf): void {
  log.info('TODO: handlePermsSetForTimelockSelf', []);
}
