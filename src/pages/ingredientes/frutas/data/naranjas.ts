import { Fruta } from './frutas';

export const NARANJAS: Fruta[] = [
  {
    id: 'naranja-valencia',
    primaria: 'naranja',
    nombre: 'Naranja Valencia',
    nombreEn: 'Valencia Orange',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'hesperide',
    perfiles: ['dulce', 'jugosa', 'cítrica'],
    origen: ['España'],
    regiones: ['Mediterráneo', 'Subtropical'],
    estacionalidad: [3,4,5,6,7,8], // primavera-verano
    tecnicas: ['Jugo', 'Supremas', 'Rallado'],
    preparaciones: ['Jugo fresco', 'Marmalade', 'Vinagreta'],
    nutricion: { kcal: 47, fibra: 2.4, vitaminaC: 53.2, antioxidantes: 'Hesperidina, Beta-caroteno' },
    tips: 'Ideal para jugo, muy jugosa y dulce.',
    imagen: '/images/frutas/naranja-valencia.jpg',
    descripcion: 'Variedad tardía muy jugosa, perfecta para zumos.',
    color: 'from-orange-400 to-orange-500'
  },
  {
    id: 'naranja-navel',
    primaria: 'naranja',
    nombre: 'Naranja Navel',
    nombreEn: 'Navel Orange',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'hesperide',
    perfiles: ['dulce', 'sin semillas', 'fácil de pelar'],
    origen: ['Brasil'],
    regiones: ['Subtropical'],
    estacionalidad: [11,12,1,2,3,4], // invierno-primavera
    tecnicas: ['Supremas', 'Consumo directo', 'Rallado'],
    preparaciones: ['Ensaladas', 'Postres frescos', 'Marmalade'],
    nutricion: { kcal: 47, fibra: 2.4, vitaminaC: 53.2, antioxidantes: 'Hesperidina, Beta-caroteno' },
    tips: 'Sin semillas, ideal para comer en gajos o en ensaladas.',
    imagen: '/images/frutas/naranja-navel.jpg',
    descripcion: 'Variedad sin semillas, muy popular para consumo directo.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'naranja-sanguina',
    primaria: 'naranja',
    nombre: 'Naranja Sanguina',
    nombreEn: 'Blood Orange',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'hesperide',
    perfiles: ['dulce', 'pulpa rojiza', 'aromática'],
    origen: ['Italia (Sicilia)'],
    regiones: ['Mediterráneo'],
    estacionalidad: [12,1,2,3,4], // invierno-primavera
    tecnicas: ['Supremas', 'Jugo', 'Macerado'],
    preparaciones: ['Ensaladas coloridas', 'Sorbetes', 'Cócteles'],
    nutricion: { kcal: 47, fibra: 2.4, vitaminaC: 53.2, antioxidantes: 'Antocianinas, Hesperidina' },
    tips: 'La pulpa rojiza se debe a las antocianinas, muy antioxidante.',
    imagen: '/images/frutas/naranja-sanguina.jpg',
    descripcion: 'Variedad con pulpa rojiza, muy apreciada por su color y sabor.',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 'naranja-sevilla',
    primaria: 'naranja',
    nombre: 'Naranja de Sevilla',
    nombreEn: 'Seville Orange',
    clasificacionCulinaria: 'amarga',
    clasificacionBotanica: 'hesperide',
    perfiles: ['amarga', 'aromática'],
    origen: ['España'],
    regiones: ['Mediterráneo'],
    estacionalidad: [12,1,2,3],
    tecnicas: ['Confitura', 'Macerado'],
    preparaciones: ['Mermelada inglesa', 'Salsas agridulces', 'Licor Curaçao'],
    nutricion: { kcal: 46, fibra: 2.4, vitaminaC: 52, antioxidantes: 'Aceites esenciales' },
    tips: 'Muy amarga, casi no se consume fresca; ideal para mermeladas y licores.',
    imagen: '/images/frutas/naranja-sevilla.jpg',
    descripcion: 'Variedad amarga usada en mermeladas y licores tradicionales.',
    color: 'from-orange-600 to-brown-500'
  },
  {
    id: 'naranja-cara-cara',
    primaria: 'naranja',
    nombre: 'Naranja Cara Cara',
    nombreEn: 'Cara Cara Orange',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'hesperide',
    perfiles: ['dulce', 'pulpa rosa', 'sabor único'],
    origen: ['Venezuela'],
    regiones: ['Subtropical'],
    estacionalidad: [12,1,2,3,4], // invierno-primavera
    tecnicas: ['Supremas', 'Consumo directo'],
    preparaciones: ['Ensaladas especiales', 'Postres gourmet'],
    nutricion: { kcal: 47, fibra: 2.4, vitaminaC: 53.2, antioxidantes: 'Licopeno, Beta-caroteno' },
    tips: 'Pulpa rosa con sabor que recuerda a cereza y rosa.',
    imagen: '/images/frutas/naranja-cara-cara.jpg',
    descripcion: 'Variedad con pulpa rosa y sabor único, muy apreciada gourmet.',
    color: 'from-pink-400 to-orange-500'
  }
];
