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
import { loadOrCreateDepositCap } from './helpers/loadOrCreateDepositCap';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _chargedSettings = loadOrCreateChargedSettings(event.address);
  _chargedSettings.owner = event.params.newOwner;
  _chargedSettings.save();
}

export function handleDepositCapSet(event: DepositCapSet): void {
  const _depositCap = loadOrCreateDepositCap(event.address, event.params.assetToken);
  _depositCap.maxDeposit = event.params.depositCap;
  _depositCap.save();
}

export function handleTempLockExpirySet(event: TempLockExpirySet): void {
  const _chargedSettings = loadOrCreateChargedSettings(event.address);
  _chargedSettings.tempLockExpiryBlocks = event.params.expiryBlocks;
  _chargedSettings.save();
}

export function handleWalletManagerRegistered(event: WalletManagerRegistered): void {
  const _chargedSettings = loadOrCreateChargedSettings(event.address);
  if (event.params.walletManager.toHex() == "0xa66b72b2eb4164f0bc2586c978e24c479d4e6a47" || event.params.walletManager.toHex() == "0x7a8f5b15cfbff4eaac055524ec139ed75ef6d40a") {
    _chargedSettings.genericWalletManager = event.params.walletManager.toHex();
  }
  if (event.params.walletManager.toHex() == "0x02ab819a76a1053380b1c9016be195a5926bd17c" || event.params.walletManager.toHex() == "0x54b32b288d7904d5d98be1910975a80e45da5e8d") {
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
  const _nftSettings = loadOrCreateNftSettings(
    event.address,
    event.params.contractAddress,
  );
  _nftSettings.allowCharge = event.params.state;
  _nftSettings.save();
}

export function handlePermsSetForBasket(event: PermsSetForBasket): void {
  log.info('TODO: handlePermsSetForBasket', []);
  const _nftSettings = loadOrCreateNftSettings(
    event.address,
    event.params.contractAddress,
  );
  _nftSettings.allowBond = event.params.state;
  _nftSettings.save();
}

export function handlePermsSetForTimelockAny(event: PermsSetForTimelockAny): void {
  const _nftSettings = loadOrCreateNftSettings(
    event.address,
    event.params.contractAddress,
  );
  _nftSettings.allowTimelockAnyNft = event.params.state;
  _nftSettings.save();
}

export function handlePermsSetForTimelockSelf(event: PermsSetForTimelockSelf): void {
  const _nftSettings = loadOrCreateNftSettings(
    event.address,
    event.params.contractAddress,
  );
  _nftSettings.allowTimelockOwnNft = event.params.state;
  _nftSettings.save();
}
