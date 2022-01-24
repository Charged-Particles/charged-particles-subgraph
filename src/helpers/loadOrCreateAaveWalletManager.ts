import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  AaveWalletManager,
} from '../../generated/schema';

import {
  AaveWalletManager as AaveWalletManagerContract,
} from '../../generated/AaveWalletManager/AaveWalletManager';

import {
  AaveWalletManagerB as AaveWalletManagerContractB,
} from '../../generated/AaveWalletManagerB/AaveWalletManagerB';


export function loadOrCreateAaveWalletManager(
  aaveWalletManagerAddress: Address,
  aaveWalletManagerVersion: String = 'A'
): AaveWalletManager {
  const id = aaveWalletManagerAddress.toHex();
  let _aaveWalletManager = AaveWalletManager.load(id);

  const isVersionB = (aaveWalletManagerVersion === 'B');

  if (!_aaveWalletManager) {
    _aaveWalletManager = new AaveWalletManager(id);

    const contractAbi = isVersionB ? AaveWalletManagerContractB : AaveWalletManagerContract;
    const boundWalletManager = AaveWalletManagerContract.bind(aaveWalletManagerAddress);
    _aaveWalletManager.owner = boundWalletManager.owner();
    _aaveWalletManager.paused = boundWalletManager.isPaused();

    _aaveWalletManager.name = isVersionB ? 'aave.B' : 'aave';
    _aaveWalletManager.address = aaveWalletManagerAddress;

    _aaveWalletManager.save();
  }

  return _aaveWalletManager as AaveWalletManager;
}
