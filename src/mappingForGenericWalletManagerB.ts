import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ControllerSet,
  ExecutorSet,
  PausedStateSet,
  NewSmartWallet,
  WalletEnergized,
  WalletReleased,
  WalletRewarded,
} from '../generated/GenericWalletManagerB/GenericWalletManagerB';

import {
  Proton as ProtonContract
} from '../generated/Proton/Proton';

import {
  ONE,
  getProtonOwnerOf,
  getProtonCreatorOf,
} from './helpers/common';

import { loadOrCreateGenericWalletManager } from './helpers/loadOrCreateGenericWalletManager';
import { loadOrCreateGenericSmartWallet } from './helpers/loadOrCreateGenericSmartWallet';
import { loadOrCreateGenericAssetTokenBalance } from './helpers/loadOrCreateGenericAssetTokenBalance';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import { loadOrCreateAssetTokenAnalytics } from './helpers/loadOrCreateAssetTokenAnalytics';
import { loadOrCreateProfileMetric } from './helpers/loadOrCreateProfileMetric';
import { loadOrCreateUserTokenMetric } from './helpers/loadOrCreateUserTokenMetric';

const _contractVersionFlag = 'B';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address, _contractVersionFlag);
  genericWalletManager.owner = event.params.newOwner;
  genericWalletManager.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address, _contractVersionFlag);
  genericWalletManager.chargedParticles = event.params.controller;
  genericWalletManager.save();
}

export function handleExecutorSet(event: ExecutorSet): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address, _contractVersionFlag);
  genericWalletManager.executor = event.params.executor;
  genericWalletManager.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address, _contractVersionFlag);
  genericWalletManager.paused = event.params.isPaused;
  genericWalletManager.save();
}

export function handleNewSmartWallet(event: NewSmartWallet): void {
  const genericWalletManager = loadOrCreateGenericWalletManager(event.address, _contractVersionFlag);
  const genericSmartWallet = loadOrCreateGenericSmartWallet(event.params.contractAddress, event.params.tokenId);
  genericSmartWallet.address = event.params.smartWallet;
  genericSmartWallet.walletManager = genericWalletManager.id;
  genericSmartWallet.managerId = "generic.B";
  genericSmartWallet.save();
}

export function handleWalletEnergized(event: WalletEnergized): void {
  const genericSmartWallet = loadOrCreateGenericSmartWallet(event.params.contractAddress, event.params.tokenId);
  let assetTokens = genericSmartWallet.assetTokens;
  if (assetTokens) {
    if (!assetTokens.includes(event.params.assetToken)) {
      assetTokens.push(event.params.assetToken);
    }
  } else {
    assetTokens = [event.params.assetToken];
  }
  genericSmartWallet.assetTokens = assetTokens;
  genericSmartWallet.save();

  const assetTokenBalance = loadOrCreateGenericAssetTokenBalance(genericSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.principal = assetTokenBalance.principal.plus(event.params.assetAmount);
  assetTokenBalance.save();

  const assetTokenAnalytics = loadOrCreateAssetTokenAnalytics(event.params.assetToken);
  assetTokenAnalytics.totalAssetsLocked = assetTokenAnalytics.totalAssetsLocked.plus(event.params.assetAmount);
  assetTokenAnalytics.totalAssetsLockedERC20 = assetTokenAnalytics.totalAssetsLockedERC20.plus(event.params.assetAmount);
  assetTokenAnalytics.save();

  let tokenOwner = getProtonOwnerOf(event.params.contractAddress, event.params.tokenId);
  if (tokenOwner != Address.zero()) {
    const _walletOwner = loadOrCreateProfileMetric(tokenOwner);
    _walletOwner.energizeERC20Count = _walletOwner.energizeERC20Count.plus(ONE);
    _walletOwner.save();

    const userTokenMetric = loadOrCreateUserTokenMetric(tokenOwner, event.params.assetToken);
    userTokenMetric.lifetimeValueLocked = userTokenMetric.lifetimeValueLocked.plus(event.params.assetAmount);
    userTokenMetric.save();
  }

  var eventData = new Array<string>(5);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.assetToken.toHex();
  eventData[3] = event.params.assetAmount.toString();
  eventData[4] = event.params.yieldTokensAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletEnergized', eventData.join('-'));
}

export function handleWalletReleased(event: WalletReleased): void {
  const genericSmartWallet = loadOrCreateGenericSmartWallet(event.params.contractAddress, event.params.tokenId);
  const assetTokenBalance = loadOrCreateGenericAssetTokenBalance(genericSmartWallet.id, event.params.assetToken, event.params.contractAddress, event.params.tokenId);
  assetTokenBalance.principal = assetTokenBalance.principal.minus(event.params.principalAmount);
  assetTokenBalance.save();

  const assetTokenAnalytics = loadOrCreateAssetTokenAnalytics(event.params.assetToken);
  assetTokenAnalytics.totalAssetsLocked = assetTokenAnalytics.totalAssetsLocked.minus(event.params.principalAmount);
  assetTokenAnalytics.totalAssetsLockedERC20 = assetTokenAnalytics.totalAssetsLockedERC20.minus(event.params.principalAmount);
  assetTokenAnalytics.save();

  let tokenOwner = getProtonOwnerOf(event.params.contractAddress, event.params.tokenId);
  if (tokenOwner != Address.zero()) {
    const _walletOwner = loadOrCreateProfileMetric(tokenOwner);
    _walletOwner.releaseMassCount = _walletOwner.releaseMassCount.plus(ONE);
    _walletOwner.save();

    const userTokenMetric = loadOrCreateUserTokenMetric(tokenOwner, event.params.assetToken);
    userTokenMetric.totalMassReleased = userTokenMetric.totalMassReleased.plus(event.params.receiverAmount);
    userTokenMetric.save();
  }

  let tokenCreator = getProtonCreatorOf(event.params.contractAddress, event.params.tokenId);
  if (tokenCreator != Address.zero()) {
    const creatorTokenMetric = loadOrCreateUserTokenMetric(tokenCreator, event.params.assetToken);
    creatorTokenMetric.totalMassReleased = creatorTokenMetric.totalMassReleased.plus(event.params.creatorAmount);
    creatorTokenMetric.save();
  }

  var eventData = new Array<string>(7);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.receiver.toHex();
  eventData[3] = event.params.assetToken.toHex();
  eventData[4] = event.params.principalAmount.toString();
  eventData[5] = event.params.creatorAmount.toString();
  eventData[6] = event.params.receiverAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletReleased', eventData.join('-'));
}

export function handleWalletRewarded(event: WalletRewarded): void {
  var eventData = new Array<string>(5);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.receiver.toHex();
  eventData[3] = event.params.rewardsToken.toHex();
  eventData[4] = event.params.rewardsAmount.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'WalletRewarded', eventData.join('-'));
}
