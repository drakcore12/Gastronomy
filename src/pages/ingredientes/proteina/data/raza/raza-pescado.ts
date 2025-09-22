// ====================== PESCADO ======================
export interface RazaPez {
  id: string;
  nombre: string;
  nombreCientifico: string; // p. ej., "Salmo salar", "Oreochromis niloticus"
  origen: string;           // región/país o linaje comercial
  tipo: 'carne' | 'acuicultura';
  popularidad: 'alta' | 'media' | 'baja';
  perfilCarne: {
    grasaPorciento: number;        // % grasa total
    omega3MgPor100g?: number;      // mg/100g
    textura: 'fina' | 'media' | 'fibrosa';
    etiqueta: 'magra' | 'equilibrada' | 'jugosa';
    aptoSashimi?: boolean;
  };
  tipoPescado: 'blanco' | 'azul';
  origenProduccion: 'salvaje' | 'acuicultura';
  medio: 'agua-dulce' | 'marino';
  consumoGlobal: 'alto' | 'medio' | 'bajo';
  descripcion: string;
  caracteristicas: string[];
  imagen?: string;
  color: string;
  badges: string[];
}

// Configuración de diseño específica para pescado
export const CONFIG_PESCADO = {
  infoAdicional: {
    titulo: 'Información adicional',
    campos: [
      { label: 'Tipo de pescado', valor: 'tipoPescado' },
      { label: 'Origen producción', valor: 'origenProduccion' },
      { label: 'Medio', valor: 'medio' },
      { label: 'Consumo global', valor: 'consumoGlobal' }
    ]
  },
  perfilCarne: {
    titulo: 'Perfil de Carne',
    mostrarOmega3: true,
    mostrarDescripcion: true,
    descripcion: (grasa: number) => {
      if (grasa <= 2) return 'Pescado magro, ideal para dietas saludables y deportistas.';
      if (grasa <= 5) return 'Pescado equilibrado con buen sabor y textura.';
      return 'Pescado graso con excelente sabor y alto contenido de omega-3.';
    }
  },
  kpis: [
    { label: 'Grasa', valor: 'grasaPorciento', unidad: '%' },
    { label: 'Omega-3', valor: 'omega3MgPor100g', unidad: 'mg/100g' }
  ]
};

