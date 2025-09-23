export const CUTS_LAMB = [
  // ============================================================================
  // PRIMAL: NECK / CUELLO
  // ============================================================================
  {
    id: 'neck-slices',
    nombre: 'Rodajas de cuello',
    alias: ['Neck Slices (EN)', 'Cuello (ES/CO)'],
    primal: { id: 'neck', en: 'Neck', es: 'Cuello', numero: '2' },
    especie: 'cordero',
    metodos: ['Braseado', 'Estofado'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Fibroso, muy sabroso.',
    descripcion:
      'Cuello cortado en rodajas transversales con hueso, ideal para guisos y estofados.',
    tips: 'Cocinar lentamente para extraer todo el colágeno.',
  },

  // ============================================================================
  // PRIMAL: SHOULDER / PALETA
  // ============================================================================
  {
    id: 'shoulder-blade-chop',
    nombre: 'Chuleta de paleta (blade)',
    alias: ['Shoulder Blade Chop (EN)', 'Chuleta de paleta (ES/CO)'],
    primal: { id: 'shoulder', en: 'Shoulder', es: 'Paleta', numero: '3' },
    especie: 'cordero',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Jugosa y con vetas de grasa.',
    descripcion: 'Corte de la parte alta de la paleta con hueso de escápula.',
    tips: 'Sellar fuerte a fuego alto y terminar en calor medio.',
  },
  {
    id: 'shoulder-arm-chop',
    nombre: 'Chuleta de paleta (arm)',
    alias: ['Shoulder Arm Chop (EN)', 'Chuleta de paleta (ES/CO)'],
    primal: { id: 'shoulder', en: 'Shoulder', es: 'Paleta', numero: '3' },
    especie: 'cordero',
    metodos: ['Parrilla', 'Plancha', 'Horno'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Sabor intenso.',
    descripcion: 'Corte desde la parte del brazuelo con hueso.',
    tips: 'Ideal marinado para suavizar fibras.',
  },

  // ============================================================================
  // PRIMAL: BREAST / PECHO - FALDA
  // ============================================================================
  {
    id: 'breast-riblets',
    nombre: 'Riblets de pecho',
    alias: ['Breast Riblets (EN)', 'Costillitas de pecho (ES/CO)'],
    primal: { id: 'breast', en: 'Breast', es: 'Pecho', numero: '4' },
    especie: 'cordero',
    metodos: ['Horno', 'Braseado'],
    grasa: 'alta',
    proteina: 'media',
    perfil: 'Carnoso y colagenoso.',
    descripcion: 'Tiras con hueso procedentes del extremo del costillar.',
    tips: 'Perfecto para cocción lenta y glaseado.',
  },
  {
    id: 'breast-rolled',
    nombre: 'Pecho enrollado',
    alias: ['Rolled Breast (EN)', 'Pecho enrollado (ES/CO)'],
    primal: { id: 'breast', en: 'Breast', es: 'Pecho', numero: '4' },
    especie: 'cordero',
    metodos: ['Horno', 'Estofado'],
    grasa: 'alta',
    proteina: 'media',
    perfil: 'Muy jugoso.',
    descripcion: 'Falda enrollada o rellena; económico y muy sabroso.',
    tips: 'Ideal con rellenos y cocción a baja temperatura.',
  },

  // ============================================================================
  // PRIMAL: RIB / COSTILLAR
  // ============================================================================
  {
    id: 'rack-frenched',
    nombre: 'Rack francés',
    alias: ['Frenched Rack of Lamb (EN)', 'Rack francés (ES/CO)'],
    primal: { id: 'rib', en: 'Rib', es: 'Costillar', numero: '6' },
    especie: 'cordero',
    metodos: ['Horno', 'Parrilla'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Muy fino y tierno.',
    descripcion: 'Costillar limpio con huesos expuestos.',
    tips: 'Marcar fuerte en sartén y terminar en horno a punto rosado.',
  },
  {
    id: 'rib-chops',
    nombre: 'Chuletas de costilla',
    alias: ['Rib Chops (EN)', 'Chuletas de costilla (ES/CO)'],
    primal: { id: 'rib', en: 'Rib', es: 'Costillar', numero: '6' },
    especie: 'cordero',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Chuletas tiernas y jugosas.',
    descripcion: 'Cortes individuales del costillar.',
    tips: 'Cocción breve y fuego fuerte.',
  },

  // ============================================================================
  // PRIMAL: LOIN / LOMO
  // ============================================================================
  {
    id: 'loin-chops',
    nombre: 'Chuletas de lomo',
    alias: [
      'Loin Chops (EN)',
      'T-bone Lamb Chops (EN)',
      'Chuletas de lomo (ES/CO)',
    ],
    primal: { id: 'loin', en: 'Loin', es: 'Lomo', numero: '7' },
    especie: 'cordero',
    metodos: ['Plancha', 'Parrilla'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Muy magras y elegantes.',
    descripcion: 'Chuletas con hueso en T provenientes del lomo.',
    tips: 'Sellar a fuego alto y mantener término rosado.',
  },
  {
    id: 'tenderloin',
    nombre: 'Solomillo',
    alias: ['Tenderloin (EN)', 'Solomillo (ES/CO)'],
    primal: { id: 'loin', en: 'Loin', es: 'Lomo', numero: '7' },
    especie: 'cordero',
    metodos: ['Saltear', 'Plancha'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Extremadamente tierno.',
    descripcion: 'Músculo interno del lomo, pequeño pero de gran calidad.',
    tips: 'Cocción muy rápida; no pasarse de término medio.',
  },

  // ============================================================================
  // PRIMAL: SIRLOIN / CADERA
  // ============================================================================
  {
    id: 'sirloin-chops',
    nombre: 'Chuletas de cadera',
    alias: ['Sirloin Chops (EN)', 'Chuletas de cadera (ES/CO)'],
    primal: { id: 'sirloin', en: 'Sirloin', es: 'Cadera', numero: '9' },
    especie: 'cordero',
    metodos: ['Parrilla', 'Horno'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Muy carnosas y sabrosas.',
    descripcion: 'Chuletas de la zona de la cadera, entre el lomo y la pierna.',
    tips: 'Marinar y sellar fuerte para máximo sabor.',
  },

  // ============================================================================
  // PRIMAL: LEG / PIERNA
  // ============================================================================
  {
    id: 'leg-steaks',
    nombre: 'Bifes de pierna',
    alias: ['Leg Steaks (EN)', 'Bifes de pierna (ES/CO)'],
    primal: { id: 'leg', en: 'Leg', es: 'Pierna', numero: '10' },
    especie: 'cordero',
    metodos: ['Plancha', 'Parrilla'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magros y prácticos.',
    descripcion: 'Cortes transversales de pierna deshuesada.',
    tips: 'Cocinar vuelta y vuelta para mantener jugosidad.',
  },
  {
    id: 'center-leg-roast',
    nombre: 'Pierna centro (asado)',
    alias: ['Center Leg Roast (EN)', 'Asado de pierna (ES/CO)'],
    primal: { id: 'leg', en: 'Leg', es: 'Pierna', numero: '10' },
    especie: 'cordero',
    metodos: ['Horno'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Uniforme y fácil de rebanar.',
    descripcion: 'Asado cilíndrico del centro de la pierna.',
    tips: 'Atar la carne para cocción pareja.',
  },

  // ============================================================================
  // PRIMAL: SHANK / JARRETE
  // ============================================================================
  {
    id: 'shank-osso-buco',
    nombre: 'Jarrete en rodajas (osso buco)',
    alias: ['Shank Slices (EN)', 'Osso Buco (IT)', 'Jarrete (ES/CO)'],
    primal: { id: 'shank', en: 'Shank', es: 'Jarrete', numero: '11' },
    especie: 'cordero',
    metodos: ['Braseado', 'Estofado'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Muy gelatinoso.',
    descripcion: 'Rodajas del jarrete delantero o trasero con tuétano.',
    tips: 'Brasear largo con vino y aromáticos.',
  },

  // ============================================================================
  // OFFAL / VÍSCERAS
  // ============================================================================
  {
    id: 'offal-liver',
    nombre: 'Hígado',
    alias: ['Liver (EN)', 'Foie de cordero (FR)', 'Hígado (ES/CO)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'cordero',
    metodos: ['Salteado', 'Paté'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Intenso y cremoso.',
    descripcion: 'Órgano rico en hierro, usado en patés y salteados.',
    tips: 'No sobrecocinar para evitar amargor.',
  },
  {
    id: 'offal-kidneys',
    nombre: 'Riñones',
    alias: ['Kidneys (EN)', 'Rognons (FR)', 'Riñones (ES/CO)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'cordero',
    metodos: ['Plancha', 'Salteado'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Sabor intenso y característico.',
    descripcion: 'Muy usados en brochetas y guisos.',
    tips: 'Remojar en leche para suavizar sabor.',
  },
  {
    id: 'offal-heart',
    nombre: 'Corazón',
    alias: ['Heart (EN)', 'Cœur (FR)', 'Corazón (ES/CO)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'cordero',
    metodos: ['Plancha', 'Estofado'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro y firme.',
    descripcion: 'Se usa en anticuchos o guisos.',
    tips: 'Marinar y cocción rápida para mantener ternura.',
  },
  {
    id: 'offal-sweetbreads',
    nombre: 'Mollejas',
    alias: ['Sweetbreads (EN)', 'Ris de veau (FR)', 'Mollejas (ES/CO)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'cordero',
    metodos: ['Plancha', 'Salteado'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Delicadas y cremosas.',
    descripcion: 'Glándulas del timo muy valoradas en alta cocina.',
    tips: 'Blanquear y dorar a fuego alto.',
  },
  {
    id: 'offal-brain',
    nombre: 'Sesos',
    alias: ['Brain (EN)', 'Cervelle (FR)', 'Sesos (ES/CO)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'cordero',
    metodos: ['Empanizado', 'Salteado'],
    grasa: 'alta',
    proteina: 'media',
    perfil: 'Muy tiernos.',
    descripcion: 'Usados en frituras y revueltos.',
    tips: 'Blanquear suavemente antes de empanar.',
  },
  {
    id: 'offal-tongue',
    nombre: 'Lengua',
    alias: ['Tongue (EN)', 'Langue (FR)', 'Lengua (ES/CO)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'cordero',
    metodos: ['Hervido', 'Estofado'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Gelatinoso y suave.',
    descripcion: 'Se pela tras cocción, excelente en salsas.',
    tips: 'Hervir 1.5–2 h y pelar en caliente.',
  },
];
