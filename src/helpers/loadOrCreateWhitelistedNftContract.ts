import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  WhitelistedNftContract,
} from '../../generated/schema';

import { whitelistedNftContractId } from './idTemplates';


export function loadOrCreateWhitelistedNftContract(
  chargedParticlesAddress: Address,
  contractAddress: Address
): WhitelistedNftContract {
  const id = whitelistedNftContractId(chargedParticlesAddress.toHex(), contractAddress.toHex());
  let _whitelistedNftContract = WhitelistedNftContract.load(id);

  if (!_whitelistedNftContract) {
    _whitelistedNftContract = new WhitelistedNftContract(id);
    _whitelistedNftContract.chargedParticles = chargedParticlesAddress.toHex();
    _whitelistedNftContract.contractAddress = contractAddress;
    _whitelistedNftContract.state = false;
    _whitelistedNftContract.save();
  }

  return _whitelistedNftContract as WhitelistedNftContract;
}
