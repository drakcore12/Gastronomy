import { Fruta } from './frutas';

export const KIWI: Fruta[] = [
  {
    id: 'kiwi',
    nombre: 'Kiwi',
    nombreEn: 'Kiwi',
    clasificacionCulinaria: 'acida',
    clasificacionBotanica: 'baya',
    perfiles: ['acido', 'tropical', 'refrescante'],
    origen: ['China'],
    regiones: ['Templado', 'Subtropical'],
    estacionalidad: [4, 5, 6, 7, 8, 9, 10], // Primavera-Otoño
    tecnicas: ['Supremas', 'Puré', 'Macerado', 'Deshidratado'],
    preparaciones: ['Smoothie', 'Tarta', 'Vinagreta', 'Salsa'],
    nutricion: {
      kcal: 61,
      fibra: 3.0,
      vitaminaC: 92.7,
      antioxidantes: 'Vitamina E, Luteína'
    },
    tips: 'Maduro cuando cede a la presión. La piel es comestible y rica en fibra.',
    imagen: '/images/frutas/kiwi.jpg',
    descripcion: 'Fruta ácida rica en vitamina C.',
    color: 'from-green-500 to-green-600'
  }
];
