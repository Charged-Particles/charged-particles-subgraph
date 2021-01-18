import { ipfs, json, Bytes, JSONValue, Value, log } from '@graphprotocol/graph-ts';

import {
  Photon
} from '../generated/schema';

import {
  PhotonUpdated,
  PhotonTransferred,
} from '../generated/Photon/Photon';

import { loadOrCreatePhoton } from './helpers/loadOrCreatePhoton';


export function handlePhotonUpdated(event: PhotonUpdated): void {
  const _photon = loadOrCreatePhoton(event.address, event.params.owner);
  _photon.photonUri = event.params.photonURI;
  _photon.save();

  const ipfsHashParts = _photon.photonUri.split('/');
  const ipfsHash = ipfsHashParts[ipfsHashParts.length-1];
  let data = ipfs.cat(ipfsHash)
  if (data) {
    processPhotonMetadata(json.fromBytes(data as Bytes), Value.fromString(_photon.id));
  }
}

export function handlePhotonTransferred(event: PhotonTransferred): void {
  // New Photon
  let _photon = loadOrCreatePhoton(event.address, event.params.newPhoton);
  _photon.photonUri = event.params.photonURI;
  _photon.save();

  // Old Photon
  _photon = loadOrCreatePhoton(event.address, event.params.oldOwner);
  _photon.photonUri = '';

  _photon.name = '';
  _photon.description = '';
  _photon.thumbnail = '';
  _photon.image = '';

  _photon.email = '';
  _photon.twitter = '';
  _photon.website = '';
  _photon.save();
}

export function processPhotonMetadata(value: JSONValue, userData: Value): void {
  const photonId = userData.toString();
  const photonMetadata = value.toObject();
  if (photonMetadata == null) {
    log.info('NO METADATA FOUND FOR PHOTON {}', [photonId]);
  }

  const _photon = Photon.load(photonId);
  _photon.name = photonMetadata.get('name').toString();
  _photon.description = photonMetadata.get('description').toString();
  _photon.image = photonMetadata.get('image').toString();
  if (photonMetadata.isSet('thumbnail')) {
    _photon.thumbnail = photonMetadata.get('thumbnail').toString();
  }
  _photon.email = photonMetadata.get('email').toString();
  _photon.twitter = photonMetadata.get('twitter').toString();
  _photon.website = photonMetadata.get('website').toString();
  _photon.save();
}
