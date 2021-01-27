import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  ControllerSet,
  PausedStateSet,
  NewSmartBasket,
  BasketAdd,
  BasketRemove,
} from '../generated/GenericBasketManager/GenericBasketManager';

import { loadOrCreateChargedParticles } from './helpers/loadOrCreateChargedParticles';
import { loadOrCreateGenericBasketManager } from './helpers/loadOrCreateGenericBasketManager';
import { loadOrCreateGenericSmartBasket } from './helpers/loadOrCreateGenericSmartBasket';
import { loadOrCreateGenericNftTokenBalance } from './helpers/loadOrCreateGenericNftTokenBalance';
import { trackNftTxHistory } from './helpers/trackNftTxHistory';
import { ONE } from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  genericBasketManager.owner = event.params.newOwner;
  genericBasketManager.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  const chargedParticles = loadOrCreateChargedParticles(event.params.controller);

  genericBasketManager.chargedParticles = event.params.controller; // chargedParticles.id;
  chargedParticles.genericBasketManager = genericBasketManager.id;

  genericBasketManager.save();
  chargedParticles.save();
}

export function handlePausedStateSet(event: PausedStateSet): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  genericBasketManager.paused = event.params.isPaused;
  genericBasketManager.save();
}

export function handleNewSmartBasket(event: NewSmartBasket): void {
  const genericBasketManager = loadOrCreateGenericBasketManager(event.address);
  const genericSmartBasket = loadOrCreateGenericSmartBasket(event.params.contractAddress, event.params.tokenId);
  genericSmartBasket.address = event.params.smartBasket;
  genericSmartBasket.basketManager = genericBasketManager.id;
  genericSmartBasket.save();
}

export function handleBasketAdd(event: BasketAdd): void {
  const genericSmartBasket = loadOrCreateGenericSmartBasket(event.params.contractAddress, event.params.tokenId);
  genericSmartBasket.totalTokens.plus(ONE);
  genericSmartBasket.save();

  const nftTokenBalance = loadOrCreateGenericNftTokenBalance(genericSmartBasket.id, event.params.basketTokenAddress, event.params.contractAddress, event.params.tokenId);
  nftTokenBalance.nftTokenIds.push(event.params.basketTokenId);
  nftTokenBalance.save();

  var eventData = new Array<string>(4);
  eventData[0] = event.params.contractAddress.toHex();
  eventData[1] = event.params.tokenId.toString();
  eventData[2] = event.params.basketTokenAddress.toHex();
  eventData[3] = event.params.basketTokenId.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'BasketAdd', eventData.join('-'));
}

export function handleBasketRemove(event: BasketRemove): void {
  const genericSmartBasket = loadOrCreateGenericSmartBasket(event.params.contractAddress, event.params.tokenId);
  genericSmartBasket.totalTokens.minus(ONE);
  genericSmartBasket.save();

  const nftTokenBalance = loadOrCreateGenericNftTokenBalance(genericSmartBasket.id, event.params.basketTokenAddress, event.params.contractAddress, event.params.tokenId);
  let ids = nftTokenBalance.nftTokenIds;
  const index = ids.indexOf(event.params.basketTokenId);
  if (index > -1) {
    ids = ids.slice(0, index).concat(ids.slice(index + 1));
  }
  nftTokenBalance.nftTokenIds = ids;
  nftTokenBalance.save();

  var eventData = new Array<string>(5);
  eventData[0] = event.params.receiver.toHex();
  eventData[1] = event.params.contractAddress.toHex();
  eventData[2] = event.params.tokenId.toString();
  eventData[3] = event.params.basketTokenAddress.toHex();
  eventData[4] = event.params.basketTokenId.toString();
  trackNftTxHistory(event, event.params.contractAddress, event.params.tokenId, 'BasketRemove', eventData.join('-'));
}
