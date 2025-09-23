export interface Especia {
  id: string;
  nombre: string;
  nombreCientifico: string;
  clasificacionBotanica: 'semillas' | 'cortezas' | 'raices' | 'flores' | 'hojas' | 'frutos' | 'resinas';
  origen: string;
  region: 'asia' | 'medio-oriente' | 'mediterraneo' | 'america' | 'africa' | 'europa';
  
  // Perfil sensorial
  perfilSensorial: {
    picante: number; // 0-10
    dulce: number; // 0-10
    citrico: number; // 0-10
    amargo: number; // 0-10
    mentolado: number; // 0-10
    ahumado: number; // 0-10
    calido: number; // 0-10
    fresco: number; // 0-10
  };
  
  // Propiedades técnicas
  intensidad: 'suave' | 'medio' | 'fuerte';
  color: string;
  aroma: string[];
  sabor: string[];
  
  // Usos culinarios
  usosCulinarios: string[];
  usosIdeales: {
    plato: string;
    dosis: string;
    tecnica: string;
  }[];
  
  // Compatibilidad
  compatibilidad: string[];
  mezclasTradicionales: {
    nombre: string;
    region: string;
    especias: string[];
  }[];
  
  // Propiedades medicinales
  propiedades: string[];
  
  // Información práctica
  almacenamiento: {
    temperatura: string;
    humedad: string;
    vidaUtil: string;
    formato: string;
  };
  
  // Seguridad
  precauciones: string[];
  dosisMaxima: string;
  
  // Metadatos
  colorGradiente: string;
  icono: string;
  descripcion: string;
  tips: string[];
}

