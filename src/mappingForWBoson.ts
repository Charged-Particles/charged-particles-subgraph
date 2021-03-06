import { ipfs, json, Bytes, JSONValue, Value, log } from '@graphprotocol/graph-ts';

import {
  WBoson
} from '../generated/schema';

import {
  WBosonUpdated,
  WBosonTransferred,
} from '../generated/WBoson/WBoson';

import { loadOrCreateWBoson } from './helpers/loadOrCreateWBoson';
import { getStringValue } from './helpers/common';


export function handleWBosonUpdated(event: WBosonUpdated): void {
  const _wBoson = loadOrCreateWBoson(event.address, event.params.owner);
  _wBoson.wBosonUri = event.params.wBosonURI;
  _wBoson.save();

  const ipfsHashParts = _wBoson.wBosonUri.split('/');
  const ipfsHash = ipfsHashParts[ipfsHashParts.length-1];
  let data = ipfs.cat(ipfsHash)
  if (data) {
    processWBosonMetadata(json.fromBytes(data as Bytes), Value.fromString(_wBoson.id));
  }
}

export function handleWBosonTransferred(event: WBosonTransferred): void {
  // New WBoson
  let _wBoson = loadOrCreateWBoson(event.address, event.params.newWBoson);
  _wBoson.wBosonUri = event.params.wBosonURI;
  _wBoson.save();

  // Old WBoson
  _wBoson = loadOrCreateWBoson(event.address, event.params.oldOwner);
  _wBoson.wBosonUri = '';

  _wBoson.name = '';
  _wBoson.description = '';
  _wBoson.thumbnail = '';
  _wBoson.image = '';

  _wBoson.email = '';
  _wBoson.twitter = '';
  _wBoson.website = '';
  _wBoson.save();
}

export function processWBosonMetadata(value: JSONValue, userData: Value): void {
  const wBosonId = userData.toString();
  const wBosonMetadata = value.toObject();
  if (wBosonMetadata == null) {
    log.info('NO METADATA FOUND FOR WBOSON {}', [wBosonId]);
    return;
  }

  const _wBoson = WBoson.load(wBosonId);
  if (!_wBoson) {
    log.info('FAILED TO LOAD OBJECT FOR WBOSON {}', [wBosonId]);
    return;
  }

  _wBoson.name        = getStringValue(wBosonMetadata, 'name');
  _wBoson.description = getStringValue(wBosonMetadata, 'description');
  _wBoson.image       = getStringValue(wBosonMetadata, 'image');
  _wBoson.thumbnail   = getStringValue(wBosonMetadata, 'thumbnail');
  _wBoson.email       = getStringValue(wBosonMetadata, 'email');
  _wBoson.twitter     = getStringValue(wBosonMetadata, 'twitter');
  _wBoson.website     = getStringValue(wBosonMetadata, 'website');

  _wBoson.save();
}
