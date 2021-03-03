import { Address } from '@graphprotocol/graph-ts';

import {
  ApprovedOperator,
} from '../../generated/schema';

import { approvedOperatorId } from './idTemplates';


export function loadOrCreateApprovedOperator(
  assetAddress: Address,
  ownerAddress: Address,
  operatorAddress: Address,
): ApprovedOperator {
  const id = approvedOperatorId(assetAddress.toHex(), ownerAddress.toHex());
  let _approvedOperator = ApprovedOperator.load(id);

  if (!_approvedOperator) {
    _approvedOperator = new ApprovedOperator(id);
    _approvedOperator.assetAddress = assetAddress;
    _approvedOperator.ownerAddress = ownerAddress;
    _approvedOperator.operatorAddress = operatorAddress;
    _approvedOperator.tokenIds = []
    _approvedOperator.save();
  }

  return _approvedOperator as ApprovedOperator;
}
