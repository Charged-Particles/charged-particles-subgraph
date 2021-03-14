import { JSONValue, Value, Wrapped } from '@graphprotocol/graph-ts';

import {
  WBoson
} from '../generated/schema';

import {
  WBosonUpdated,
  WBosonTransferred,
} from '../generated/WBoson/WBoson';

import { loadOrCreateWBoson } from './helpers/loadOrCreateWBoson';
import { getStringValue, parseJsonFromIpfs } from './helpers/common';


export function handleWBosonUpdated(event: WBosonUpdated): void {
  const _wBoson = loadOrCreateWBoson(event.address, event.params.owner);
  _wBoson.wBosonUri = event.params.wBosonURI;
  _wBoson.save();

  if (event.params.wBosonURI.length < 1) { return; }

  const jsonData:Wrapped<JSONValue> | null = parseJsonFromIpfs(event.params.wBosonURI);
  if (jsonData != null) {
    processWBosonMetadata(jsonData.inner, Value.fromString(_wBoson.id));
  }
}

export function handleWBosonTransferred(event: WBosonTransferred): void {
  // New WBoson
  let _wBoson = loadOrCreateWBoson(event.address, event.params.newWBoson);
  _wBoson.wBosonUri = event.params.wBosonURI;
  _wBoson.save();

  // Old WBoson
  _wBoson = loadOrCreateWBoson(event.address, event.params.oldOwner);
  _wBoson.discarded = true;
  _wBoson.save();
}

export function processWBosonMetadata(value: JSONValue, userData: Value): void {
  const wBosonId = userData.toString();
  const wBosonMetadata = value.toObject();
  if (!wBosonMetadata) { return; }

  const _wBoson = WBoson.load(wBosonId);
  if (!_wBoson) { return; }

  _wBoson.name        = getStringValue(wBosonMetadata, 'name');
  _wBoson.description = getStringValue(wBosonMetadata, 'description');
  _wBoson.image       = getStringValue(wBosonMetadata, 'image');
  _wBoson.thumbnail   = getStringValue(wBosonMetadata, 'thumbnail');
  _wBoson.email       = getStringValue(wBosonMetadata, 'email');
  _wBoson.twitter     = getStringValue(wBosonMetadata, 'twitter');
  _wBoson.website     = getStringValue(wBosonMetadata, 'website');

  _wBoson.save();
}
