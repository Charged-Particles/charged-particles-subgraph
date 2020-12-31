import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';

import {
  NftTxHistory,
  NftTxCount,
} from '../../generated/schema';

import { nftId } from './idTemplates';
import { ZERO, ONE } from './common';

export function trackNftTxHistory(
  event: ethereum.Event,
  contractAddress: Address,
  tokenId: BigInt,
  eventType: string,
  eventData: string
): void {
  const id = event.transaction.hash.toHex();
  const tx = new NftTxHistory(id);

  tx.tokenId = tokenId;
  tx.contractAddress = contractAddress;
  tx.timestamp = event.block.timestamp;
  tx.eventType = eventType;
  tx.eventData = eventData;
  tx.save();

  // Track Transaction Count
  const txCountId = nftId(contractAddress.toHex(), tokenId.toString());
  let nftTxCount = NftTxCount.load(txCountId);
  if (!nftTxCount) {
    nftTxCount = new NftTxCount(txCountId);
    nftTxCount.tokenId = tokenId;
    nftTxCount.contractAddress = contractAddress;
    nftTxCount.count = ZERO;
  }
  nftTxCount.count = nftTxCount.count.plus(ONE);
  nftTxCount.save();
}
