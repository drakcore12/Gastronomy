import { Fruta } from './frutas';

// Importar frutas individuales
import { PINA } from './pina';
import { MANGO } from './mango';
import { KIWI } from './kiwi';

// Combinar todas las frutas sin primaria
export const OTRAS_FRUTAS: Fruta[] = [
  ...PINA,
  ...MANGO,
  ...KIWI
];