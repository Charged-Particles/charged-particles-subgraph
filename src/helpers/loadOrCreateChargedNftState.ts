import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  ChargedNftState,
} from '../../generated/schema';

import { ADDRESS_ZERO } from './common';

import { chargedNftStateId } from './idTemplates';


export function loadOrCreateChargedNftState(
  chargedParticlesAddress: Address,
  contractAddress: Address,
  tokenId: BigInt,
): ChargedNftState {
  const id = chargedNftStateId(contractAddress.toHex(), tokenId.toString());
  let _chargedNftState = ChargedNftState.load(id);

  if (!_chargedNftState) {
    _chargedNftState = new ChargedNftState(id);
    _chargedNftState.chargedParticles = chargedParticlesAddress.toHex();
    _chargedNftState.contractAddress = contractAddress;
    _chargedNftState.tokenId = tokenId;
    _chargedNftState.lastKnownOwner = Address.fromString(ADDRESS_ZERO);
    _chargedNftState.save();
  }

  return _chargedNftState as ChargedNftState;
}
