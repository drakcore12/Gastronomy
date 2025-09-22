// ====================== CERDO ======================
export interface RazaPorcina {
  id: string;
  nombre: string;
  nombreCientifico: string; // p. ej., "Sus scrofa domesticus"
  origen: string;
  tipo: 'carne';
  popularidad: 'alta' | 'media' | 'baja';
  perfilCarne: {
    imfPorciento: number;                  // grasa intramuscular %
    backfatMm: number;                      // espesor de grasa dorsal (mm)
    ph24h: number;                          // pH a 24h (calidad, PSE/DFD)
    leanMeatPorciento?: number;             // % carne magra (LMP)
    dripLossPorciento?: number;             // % pérdida por goteo
    color?: { L: number; a: number; b: number }; // CIELab (opcional)
    etiqueta: 'magra' | 'equilibrada' | 'jugosa';
  };
  habitat: 'granjas-controladas' | 'aire-libre' | 'mixto';
  consumoGlobal: 'alto' | 'medio' | 'bajo';
  descripcion: string;
  caracteristicas: string[];
  crucesComunes?: string[];
  imagen?: string;
  color: string;
  badges: string[];
}

// Configuración de diseño específica para cerdo
export const CONFIG_CERDO = {
  // Información adicional en el modal
  infoAdicional: {
    titulo: 'Información adicional',
    campos: [
      { label: 'Sistema de producción', valor: 'habitat' },
      { label: 'Consumo global', valor: 'consumoGlobal' }
    ]
  },
  // Perfil de carne en el modal
  perfilCarne: {
    titulo: 'Perfil de Carne',
    mostrarIMF: true,
    mostrarDescripcion: true,
    descripcion: (imf: number) => {
      if (imf <= 2.5) return 'Carne muy magra, ideal para cortes premium y dietas saludables.';
      if (imf <= 4.0) return 'Carne equilibrada con buen marmoleo y jugosidad.';
      return 'Carne jugosa con excelente marmoleo, ideal para cortes especiales.';
    }
  },
  // KPIs específicos para cerdo (solo en modal, no en slider)
  kpis: [
    { label: 'Backfat', valor: 'backfatMm', unidad: 'mm' },
    { label: 'pH 24h', valor: 'ph24h', unidad: '' },
    { label: 'LMP', valor: 'leanMeatPorciento', unidad: '%' }
  ]
};

