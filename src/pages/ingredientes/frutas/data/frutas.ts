export interface Fruta {
  id: string;
  primaria?: string; // Opcional para variedades específicas
  nombre: string;
  nombreEn: string;
  clasificacionCulinaria: 'dulce' | 'acida' | 'semiacida' | 'neutra-oleaginosa' | 'amarga' | 'enologica';
  clasificacionBotanica: 'baya' | 'drupa' | 'pepa' | 'nuez' | 'hesperide' | 'agregado' | 'multiple';
  perfiles: string[];
  origen: string[];
  regiones: string[];
  estacionalidad: number[]; // meses del año (1-12)
  tecnicas: string[];
  preparaciones: string[];
  nutricion: {
    kcal: number;
    fibra: number;
    vitaminaC: number;
    antioxidantes: string;
  };
  tips: string;
  imagen: string;
  descripcion: string;
  color: string;
}

// Importar todas las frutas desde archivos separados
import { MANZANAS } from './manzanas';
import { PLATANOS } from './platanos';
import { FRESAS } from './fresas';
import { LIMONES } from './limones';
import { NARANJAS } from './naranjas';
import { UVAS } from './uvas';
import { PINA } from './pina';
import { MANGO } from './mango';
import { KIWI } from './kiwi';
import { OTRAS_FRUTAS } from './otras-frutas';

// Combinar todas las frutas en un solo array
export const FRUTAS: Fruta[] = [
  ...MANZANAS,
  ...PLATANOS,
  ...FRESAS,
  ...LIMONES,
  ...NARANJAS,
  ...UVAS,
  ...PINA,
  ...MANGO,
  ...KIWI,
  ...OTRAS_FRUTAS
];

export const TECNICAS_FRUTAS = [
  'Brunoise',
  'Supremas',
  'Asado',
  'Compota',
  'Puré',
  'Frito',
  'Licuado',
  'Coulis',
  'Macerado',
  'Deshidratado',
  'Gelificación',
  'Jugo',
  'Rallado',
  'Confitura',
  'Fermentación',
  'Curación'
];

export const PREPARACIONES_FRUTAS = [
  'Tarta de manzana',
  'Compota',
  'Vinagreta',
  'Asado con especias',
  'Smoothie',
  'Pan de plátano',
  'Frituras',
  'Helado',
  'Mermelada',
  'Tarta',
  'Limonada',
  'Marmalade',
  'Ensalada',
  'Vino',
  'Pasas',
  'Jalea',
  'Vinagre',
  'Salsa agridulce',
  'Salsa picante',
  'Chutney'
];