import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  AaveBridgeSet,
  ControllerSet,
  PausedStateSet,
  NewSmartWallet,
  WalletEnergized,
  WalletDischarged,
  WalletReleased,
  WalletRewarded,
} from '../generated/AaveWalletManager/AaveWalletManager';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles';
import { loadOrCreateAaveWalletManager } from './helpers/loadOrCreateAaveWalletManager';
import { loadOrCreateAaveSmartWallet } from './helpers/loadOrCreateAaveSmartWallet';
import { loadOrCreateAaveAssetTokenBalance } from './helpers/loadOrCreateAaveAssetTokenBalance';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.owner = event.params.newOwner;
  aaveWalletManager.save();
}

export function handleAaveBridgeSet(event: AaveBridgeSet): void {
  const aaveWalletManager = loadOrCreateAaveWalletManager(event.address);
  aaveWalletManager.aaveBridge = event.params.aaveBridge;
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

  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.uuid);
  assetTokenBalance.principal = assetTokenBalance.principal.plus(event.params.assetAmount);
  assetTokenBalance.depositFee = assetTokenBalance.depositFee.plus(event.params.depositFee);
  assetTokenBalance.save();
}

export function handleWalletDischarged(event: WalletDischarged): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.uuid);
  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.uuid);
  assetTokenBalance.ownerInterestDischarged = assetTokenBalance.ownerInterestDischarged.plus(event.params.receiverAmount);
  assetTokenBalance.creatorInterestDischarged = assetTokenBalance.creatorInterestDischarged.plus(event.params.creatorAmount);
  assetTokenBalance.save();
}

export function handleWalletReleased(event: WalletReleased): void {
  const aaveSmartWallet = loadOrCreateAaveSmartWallet(event.params.uuid);
  const assetTokenBalance = loadOrCreateAaveAssetTokenBalance(aaveSmartWallet.id, event.params.assetToken, event.params.uuid);
  const ownerInterest = event.params.receiverAmount.minus(event.params.principalAmount);
  assetTokenBalance.principal = assetTokenBalance.principal.minus(event.params.principalAmount);
  assetTokenBalance.ownerInterestDischarged = assetTokenBalance.ownerInterestDischarged.plus(ownerInterest);
  assetTokenBalance.creatorInterestDischarged = assetTokenBalance.creatorInterestDischarged.plus(event.params.creatorAmount);
  assetTokenBalance.save();
}

export function handleWalletRewarded(event: WalletRewarded): void {
  log.info('TODO: handleWalletRewarded', []);
}
