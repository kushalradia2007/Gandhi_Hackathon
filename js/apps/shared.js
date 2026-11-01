// Convenience re-exports for apps.
export * from '../state.js';
import { addLog } from './sessionlog.js';
import { dmy, hm } from '../state.js';

/** Add a Session Log row: { cust, pc, dur, persist } */
export function addLogRow({ cust = 'GUEST', pc = 'PC 03', dur = '', persist = true, cls = '' }) {
  addLog({ date: dmy(), time: hm(), cust, pc, dur, persist, cls });
}