export const RAZAS_CERDO: RazaPorcina[] = [
  {
    id: 'yorkshire',
    nombre: 'Yorkshire',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Inglaterra',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      imfPorciento: 2.8,
      backfatMm: 18,
      ph24h: 5.6,
      leanMeatPorciento: 58,
      dripLossPorciento: 2.0,
      color: { L: 52, a: 16, b: 6 },
      etiqueta: 'magra'
    },
    habitat: 'granjas-controladas',
    consumoGlobal: 'alto',
    descripcion:
      'Raza Yorkshire (Large White), base materna en cruces industriales. Carne magra de buena calidad y canal rendidora.',
    caracteristicas: [
      'Alta prolificidad (materna)',
      'Crecimiento bueno',
      'Canal con buen rendimiento',
      'Adaptabilidad en sistemas intensivos',
      'Calidad de carne estable'
    ],
    crucesComunes: ['Yorkshire × Landrace', 'Yorkshire × Duroc'],
    imagen: '/images/raza/cerdo/yorkshire.jpg',
    color: 'bg-pink-100',
    badges: ['Magra', 'Industrial', 'Materna']
  },
  {
    id: 'landrace',
    nombre: 'Landrace',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Dinamarca',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      imfPorciento: 2.2,
      backfatMm: 15,
      ph24h: 5.7,
      leanMeatPorciento: 59,
      dripLossPorciento: 2.2,
      color: { L: 53, a: 15, b: 6 },
      etiqueta: 'magra'
    },
    habitat: 'granjas-controladas',
    consumoGlobal: 'alto',
    descripcion:
      'Raza Landrace danesa, muy magra y prolífica. Lomo largo, excelente para jamones y programas de selección.',
    caracteristicas: [
      'Carne muy magra',
      'Lomo y canal largos',
      'Alta prolificidad',
      'Bajo espesor de grasa',
      'Idónea para jamones'
    ],
    crucesComunes: ['Landrace × Yorkshire', 'Landrace × Pietrain'],
    imagen: '/images/raza/cerdo/landrace.jpg',
    color: 'bg-pink-200',
    badges: ['Magra', 'Prolífica', 'Jamones']
  },
  {
    id: 'duroc',
    nombre: 'Duroc',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'alta',
    perfilCarne: {
      imfPorciento: 4.2,
      backfatMm: 22,
      ph24h: 5.6,
      leanMeatPorciento: 54,
      dripLossPorciento: 2.5,
      color: { L: 50, a: 18, b: 6 },
      etiqueta: 'jugosa'
    },
    habitat: 'mixto',
    consumoGlobal: 'alto',
    descripcion:
      'Raza Duroc, reconocida por mayor grasa intramuscular y jugosidad. Muy usada para elevar calidad sensorial en cruces.',
    caracteristicas: [
      'Excelente marmoleo (IMF)',
      'Sabor marcado y jugosidad',
      'Buen crecimiento',
      'Aporta calidad a cruces',
      'Canal balanceada'
    ],
    crucesComunes: ['Duroc × Yorkshire', 'Duroc × Landrace'],
    imagen: '/images/raza/cerdo/duroc.jpg',
    color: 'bg-red-200',
    badges: ['Jugosa', 'Marmoleada', 'Premium']
  },
  {
    id: 'pietrain',
    nombre: 'Pietrain',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Bélgica',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      imfPorciento: 1.8,
      backfatMm: 12,
      ph24h: 5.5, // ajustado (riesgo PSE si baja demasiado)
      leanMeatPorciento: 62,
      dripLossPorciento: 2.8,
      color: { L: 55, a: 14, b: 6 },
      etiqueta: 'magra'
    },
    habitat: 'granjas-controladas',
    consumoGlobal: 'medio',
    descripcion:
      'Raza Pietrain, muy musculosa y magra. Alta conformación, común en cruces terminales.',
    caracteristicas: [
      'Muy alto rendimiento muscular',
      'Carne magra',
      'Excelente conformación',
      'Sensibilidad al estrés',
      'Uso terminal en cruces'
    ],
    crucesComunes: ['Pietrain × Landrace', 'Pietrain × Yorkshire'],
    imagen: '/images/raza/cerdo/pietrain.jpg',
    color: 'bg-gray-200',
    badges: ['Magra', 'Muscular', 'Cruces']
  },
  {
    id: 'hampshire',
    nombre: 'Hampshire',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Estados Unidos',
    tipo: 'carne',
    popularidad: 'media',
    perfilCarne: {
      imfPorciento: 2.5,
      backfatMm: 20,
      ph24h: 5.6,
      leanMeatPorciento: 56,
      dripLossPorciento: 2.3,
      color: { L: 51, a: 17, b: 6 },
      etiqueta: 'equilibrada'
    },
    habitat: 'mixto',
    consumoGlobal: 'medio',
    descripcion:
      'Raza Hampshire, perfil equilibrado entre magro y jugosidad. Versátil y con buen desempeño en diversos sistemas.',
    caracteristicas: [
      'Equilibrio grasa-músculo',
      'Buen desempeño productivo',
      'Rusticidad media',
      'Crecimiento consistente',
      'Versatilidad en cruces'
    ],
    crucesComunes: ['Hampshire × Yorkshire', 'Hampshire × Duroc'],
    imagen: '/images/raza/cerdo/hampshire.jpg',
    color: 'bg-black',
    badges: ['Equilibrada', 'Versátil', 'Consistente']
  },
  {
    id: 'berkshire',
    nombre: 'Berkshire',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Inglaterra',
    tipo: 'carne',
    popularidad: 'media', // ajustado: niche gourmet pero no "baja" en su segmento
    perfilCarne: {
      imfPorciento: 4.5,
      backfatMm: 25,
      ph24h: 5.7,
      leanMeatPorciento: 52,
      dripLossPorciento: 2.3,
      color: { L: 49, a: 19, b: 6 },
      etiqueta: 'jugosa'
    },
    habitat: 'aire-libre',
    consumoGlobal: 'bajo',
    descripcion:
      'Raza Berkshire, carne premium con marmoleo notable y sabor tradicional. Muy apreciada en mercados gourmet.',
    caracteristicas: [
      'Carne premium',
      'Marmoleo elevado',
      'Sabor tradicional',
      'Crecimiento más lento',
      'Alta valoración gourmet'
    ],
    crucesComunes: ['Berkshire × Duroc'],
    imagen: '/images/raza/cerdo/berkshire.jpg',
    color: 'bg-slate-800',
    badges: ['Premium', 'Gourmet', 'Marmoleo']
  },
  {
    id: 'mangalica',
    nombre: 'Mangalica',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Hungría',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      imfPorciento: 6.0,
      backfatMm: 35,
      ph24h: 5.6,
      leanMeatPorciento: 45,
      dripLossPorciento: 2.0,
      color: { L: 48, a: 18, b: 7 },
      etiqueta: 'jugosa'
    },
    habitat: 'aire-libre',
    consumoGlobal: 'bajo',
    descripcion:
      'Raza Mangalica húngara, famosa por su pelo lanoso y carne muy grasa, de gran sabor para curados tradicionales.',
    caracteristicas: [
      'IMF muy alto',
      'Espesor de grasa elevado',
      'Sabor intenso',
      'Crecimiento lento',
      'Apta para curados'
    ],
    crucesComunes: ['Mangalica × Duroc'],
    imagen: '/images/raza/cerdo/mangalica.jpg',
    color: 'bg-yellow-200',
    badges: ['Grasa', 'Curados', 'Tradición']
  },
  {
    id: 'tamworth',
    nombre: 'Tamworth',
    nombreCientifico: 'Sus scrofa domesticus',
    origen: 'Inglaterra',
    tipo: 'carne',
    popularidad: 'baja',
    perfilCarne: {
      imfPorciento: 2.2,
      backfatMm: 18,
      ph24h: 5.6,
      leanMeatPorciento: 54,
      dripLossPorciento: 2.1,
      color: { L: 52, a: 16, b: 6 },
      etiqueta: 'magra'
    },
    habitat: 'aire-libre',
    consumoGlobal: 'bajo',
    descripcion:
      'Raza Tamworth, rústica y apta para pastoreo. Carne más magra con buen sabor y adaptación a climas variables.',
    caracteristicas: [
      'Alta rusticidad',
      'Apta para pastoreo',
      'Carne magra',
      'Buena adaptación climática',
      'Longevidad en sistemas extensivos'
    ],
    crucesComunes: ['Tamworth × Berkshire'],
    imagen: '/images/raza/cerdo/tamworth.jpg',
    color: 'bg-orange-200',
    badges: ['Rústica', 'Pastoreo', 'Magra']
  }
];
