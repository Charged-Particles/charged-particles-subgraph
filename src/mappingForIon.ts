import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Ion,
} from '../generated/schema';

import {
  Ion as IonContract,
  OwnershipTransferred,
  Transfer,
  Approval,
  LockApproval,
} from '../generated/Ion/Ion';

import { loadOrCreateIonToken } from './helpers/loadOrCreateIonToken';
import { loadOrCreateIonTokenHolder } from './helpers/loadOrCreateIonTokenHolder';

import { ADDRESS_ZERO } from './helpers/common';


export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _ion = loadOrCreateIonToken(event.address);
  _ion.owner = event.params.newOwner;
  _ion.save();
}

export function handleTransfer(event: Transfer): void {
  // Sender (not Mint)
  if (event.params.from.toHex() != ADDRESS_ZERO) {
    const sender = loadOrCreateIonTokenHolder(event.address, event.params.from);
    sender.balance = sender.balance.minus(event.params.value);
    sender.save()
  }

  // Receiver (not Burn)
  if (event.params.to.toHex() != ADDRESS_ZERO) {
    const receiver = loadOrCreateIonTokenHolder(event.address, event.params.to);
    receiver.balance = receiver.balance.plus(event.params.value);
    receiver.save()
  }
}

export function handleApproval(event: Approval): void {
  // const _ion = loadOrCreateIonToken(event.address);
  // _ion.owner = event.params.newOwner;
  // _ion.save();
}

export function handleLockApproval(event: LockApproval): void {
  // const _ion = loadOrCreateIonToken(event.address);
  // _ion.owner = event.params.newOwner;
  // _ion.save();
}
