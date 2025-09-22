import { Fruta } from './frutas';

export const PINA: Fruta[] = [
  {
    id: 'pina',
    nombre: 'Piña',
    nombreEn: 'Pineapple',
    clasificacionCulinaria: 'dulce',
    clasificacionBotanica: 'agregado',
    perfiles: ['tropical', 'jugosa', 'dulce'],
    origen: ['América del Sur'],
    regiones: ['Tropical'],
    estacionalidad: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Todo el año
    tecnicas: ['Asado', 'Coulis', 'Macerado', 'Deshidratado'],
    preparaciones: ['Asado con especias', 'Salsa agridulce', 'Smoothie', 'Tarta'],
    nutricion: {
      kcal: 50,
      fibra: 1.4,
      vitaminaC: 47.8,
      antioxidantes: 'Bromelina, Beta-caroteno'
    },
    tips: 'Madura en la planta, no madura después de cosechada. La bromelina ablanda carnes.',
    imagen: '/images/frutas/pina.jpg',
    descripcion: 'Fruta tropical refrescante y versátil.',
    color: 'from-yellow-500 to-yellow-600'
  }
];
