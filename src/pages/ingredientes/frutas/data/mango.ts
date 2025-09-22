import { Fruta } from './frutas';

export const MANGO: Fruta[] = [
  {
    id: 'mango',
    nombre: 'Mango',
    nombreEn: 'Mango',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'drupa',
    perfiles: ['tropical', 'cremoso', 'dulce'],
    origen: ['India'],
    regiones: ['Tropical', 'Subtropical'],
    estacionalidad: [3, 4, 5, 6, 7, 8, 9], // Primavera-Verano
    tecnicas: ['Supremas', 'Puré', 'Asado', 'Deshidratado'],
    preparaciones: ['Salsa picante', 'Smoothie', 'Tarta', 'Chutney'],
    nutricion: {
      kcal: 60,
      fibra: 1.6,
      vitaminaC: 36.4,
      antioxidantes: 'Beta-caroteno, Mangiferina'
    },
    tips: 'El mango maduro cede a la presión suave. La cáscara puede causar reacciones alérgicas.',
    imagen: '/images/frutas/mango.jpg',
    descripcion: 'Fruta tropical cremosa y dulce.',
    color: 'from-orange-500 to-yellow-500'
  }
];
