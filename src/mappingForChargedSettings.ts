import { Address, ByteArray, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  DepositCapSet,
  TempLockExpirySet,
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
import { loadOrCreateMaxNfts } from './helpers/loadOrCreateMaxNfts';
import { loadOrCreateNftCreatorSettings } from './helpers/loadOrCreateNftCreatorSettings';
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
  const _nftSettings = loadOrCreateNftSettings(event.address, event.params.contractAddress);
  _nftSettings.assetDepositMax = event.params.assetDepositMax;
  _nftSettings.assetDepositMin = event.params.assetDepositMin;
  _nftSettings.save();
}

export function handleMaxNftsSet(event: MaxNftsSet): void {
  const _maxNfts = loadOrCreateMaxNfts(event.address, event.params.nftTokenAddress);
  _maxNfts.maxNfts = event.params.maxNfts;
  _maxNfts.save();
}

export function handleTokenCreatorConfigsSet(event: TokenCreatorConfigsSet): void {
  const _nftCreatorSettings = loadOrCreateNftCreatorSettings(event.address, event.params.contractAddress, event.params.tokenId, event.params.creatorAddress);
  _nftCreatorSettings.annuityPercent = event.params.annuityPercent;
  _nftCreatorSettings.save();
}

export function handleTokenCreatorAnnuitiesRedirected(event: TokenCreatorAnnuitiesRedirected): void {
  const _nftCreatorSettings = loadOrCreateNftCreatorSettings(event.address, event.params.contractAddress, event.params.tokenId, event.params.redirectAddress);
  _nftCreatorSettings.annuityRedirect = event.params.redirectAddress;
  _nftCreatorSettings.save();
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
