import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  IonHolder,
} from '../../generated/schema';

import { ionTokenHolderId } from './idTemplates'
import { ZERO } from './common';


export function loadOrCreateIonTokenHolder(
  ionAddress: Address,
  ionHolderAddress: Address
): IonHolder {
  const id = ionTokenHolderId(ionAddress.toHex(), ionHolderAddress.toHex());
  let _ionHolder = IonHolder.load(id);

  if (!_ionHolder) {
    _ionHolder = new IonHolder(id);

    _ionHolder.ion = ionAddress.toHex()
    _ionHolder.address = ionHolderAddress
    _ionHolder.balance = ZERO;
    _ionHolder.save();
  }

  return _ionHolder as IonHolder;
}
