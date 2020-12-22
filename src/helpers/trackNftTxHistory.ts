import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';

import {
  NftTxHistory,
} from '../../generated/schema';

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
}
