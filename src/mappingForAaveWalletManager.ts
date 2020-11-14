import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveWalletManager,
} from '../generated/schema';

import {
  AaveWalletManager as AaveWalletManagerContract,
  OwnershipTransferred,
  LendingPoolProviderSet,
  ControllerSet,
  PausedStateSet,
  NewSmartWallet,
  WalletEnergized,
  WalletDischarged,
  WalletReleased,
  WalletRewarded,
} from '../generated/AaveWalletManager/AaveWalletManager';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles'
import { loadOrCreateAaveWalletManager } from './helpers/loadOrCreateAaveWalletManager';
import { loadOrCreateAaveSmartWallet } from './helpers/loadOrCreateAaveSmartWallet';
import { loadOrCreateAssetTokenBalance } from './helpers/loadOrCreateAssetTokenBalance';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.owner = event.params.newOwner;
  aaveWalletManager.save();
}

export function handleLendingPoolProviderSet(event: LendingPoolProviderSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.lendingPoolProvider = event.params.aaveLendingProvider;
  aaveWalletManager.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  const chargedParticles = loadOrCreateChargedParticles(event.params.controller);

  aaveWalletManager.chargedParticles = event.params.controller; // chargedParticles.id;
  chargedParticles.aaveWalletManager = aaveWalletManager.id;

  aaveWalletManager.save();
  chargedParticles.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.paused = event.params.isPaused;
  aaveWalletManager.save();
}

export function handleNewSmartWallet(event: NewSmartWallet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.uuid);
  aaveSmartWallet.address = event.params.smartWallet;
  aaveSmartWallet.walletManager = aaveWalletManager.id;
  aaveSmartWallet.nftCreator = event.params.creator;
  aaveSmartWallet.nftCreatorAnnuityPct = event.params.annuityPct;
  aaveSmartWallet.save();
}

export function handleWalletEnergized(event: WalletEnergized): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.uuid);
  if (!aaveSmartWallet.assetTokens.includes(event.params.assetToken)) {
    aaveSmartWallet.assetTokens.push(event.params.assetToken);
  }
  aaveSmartWallet.save();

  const assetTokenBalance = loadOrCreateAssetTokenBalance(event.params.assetToken, event.params.uuid);
  assetTokenBalance.balance = assetTokenBalance.balance.plus(event.params.assetAmount);
  assetTokenBalance.save();
}

export function handleWalletDischarged(event: WalletDischarged): void {
  const assetTokenBalance = loadOrCreateAssetTokenBalance(event.params.assetToken, event.params.uuid);
  assetTokenBalance.interestDischarged = assetTokenBalance.interestDischarged.plus(event.params.interestAmount);
  assetTokenBalance.save();
}

export function handleWalletReleased(event: WalletReleased): void {
  const assetTokenBalance = loadOrCreateAssetTokenBalance(event.params.assetToken, event.params.uuid);
  assetTokenBalance.balance = assetTokenBalance.balance.minus(event.params.principalAmount);
  assetTokenBalance.interestDischarged = assetTokenBalance.interestDischarged.plus(event.params.interestAmount);
  assetTokenBalance.save();
}

export function handleWalletRewarded(event: WalletRewarded): void {
  log.info('TODO: handleWalletRewarded', []);
}
