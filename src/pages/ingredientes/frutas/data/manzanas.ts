import { Fruta } from './frutas';

export const MANZANAS: Fruta[] = [
  {
    id: 'granny-smith',
    primaria: 'manzana',
    nombre: 'Granny Smith',
    nombreEn: 'Granny Smith Apple',
    clasificacionCulinaria: 'acida',
    clasificacionBotanica: 'pepa',
    perfiles: ['ácida', 'crujiente', 'refrescante'],
    origen: ['Australia'],
    regiones: ['Templado'],
    estacionalidad: [9, 10, 11, 12], // Otoño
    tecnicas: ['Asado', 'Tarta', 'Ensaladas'],
    preparaciones: ['Apple pie', 'Ensalada fresca', 'Jugo verde'],
    nutricion: {
      kcal: 57,
      fibra: 2.6,
      vitaminaC: 8,
      antioxidantes: 'Quercetina'
    },
    tips: 'Excelente para tartas por su acidez, mantiene la forma al hornear.',
    imagen: '/images/frutas/manzana-granny-smith.png',
    color: 'from-green-500 to-lime-500',
    descripcion: 'Manzana verde, ácida y refrescante, muy usada en repostería.'
  },
  {
    id: 'fuji',
    primaria: 'manzana',
    nombre: 'Fuji',
    nombreEn: 'Fuji Apple',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'pepa',
    perfiles: ['muy dulce', 'jugosa'],
    origen: ['Japón'],
    regiones: ['Templado', 'Subtropical'],
    estacionalidad: [10, 11, 12, 1],
    tecnicas: ['Consumo directo', 'Batidos'],
    preparaciones: ['Snack fresco', 'Smoothie de manzana'],
    nutricion: {
      kcal: 63,
      fibra: 2.1,
      vitaminaC: 9,
      antioxidantes: 'Catequinas'
    },
    tips: 'Una de las más dulces, ideal para comer cruda.',
    imagen: '/images/frutas/manzana-fuji.png',
    color: 'from-red-500 to-yellow-400',
    descripcion: 'Variedad japonesa muy dulce y jugosa, perfecta para consumo directo.'
  },
  {
    id: 'gala',
    primaria: 'manzana',
    nombre: 'Gala',
    nombreEn: 'Gala Apple',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'pepa',
    perfiles: ['aromática', 'suave', 'dulce'],
    origen: ['Nueva Zelanda'],
    regiones: ['Templado'],
    estacionalidad: [8, 9, 10],
    tecnicas: ['Compota', 'Snack', 'Ensaladas'],
    preparaciones: ['Compota casera', 'Tartaletas', 'Ensalada de frutas'],
    nutricion: {
      kcal: 57,
      fibra: 2.2,
      vitaminaC: 7,
      antioxidantes: 'Flavonoides'
    },
    tips: 'Buen equilibrio entre dulzura y jugosidad, se oxida más lentamente.',
    imagen: '/images/frutas/manzana-gala.png',
    color: 'from-orange-500 to-red-500',
    descripcion: 'Variedad suave y aromática, muy consumida fresca.'
  }
];
