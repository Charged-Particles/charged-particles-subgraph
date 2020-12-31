import { ethereum, Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  NftTxHistory,
  NftTxCount,
} from '../../generated/schema';

import { nftId, nftTxId } from './idTemplates';
import { ZERO, ONE } from './common';

export function trackNftTxHistory(
  event: ethereum.Event,
  contractAddress: Address,
  tokenId: BigInt,
  eventType: string,
  eventData: string
): void {
  const hash = event.transaction.hash.toHex();
  const id = nftId(contractAddress.toHex(), tokenId.toString());
  const tx = new NftTxHistory(nftTxId(id, hash, eventType));

  tx.tokenId = tokenId;
  tx.contractAddress = contractAddress;
  tx.timestamp = event.block.timestamp;
  tx.eventType = eventType;
  tx.eventData = eventData;
  tx.save();

  // Track Transaction Count
  let nftTxCount = NftTxCount.load(id);
  if (!nftTxCount) {
    nftTxCount = new NftTxCount(id);
    nftTxCount.tokenId = tokenId;
    nftTxCount.contractAddress = contractAddress;
    nftTxCount.count = ZERO;
  }
  nftTxCount.count = nftTxCount.count.plus(ONE);
  nftTxCount.save();
}