export const ESPECIAS: Especia[] = [
  {
    id: 'pimienta-negra',
    nombre: 'Pimienta Negra',
    nombreCientifico: 'Piper nigrum',
    clasificacionBotanica: 'frutos',
    origen: 'India',
    region: 'asia',
    perfilSensorial: {
      picante: 7,
      dulce: 2,
      citrico: 1,
      amargo: 3,
      mentolado: 0,
      ahumado: 2,
      calido: 8,
      fresco: 1
    },
    intensidad: 'fuerte',
    color: 'Negro-marrón',
    aroma: ['Terroso', 'Picante', 'Cálido'],
    sabor: ['Picante', 'Terroso', 'Ligeramente dulce'],
    usosCulinarios: ['Carnes', 'Sopas', 'Salsas', 'Marinados', 'Encurtidos'],
    usosIdeales: [
      { plato: 'Filete de res', dosis: '1-2 g/kg', tecnica: 'Moler al momento' },
      { plato: 'Sopa de tomate', dosis: '0.5 g/l', tecnica: 'Agregar al final' },
      { plato: 'Marinado de pollo', dosis: '2-3 g/kg', tecnica: 'Mezclar con aceite' }
    ],
    compatibilidad: ['Ajo', 'Tomillo', 'Romero', 'Laurel', 'Comino'],
    mezclasTradicionales: [
      { nombre: 'Quatre Épices', region: 'Francia', especias: ['Pimienta', 'Nuez moscada', 'Clavo', 'Jengibre'] },
      { nombre: 'Berbere', region: 'Etiopía', especias: ['Pimienta', 'Chile', 'Comino', 'Coriandro', 'Cardamomo'] }
    ],
    propiedades: ['Digestiva', 'Antioxidante', 'Antiinflamatoria'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '2-3 años (entera), 6-12 meses (molida)',
      formato: 'Entera o molida'
    },
    precauciones: ['Puede irritar el estómago en exceso'],
    dosisMaxima: '5 g por plato',
    colorGradiente: 'from-slate-700 to-slate-900',
    icono: 'Pepper',
    descripcion: 'La reina de las especias, esencial en cualquier cocina del mundo.',
    tips: [
      'Moler justo antes de usar para máximo sabor',
      'Tostar ligeramente para intensificar el aroma',
      'Usar en grano para caldos y estofados'
    ]
  },
  {
    id: 'comino',
    nombre: 'Comino',
    nombreCientifico: 'Cuminum cyminum',
    clasificacionBotanica: 'semillas',
    origen: 'Medio Oriente',
    region: 'medio-oriente',
    perfilSensorial: {
      picante: 4,
      dulce: 1,
      citrico: 0,
      amargo: 2,
      mentolado: 0,
      ahumado: 6,
      calido: 7,
      fresco: 0
    },
    intensidad: 'medio',
    color: 'Marrón dorado',
    aroma: ['Tierra', 'Ahumado', 'Cálido'],
    sabor: ['Tierra', 'Caliente', 'Ligeramente amargo'],
    usosCulinarios: ['Curries', 'Tacos', 'Hummus', 'Chili', 'Pan'],
    usosIdeales: [
      { plato: 'Curry indio', dosis: '3-5 g/kg', tecnica: 'Tostar antes de moler' },
      { plato: 'Tacos de carne', dosis: '2-3 g/kg', tecnica: 'Mezclar con chile' },
      { plato: 'Hummus', dosis: '1-2 g/taza', tecnica: 'Aceite caliente' }
    ],
    compatibilidad: ['Coriandro', 'Chile', 'Ajo', 'Cúrcuma', 'Cardamomo'],
    mezclasTradicionales: [
      { nombre: 'Garam Masala', region: 'India', especias: ['Comino', 'Coriandro', 'Cardamomo', 'Canela', 'Clavo'] },
      { nombre: 'Baharat', region: 'Medio Oriente', especias: ['Comino', 'Pimienta', 'Coriandro', 'Canela', 'Clavo'] }
    ],
    propiedades: ['Digestiva', 'Carminativa', 'Antioxidante'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '2-3 años (entera), 6-12 meses (molida)',
      formato: 'Entera o molida'
    },
    precauciones: ['Evitar en embarazo (altas dosis)'],
    dosisMaxima: '10 g por plato',
    colorGradiente: 'from-amber-600 to-orange-600',
    icono: 'Seed',
    descripcion: 'Esencia de la cocina mexicana e india, con sabor terroso y cálido.',
    tips: [
      'Tostar ligeramente antes de moler para intensificar el sabor',
      'Mezclar con coriandro para balance perfecto',
      'Agregar al aceite caliente para liberar aromas'
    ]
  },
  {
    id: 'canela',
    nombre: 'Canela',
    nombreCientifico: 'Cinnamomum verum',
    clasificacionBotanica: 'cortezas',
    origen: 'Sri Lanka',
    region: 'asia',
    perfilSensorial: {
      picante: 2,
      dulce: 8,
      citrico: 1,
      amargo: 1,
      mentolado: 0,
      ahumado: 0,
      calido: 9,
      fresco: 0
    },
    intensidad: 'medio',
    color: 'Marrón dorado',
    aroma: ['Dulce', 'Cálido', 'Especiado'],
    sabor: ['Dulce', 'Caliente', 'Ligeramente picante'],
    usosCulinarios: ['Postres', 'Café', 'Curries', 'Pan', 'Bebidas'],
    usosIdeales: [
      { plato: 'Tarta de manzana', dosis: '2-3 g/receta', tecnica: 'Mezclar con azúcar' },
      { plato: 'Café árabe', dosis: '1 rama/taza', tecnica: 'Infusión con café' },
      { plato: 'Curry tailandés', dosis: '1-2 g/kg', tecnica: 'Sofreír con cebolla' }
    ],
    compatibilidad: ['Clavo', 'Nuez moscada', 'Cardamomo', 'Jengibre', 'Vainilla'],
    mezclasTradicionales: [
      { nombre: 'Pumpkin Spice', region: 'EE.UU.', especias: ['Canela', 'Nuez moscada', 'Clavo', 'Jengibre'] },
      { nombre: 'Chai Masala', region: 'India', especias: ['Canela', 'Cardamomo', 'Clavo', 'Jengibre', 'Pimienta'] }
    ],
    propiedades: ['Antioxidante', 'Antiinflamatoria', 'Reguladora de azúcar'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '2-3 años (rama), 1 año (molida)',
      formato: 'Rama o molida'
    },
    precauciones: ['Evitar en embarazo (altas dosis)'],
    dosisMaxima: '6 g por día',
    colorGradiente: 'from-amber-700 to-amber-800',
    icono: 'Bark',
    descripcion: 'Especia dulce perfecta para postres y bebidas, con aroma cálido y reconfortante.',
    tips: [
      'Usar en rama para infusiones, molida para hornear',
      'Combinar con clavo para sabor más intenso',
      'Agregar al café para sabor árabe'
    ]
  },
  {
    id: 'cardamomo',
    nombre: 'Cardamomo Verde',
    nombreCientifico: 'Elettaria cardamomum',
    clasificacionBotanica: 'semillas',
    origen: 'India',
    region: 'asia',
    perfilSensorial: {
      picante: 3,
      dulce: 4,
      citrico: 6,
      amargo: 1,
      mentolado: 5,
      ahumado: 0,
      calido: 6,
      fresco: 4
    },
    intensidad: 'medio',
    color: 'Verde pálido',
    aroma: ['Cítrico', 'Fresco', 'Mentolado'],
    sabor: ['Cítrico', 'Fresco', 'Ligeramente picante'],
    usosCulinarios: ['Café árabe', 'Curries', 'Pan dulce', 'Postres', 'Té'],
    usosIdeales: [
      { plato: 'Café árabe', dosis: '2-3 vainas/taza', tecnica: 'Infusión con café' },
      { plato: 'Curry masala', dosis: '1-2 g/kg', tecnica: 'Tostar y moler' },
      { plato: 'Pan dulce escandinavo', dosis: '1-2 g/receta', tecnica: 'Mezclar con harina' }
    ],
    compatibilidad: ['Canela', 'Clavo', 'Nuez moscada', 'Jengibre', 'Coriandro'],
    mezclasTradicionales: [
      { nombre: 'Garam Masala', region: 'India', especias: ['Cardamomo', 'Comino', 'Coriandro', 'Canela', 'Clavo'] },
      { nombre: 'Ras el Hanout', region: 'Marruecos', especias: ['Cardamomo', 'Canela', 'Clavo', 'Nuez moscada', 'Pimienta'] }
    ],
    propiedades: ['Digestiva', 'Antioxidante', 'Antimicrobiana'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '2-3 años (vaina), 6-12 meses (molida)',
      formato: 'Vaina o molida'
    },
    precauciones: ['Usar con moderación, muy aromática'],
    dosisMaxima: '3 g por plato',
    colorGradiente: 'from-green-500 to-emerald-600',
    icono: 'Seed',
    descripcion: 'Especia aromática con notas cítricas y frescas, esencial en la cocina árabe e india.',
    tips: [
      'Abrir la vaina justo antes de usar para preservar aroma',
      'Tostar ligeramente para intensificar sabor',
      'Combinar con canela para postres'
    ]
  },
  {
    id: 'curcuma',
    nombre: 'Cúrcuma',
    nombreCientifico: 'Curcuma longa',
    clasificacionBotanica: 'raices',
    origen: 'India',
    region: 'asia',
    perfilSensorial: {
      picante: 2,
      dulce: 1,
      citrico: 0,
      amargo: 4,
      mentolado: 0,
      ahumado: 0,
      calido: 5,
      fresco: 0
    },
    intensidad: 'medio',
    color: 'Amarillo dorado',
    aroma: ['Terroso', 'Amargo', 'Cálido'],
    sabor: ['Amargo', 'Terroso', 'Ligeramente picante'],
    usosCulinarios: ['Curries', 'Arroz', 'Sopas', 'Marinados', 'Colorante'],
    usosIdeales: [
      { plato: 'Curry de pollo', dosis: '3-5 g/kg', tecnica: 'Sofreír con cebolla' },
      { plato: 'Arroz amarillo', dosis: '1-2 g/taza', tecnica: 'Cocinar con arroz' },
      { plato: 'Golden Milk', dosis: '1-2 g/taza', tecnica: 'Infusión con leche' }
    ],
    compatibilidad: ['Comino', 'Coriandro', 'Jengibre', 'Chile', 'Ajo'],
    mezclasTradicionales: [
      { nombre: 'Curry Powder', region: 'India', especias: ['Cúrcuma', 'Comino', 'Coriandro', 'Chile', 'Fenogreco'] },
      { nombre: 'Ras el Hanout', region: 'Marruecos', especias: ['Cúrcuma', 'Comino', 'Coriandro', 'Canela', 'Clavo'] }
    ],
    propiedades: ['Antiinflamatoria', 'Antioxidante', 'Digestiva'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '2-3 años (raíz), 1 año (molida)',
      formato: 'Raíz fresca o molida'
    },
    precauciones: ['Puede manchar superficies', 'Evitar en embarazo (altas dosis)'],
    dosisMaxima: '8 g por día',
    colorGradiente: 'from-yellow-500 to-yellow-600',
    icono: 'Root',
    descripcion: 'Raíz dorada con propiedades antiinflamatorias, esencial en curries y colorante natural.',
    tips: [
      'Sofreír en aceite caliente para activar compuestos',
      'Combinar con pimienta negra para mejor absorción',
      'Usar para dar color dorado a platos'
    ]
  },
  {
    id: 'jengibre',
    nombre: 'Jengibre',
    nombreCientifico: 'Zingiber officinale',
    clasificacionBotanica: 'raices',
    origen: 'Asia',
    region: 'asia',
    perfilSensorial: {
      picante: 6,
      dulce: 3,
      citrico: 4,
      amargo: 1,
      mentolado: 0,
      ahumado: 0,
      calido: 8,
      fresco: 2
    },
    intensidad: 'fuerte',
    color: 'Beige dorado',
    aroma: ['Picante', 'Cítrico', 'Cálido'],
    sabor: ['Picante', 'Cítrico', 'Ligeramente dulce'],
    usosCulinarios: ['Curries', 'Té', 'Postres', 'Marinados', 'Sopas'],
    usosIdeales: [
      { plato: 'Té de jengibre', dosis: '2-3 cm/taza', tecnica: 'Infusión con agua caliente' },
      { plato: 'Curry tailandés', dosis: '3-5 g/kg', tecnica: 'Sofreír con ajo' },
      { plato: 'Galletas de jengibre', dosis: '2-3 g/receta', tecnica: 'Mezclar con harina' }
    ],
    compatibilidad: ['Ajo', 'Chile', 'Cúrcuma', 'Canela', 'Clavo'],
    mezclasTradicionales: [
      { nombre: 'Chai Masala', region: 'India', especias: ['Jengibre', 'Cardamomo', 'Canela', 'Clavo', 'Pimienta'] },
      { nombre: 'Five Spice', region: 'China', especias: ['Jengibre', 'Canela', 'Clavo', 'Anís estrellado', 'Hinojo'] }
    ],
    propiedades: ['Digestiva', 'Antiinflamatoria', 'Antinausea'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '2-3 años (raíz), 1 año (molida)',
      formato: 'Raíz fresca o molida'
    },
    precauciones: ['Evitar en embarazo (altas dosis)', 'Puede irritar el estómago'],
    dosisMaxima: '4 g por día',
    colorGradiente: 'from-amber-400 to-amber-500',
    icono: 'Root',
    descripcion: 'Raíz picante y aromática, perfecta para curries, tés y postres.',
    tips: [
      'Pelar solo la capa externa para preservar sabor',
      'Rallar fresco para máximo aroma',
      'Combinar con ajo para marinados asiáticos'
    ]
  },
  {
    id: 'clavo',
    nombre: 'Clavo de Olor',
    nombreCientifico: 'Syzygium aromaticum',
    clasificacionBotanica: 'flores',
    origen: 'Indonesia',
    region: 'asia',
    perfilSensorial: {
      picante: 8,
      dulce: 3,
      citrico: 0,
      amargo: 2,
      mentolado: 0,
      ahumado: 0,
      calido: 9,
      fresco: 0
    },
    intensidad: 'fuerte',
    color: 'Marrón oscuro',
    aroma: ['Intenso', 'Picante', 'Cálido'],
    sabor: ['Intenso', 'Picante', 'Ligeramente dulce'],
    usosCulinarios: ['Postres', 'Jamón', 'Mulled Wine', 'Curries', 'Pan'],
    usosIdeales: [
      { plato: 'Jamón glaseado', dosis: '2-3 clavos/kg', tecnica: 'Clavar en la carne' },
      { plato: 'Mulled Wine', dosis: '3-4 clavos/litro', tecnica: 'Infusión con vino' },
      { plato: 'Tarta de calabaza', dosis: '1-2 g/receta', tecnica: 'Mezclar con especias' }
    ],
    compatibilidad: ['Canela', 'Nuez moscada', 'Cardamomo', 'Jengibre', 'Pimienta'],
    mezclasTradicionales: [
      { nombre: 'Pumpkin Spice', region: 'EE.UU.', especias: ['Clavo', 'Canela', 'Nuez moscada', 'Jengibre'] },
      { nombre: 'Garam Masala', region: 'India', especias: ['Clavo', 'Cardamomo', 'Comino', 'Coriandro', 'Canela'] }
    ],
    propiedades: ['Antimicrobiana', 'Analgésica', 'Digestiva'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '3-4 años (entero), 1 año (molido)',
      formato: 'Entero o molido'
    },
    precauciones: ['Usar con moderación, muy potente', 'Puede causar irritación'],
    dosisMaxima: '2 g por plato',
    colorGradiente: 'from-amber-800 to-amber-900',
    icono: 'Flower',
    descripcion: 'Especia intensa con sabor único, perfecta para postres y bebidas calientes.',
    tips: [
      'Usar con moderación, muy potente',
      'Clavar en cebollas para caldos',
      'Combinar con canela para postres'
    ]
  },
  {
    id: 'nuez-moscada',
    nombre: 'Nuez Moscada',
    nombreCientifico: 'Myristica fragrans',
    clasificacionBotanica: 'frutos',
    origen: 'Indonesia',
    region: 'asia',
    perfilSensorial: {
      picante: 3,
      dulce: 6,
      citrico: 0,
      amargo: 1,
      mentolado: 0,
      ahumado: 0,
      calido: 7,
      fresco: 0
    },
    intensidad: 'medio',
    color: 'Marrón claro',
    aroma: ['Dulce', 'Cálido', 'Especiado'],
    sabor: ['Dulce', 'Cálido', 'Ligeramente picante'],
    usosCulinarios: ['Postres', 'Salsas', 'Purés', 'Bebidas', 'Pan'],
    usosIdeales: [
      { plato: 'Salsa bechamel', dosis: '1-2 g/litro', tecnica: 'Rallar al momento' },
      { plato: 'Puré de papas', dosis: '0.5-1 g/kg', tecnica: 'Mezclar al final' },
      { plato: 'Ponche de huevo', dosis: '1-2 g/litro', tecnica: 'Rallar en la superficie' }
    ],
    compatibilidad: ['Canela', 'Clavo', 'Cardamomo', 'Jengibre', 'Vainilla'],
    mezclasTradicionales: [
      { nombre: 'Pumpkin Spice', region: 'EE.UU.', especias: ['Nuez moscada', 'Canela', 'Clavo', 'Jengibre'] },
      { nombre: 'Quatre Épices', region: 'Francia', especias: ['Nuez moscada', 'Pimienta', 'Clavo', 'Jengibre'] }
    ],
    propiedades: ['Digestiva', 'Sedante', 'Antimicrobiana'],
    almacenamiento: {
      temperatura: '<18°C',
      humedad: '<60%',
      vidaUtil: '2-3 años (entera), 6-12 meses (molida)',
      formato: 'Entera o molida'
    },
    precauciones: ['Tóxica en altas dosis (>10g)', 'Evitar en embarazo'],
    dosisMaxima: '2 g por plato',
    colorGradiente: 'from-amber-300 to-amber-400',
    icono: 'Nut',
    descripcion: 'Especia dulce y cálida, perfecta para postres y salsas cremosas.',
    tips: [
      'Rallar al momento para máximo sabor',
      'Usar con moderación, muy potente',
      'Combinar con canela para postres'
    ]
  }
];

