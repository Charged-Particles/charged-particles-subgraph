import { Address, ByteArray, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  WalletManagerRegistered,
  BasketManagerRegistered,
} from '../generated/ChargedManagers/ChargedManagers';

import { loadOrCreateChargedManagers } from './helpers/loadOrCreateChargedManagers';
import { loadOrCreateAaveWalletManager } from './helpers/loadOrCreateAaveWalletManager';
import { loadOrCreateGenericWalletManager } from './helpers/loadOrCreateGenericWalletManager';
import { loadOrCreateGenericBasketManager } from './helpers/loadOrCreateGenericBasketManager';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _chargedManagers = loadOrCreateChargedManagers(event.address);
  _chargedManagers.owner = event.params.newOwner;
  _chargedManagers.save();
}

export function handleWalletManagerRegistered(event: WalletManagerRegistered): void {
  const _chargedManagers = loadOrCreateChargedManagers(event.address);
  const _walletManagerId = event.params.walletManagerId.toHexString();

  // https://emn178.github.io/online-tools/keccak_256.html
  const generic  = '0x3f60bdce108b22ecb3a4bda3ab89f826cb039b8d32cca37223537d0d78e2aff6';  // keccak256('generic')
  const genericB = '0x1ed58c8dda247e5d450138c7c032b2d7e4d95cc5393702e7a028d471709d3254';  // keccak256('generic.B')
  const aave     = '0xe0a39fef8aa5887c76606e7a14a5db8dc6676191e4866b2a609a3aa003b18329';  // keccak256('aave')
  const aaveB    = '0xb95d0a2709d2cc1a6fb19badbbe10b3d45f4bde52d9f59e2fff862afdaae085c';  // keccak256('aave.B')

  if (_walletManagerId == generic || _walletManagerId == genericB) {
    const _genericWalletManager = loadOrCreateGenericWalletManager(event.params.walletManager);
    _genericWalletManager.chargedManager = event.address.toHex();
    _genericWalletManager.save();
  }

  else if (_walletManagerId == aave || _walletManagerId == aaveB) {
    const _aaveWalletManager = loadOrCreateAaveWalletManager(event.params.walletManager);
    _aaveWalletManager.chargedManager = event.address.toHex();
    _aaveWalletManager.save();
  }



  // // Generic Wallet Manager
  // if (_walletManagerId == "generic") {
  //   _chargedManagers.genericWalletManager = event.params.walletManager.toHex();
  // }

  // // Aave Wallet Manager
  // if (_walletManagerId == "aave") {
  //   _chargedManagers.aaveWalletManager = event.params.walletManager.toHex();
  // }

  // // Generic Wallet Manager B
  // if (_walletManagerId == "generic.B") {
  //   _chargedManagers.genericWalletManagerB = event.params.walletManager.toHex();
  // }

  // // Aave Wallet Manager B
  // if (_walletManagerId == "aave.B") {
  //   _chargedManagers.aaveWalletManagerB = event.params.walletManager.toHex();
  // }

  // _chargedManagers.save();
}

export function handleBasketManagerRegistered(event: BasketManagerRegistered): void {
  const _chargedManagers = loadOrCreateChargedManagers(event.address);
  const _genericWalletManager = loadOrCreateGenericBasketManager(event.params.basketManager);
  _genericWalletManager.chargedManager = event.address.toHex();
  _genericWalletManager.save();
  _chargedManagers.save();
}
