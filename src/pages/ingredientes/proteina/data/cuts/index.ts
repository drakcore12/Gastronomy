import type { Cut } from '../types';
export type { Cut } from '../types';

// Exports individuales
export { CUTS_RES } from './cuts-res';
export { CUTS_PIG } from './cuts-pig';
export { CUTS_CHICKEN } from './cuts-chicken';
export { CUTS_LAMB } from './cuts-lamb';
export { CUTS_TURKEY } from './cuts-turkey';
export { CUTS_GOAT } from './cuts-goat';
export { CUTS_FISH } from './cuts-fish';

// Imports internos para agregador
import { CUTS_RES as _RES } from './cuts-res';
import { CUTS_PIG as _PIG } from './cuts-pig';
import { CUTS_CHICKEN as _CHK } from './cuts-chicken';
import { CUTS_LAMB as _LAM } from './cuts-lamb';
import { CUTS_TURKEY as _TUR } from './cuts-turkey';
import { CUTS_GOAT as _GOA } from './cuts-goat';
import { CUTS_FISH as _FIS } from './cuts-fish';

// Agregador total
export const ALL_CUTS: Cut[] = [
  ..._RES,
  ..._PIG,
  ..._CHK,
  ..._LAM,
  ..._TUR,
  ..._GOA,
  ..._FIS,
] as Cut[];
