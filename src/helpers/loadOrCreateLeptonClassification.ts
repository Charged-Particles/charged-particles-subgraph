import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  LeptonClassification,
} from '../../generated/schema';

import { leptonClassificationId } from './idTemplates';


export function loadOrCreateLeptonClassification(
  leptonAddress: Address,
  typeId: BigInt
): LeptonClassification {
  const id = leptonClassificationId(leptonAddress.toHex(), typeId.toString());
  let _type = LeptonClassification.load(id);

  if (!_type) {
    _type = new LeptonClassification(id);
    _type.lepton = leptonAddress.toHex();
    _type.bonus = typeId;
    _type.save();
  }

  return _type as LeptonClassification;
}
