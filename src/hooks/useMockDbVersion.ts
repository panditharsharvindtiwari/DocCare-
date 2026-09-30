import { useSyncExternalStore } from 'react';
import { mockDb } from '../data/mockDb';

export function useMockDbVersion() {
  return useSyncExternalStore(mockDb.subscribe, mockDb.getVersion, mockDb.getVersion);
}