export const RAZAS_PESCADO: RazaPez[] = [
  {
    id: 'salmon-atlantico',
    nombre: 'Salmón Atlántico',
    nombreCientifico: 'Salmo salar',
    origen: 'Noruega/Escocia',
    tipo: 'acuicultura',
    popularidad: 'alta',
    perfilCarne: {
      grasaPorciento: 12.5,
      omega3MgPor100g: 2500,
      textura: 'fina',
      etiqueta: 'jugosa',
      aptoSashimi: true
    },
    tipoPescado: 'azul',
    origenProduccion: 'acuicultura',
    medio: 'marino',
    consumoGlobal: 'alto',
    descripcion: 'Salmón Atlántico de acuicultura, el más consumido mundialmente, carne jugosa y rica en omega-3.',
    caracteristicas: [
      'Alto contenido de omega-3',
      'Carne jugosa y tierna',
      'Color naranja característico',
      'Excelente para sashimi',
      'Producción controlada'
    ],
    imagen: '/images/raza/salmon-atlantico.jpg',
    color: 'bg-orange-200',
    badges: ['Omega-3', 'Jugosa', 'Sashimi']
  },
  {
    id: 'tilapia',
    nombre: 'Tilapia',
    nombreCientifico: 'Oreochromis niloticus',
    origen: 'Egipto/China',
    tipo: 'acuicultura',
    popularidad: 'alta',
    perfilCarne: {
      grasaPorciento: 2.3,
      omega3MgPor100g: 200,
      textura: 'fina',
      etiqueta: 'magra',
      aptoSashimi: false
    },
    tipoPescado: 'blanco',
    origenProduccion: 'acuicultura',
    medio: 'agua-dulce',
    consumoGlobal: 'alto',
    descripcion: 'Tilapia de acuicultura, el pescado más producido mundialmente, carne magra y versátil.',
    caracteristicas: [
      'Carne muy magra',
      'Sabor suave y neutro',
      'Excelente conversión alimentaria',
      'Muy versátil en cocina',
      'Producción sostenible'
    ],
    imagen: '/images/raza/tilapia.jpg',
    color: 'bg-gray-200',
    badges: ['Magra', 'Versátil', 'Sostenible']
  },
  {
    id: 'atun-azul',
    nombre: 'Atún Azul',
    nombreCientifico: 'Thunnus thynnus',
    origen: 'Japón/Mediterráneo',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasaPorciento: 15.8,
      omega3MgPor100g: 3000,
      textura: 'fina',
      etiqueta: 'jugosa',
      aptoSashimi: true
    },
    tipoPescado: 'azul',
    origenProduccion: 'salvaje',
    medio: 'marino',
    consumoGlobal: 'alto',
    descripcion: 'Atún Azul salvaje, el rey del sashimi, carne jugosa y rica en omega-3 de excelente calidad.',
    caracteristicas: [
      'Excelente para sashimi',
      'Alto contenido de omega-3',
      'Carne jugosa y firme',
      'Sabor intenso',
      'Precio premium'
    ],
    imagen: '/images/raza/atun-azul.jpg',
    color: 'bg-red-200',
    badges: ['Premium', 'Sashimi', 'Omega-3']
  },
  {
    id: 'bacalao-atlantico',
    nombre: 'Bacalao Atlántico',
    nombreCientifico: 'Gadus morhua',
    origen: 'Noruega/Islandia',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasaPorciento: 0.7,
      omega3MgPor100g: 300,
      textura: 'fina',
      etiqueta: 'magra',
      aptoSashimi: false
    },
    tipoPescado: 'blanco',
    origenProduccion: 'salvaje',
    medio: 'marino',
    consumoGlobal: 'alto',
    descripcion: 'Bacalao Atlántico salvaje, carne magra y firme, ideal para cocción y conservación.',
    caracteristicas: [
      'Carne muy magra',
      'Textura firme',
      'Excelente para cocción',
      'Ideal para salazón',
      'Sabor suave'
    ],
    imagen: '/images/raza/bacalao-atlantico.jpg',
    color: 'bg-gray-300',
    badges: ['Magra', 'Firme', 'Cocción']
  },
  {
    id: 'merluza',
    nombre: 'Merluza',
    nombreCientifico: 'Merluccius merluccius',
    origen: 'España/Argentina',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      grasaPorciento: 1.2,
      omega3MgPor100g: 400,
      textura: 'fina',
      etiqueta: 'magra',
      aptoSashimi: false
    },
    tipoPescado: 'blanco',
    origenProduccion: 'salvaje',
    medio: 'marino',
    consumoGlobal: 'alto',
    descripcion: 'Merluza salvaje, carne magra y delicada, muy popular en la cocina mediterránea.',
    caracteristicas: [
      'Carne magra y delicada',
      'Sabor suave',
      'Excelente para plancha',
      'Muy popular en España',
      'Textura tierna'
    ],
    imagen: '/images/raza/merluza.jpg',
    color: 'bg-gray-100',
    badges: ['Delicada', 'Mediterránea', 'Plancha']
  },
  {
    id: 'dorada',
    nombre: 'Dorada',
    nombreCientifico: 'Sparus aurata',
    origen: 'Mediterráneo',
    tipo: 'acuicultura',
    popularidad: 'media',
    perfilCarne: {
      grasaPorciento: 4.5,
      omega3MgPor100g: 800,
      textura: 'fina',
      etiqueta: 'equilibrada',
      aptoSashimi: false
    },
    tipoPescado: 'blanco',
    origenProduccion: 'acuicultura',
    medio: 'marino',
    consumoGlobal: 'medio',
    descripcion: 'Dorada de acuicultura mediterránea, carne equilibrada y sabrosa, ideal para cocción entera.',
    caracteristicas: [
      'Carne equilibrada',
      'Sabor mediterráneo',
      'Ideal para cocción entera',
      'Excelente presentación',
      'Producción controlada'
    ],
    imagen: '/images/raza/dorada.jpg',
    color: 'bg-yellow-200',
    badges: ['Equilibrada', 'Mediterránea', 'Entera']
  },
  {
    id: 'lubina',
    nombre: 'Lubina',
    nombreCientifico: 'Dicentrarchus labrax',
    origen: 'Mediterráneo',
    tipo: 'acuicultura',
    popularidad: 'media',
    perfilCarne: {
      grasaPorciento: 3.8,
      omega3MgPor100g: 600,
      textura: 'fina',
      etiqueta: 'equilibrada',
      aptoSashimi: false
    },
    tipoPescado: 'blanco',
    origenProduccion: 'acuicultura',
    medio: 'marino',
    consumoGlobal: 'medio',
    descripcion: 'Lubina de acuicultura mediterránea, carne equilibrada y firme, excelente para cocción.',
    caracteristicas: [
      'Carne equilibrada y firme',
      'Sabor mediterráneo',
      'Excelente para cocción',
      'Textura consistente',
      'Producción sostenible'
    ],
    imagen: '/images/raza/lubina.jpg',
    color: 'bg-blue-200',
    badges: ['Firme', 'Mediterránea', 'Cocción']
  },
  {
    id: 'trucha-arcoiris',
    nombre: 'Trucha Arcoíris',
    nombreCientifico: 'Oncorhynchus mykiss',
    origen: 'Estados Unidos',
    tipo: 'acuicultura',
    popularidad: 'media',
    perfilCarne: {
      grasaPorciento: 6.2,
      omega3MgPor100g: 1200,
      textura: 'fina',
      etiqueta: 'equilibrada',
      aptoSashimi: false
    },
    tipoPescado: 'azul',
    origenProduccion: 'acuicultura',
    medio: 'agua-dulce',
    consumoGlobal: 'medio',
    descripcion: 'Trucha Arcoíris de acuicultura, carne equilibrada y rica en omega-3, ideal para cocción.',
    caracteristicas: [
      'Carne equilibrada',
      'Alto contenido de omega-3',
      'Excelente para cocción',
      'Producción en agua dulce',
      'Sabor suave'
    ],
    imagen: '/images/raza/trucha-arcoiris.jpg',
    color: 'bg-pink-200',
    badges: ['Equilibrada', 'Omega-3', 'Dulce']
  }
];
