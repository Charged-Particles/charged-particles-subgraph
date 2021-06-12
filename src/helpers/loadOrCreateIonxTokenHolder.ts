import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  IonxHolder,
} from '../../generated/schema';

import { ionxTokenHolderId } from './idTemplates'
import { ZERO } from './common';


export function loadOrCreateIonxTokenHolder(
  ionxAddress: Address,
  ionxHolderAddress: Address
): IonxHolder {
  const id = ionxTokenHolderId(ionxAddress.toHex(), ionxHolderAddress.toHex());
  let _ionxHolder = IonxHolder.load(id);

  if (!_ionxHolder) {
    _ionxHolder = new IonxHolder(id);

    _ionxHolder.ionx = ionxAddress.toHex()
    _ionxHolder.address = ionxHolderAddress
    _ionxHolder.balance = ZERO;
    _ionxHolder.save();
  }

  return _ionxHolder as IonxHolder;
}
