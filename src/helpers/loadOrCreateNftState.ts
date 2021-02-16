import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftState,
} from '../../generated/schema';

import { ADDRESS_ZERO } from './common';

import { nftStateId } from './idTemplates';


export function loadOrCreateNftState(
  chargedStateAddress: Address,
  contractAddress: Address,
  tokenId: BigInt,
): NftState {
  const id = nftStateId(contractAddress.toHex(), tokenId.toString());
  let _nftState = NftState.load(id);

  if (!_nftState) {
    _nftState = new NftState(id);
    _nftState.chargedState = chargedStateAddress.toHex();
    _nftState.contractAddress = contractAddress;
    _nftState.tokenId = tokenId;
    _nftState.lastKnownOwner = Address.fromString(ADDRESS_ZERO);

    _nftState.restrictChargeFromAny = false;
    _nftState.allowDischargeFromAny = false;
    _nftState.allowReleaseFromAny = false;
    _nftState.restrictBondFromAny = false;
    _nftState.allowBreakBondFromAny = false;

    _nftState.save();
  }

  return _nftState as NftState;
}