export const REGIONES = [
  { id: 'asia', nombre: 'Asia', color: 'from-red-200 to-red-400' },
  { id: 'medio-oriente', nombre: 'Medio Oriente', color: 'from-orange-200 to-orange-400' },
  { id: 'mediterraneo', nombre: 'Mediterráneo', color: 'from-blue-200 to-blue-400' },
  { id: 'america', nombre: 'América', color: 'from-green-200 to-green-400' },
  { id: 'africa', nombre: 'África', color: 'from-yellow-200 to-yellow-400' },
  { id: 'europa', nombre: 'Europa', color: 'from-purple-200 to-purple-400' }
];

export const CLASIFICACIONES_BOTANICAS = [
  { id: 'semillas', nombre: 'Semillas', icono: 'Seed' },
  { id: 'cortezas', nombre: 'Cortezas', icono: 'Bark' },
  { id: 'raices', nombre: 'Raíces', icono: 'Root' },
  { id: 'flores', nombre: 'Flores', icono: 'Flower' },
  { id: 'hojas', nombre: 'Hojas', icono: 'Leaf' },
  { id: 'frutos', nombre: 'Frutos', icono: 'Fruit' },
  { id: 'resinas', nombre: 'Resinas', icono: 'Droplet' }
];

export const USOS_CULINARIOS = [
  'Carnes', 'Pescados', 'Panadería', 'Curries', 'Salsas', 'Encurtidos', 
  'Repostería', 'Bebidas', 'Sopas', 'Marinados', 'Arroces', 'Vegetales'
];

export const PROPIEDADES = [
  'Digestiva', 'Antioxidante', 'Antiinflamatoria', 'Antimicrobiana', 
  'Carminativa', 'Sedante', 'Analgésica', 'Reguladora de azúcar'
];
