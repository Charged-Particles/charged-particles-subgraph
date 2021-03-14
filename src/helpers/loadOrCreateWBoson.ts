import { Address } from '@graphprotocol/graph-ts';

import {
  WBoson,
} from '../../generated/schema';

import { wBosonId } from './idTemplates';

export function loadOrCreateWBoson(
  wBosonAddress: Address,
  accountAddress: Address
): WBoson {
  const id = wBosonId(wBosonAddress.toHex(), accountAddress.toHex());
  let _wBoson = WBoson.load(id);

  if (!_wBoson) {
    _wBoson = new WBoson(id);
    _wBoson.wBoson = wBosonAddress;
    _wBoson.account = accountAddress;
    _wBoson.discarded = false;
    _wBoson.save();
  }

  return _wBoson as WBoson;
}
