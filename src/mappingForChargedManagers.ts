import { Address, ByteArray, BigInt, log } from '@graphprotocol/graph-ts';

import {
  OwnershipTransferred,
  WalletManagerRegistered,
  BasketManagerRegistered,
} from '../generated/ChargedManagers/ChargedManagers';

import { loadOrCreateChargedManagers } from './helpers/loadOrCreateChargedManagers';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _chargedManagers = loadOrCreateChargedManagers(event.address);
  _chargedManagers.owner = event.params.newOwner;
  _chargedManagers.save();
}

export function handleWalletManagerRegistered(event: WalletManagerRegistered): void {
  const _chargedManagers = loadOrCreateChargedManagers(event.address);

  // Generic Wallet Manager
  if (
    event.params.walletManager.toHex() == "0x48B3Be406877be676Ca1491bB422b562F087e46a" ||   // Kovan
    event.params.walletManager.toHex() == "0x7a8f5b15cfbff4eaac055524ec139ed75ef6d40a"      // Mainnet
  ) {
    _chargedManagers.genericWalletManager = event.params.walletManager.toHex();
  }

  // Aave Wallet Manager
  if (
    event.params.walletManager.toHex() == "0x27b3D1B17471b4e02bcF326c41310eE2336D578A" ||   // Kovan
    event.params.walletManager.toHex() == "0x54b32b288d7904d5d98be1910975a80e45da5e8d"      // Mainnet
  ) {
    _chargedManagers.aaveWalletManager = event.params.walletManager.toHex();
  }

  _chargedManagers.save();
}

export function handleBasketManagerRegistered(event: BasketManagerRegistered): void {
  const _chargedManagers = loadOrCreateChargedManagers(event.address);
  _chargedManagers.genericBasketManager = event.params.basketManager.toHex();
  _chargedManagers.save();
}
