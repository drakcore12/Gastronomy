export const CUTS_RES = [
  // ============================================================================
  // PRIMAL: TENDERLOIN / LOMO FINO
  // ============================================================================
  {
    id: 'lomo-fino',
    nombre: 'Lomo fino',
    alias: [
      'Filet mignon (US/FR)',
      'Tenderloin (US)',
      'Filete (ES)',
      'Lomo fino (CO)',
    ],
    primal: { id: 'tender', en: 'Tenderloin', es: 'Lomo fino', numero: '13' },
    especie: 'res',
    metodos: ['Parrilla', 'Sartén', 'Sellado rápido'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro, súper tierno',
    descripcion:
      'Corte muy tierno y magro, ideal para preparaciones rápidas a punto. Perfecto para medallones.',
    tips: 'Sella a fuego alto y termina a temperatura media. No sobrecocinar.',
  },

  // ==========================================================================
  // PRIMAL: SHORT LOIN / LOMO CORTO
  // ==========================================================================
  {
    id: 'solomillo',
    nombre: 'Striploin / New York',
    alias: [
      'New York strip (US)',
      'Striploin (US/UK)',
      'Bife de chorizo (AR/UY)',
      'Bife angosto (AR)',
      'Lomo liso (CL)',
      'Solomillo (CO)',
    ],
    primal: { id: 'shortloin', en: 'Short Loin', es: 'Lomo corto', numero: '10' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Equilibrado en grasa y terneza',
    descripcion:
      'Clásico para parrilla con buena jugosidad y sabor, con capa de grasa externa.',
    tips: 'Marcar bien la grasa para aportar sabor; reposo 5 minutos antes de cortar.',
  },
  {
    id: 't-bone',
    nombre: 'T-Bone / Porterhouse',
    alias: [
      'T-bone (US)',
      'Porterhouse (US)',
      'Chuletón T (ES)',
      'T-Bone (CO)',
    ],
    primal: { id: 'shortloin', en: 'Short Loin', es: 'Lomo corto', numero: '10' },
    especie: 'res',
    metodos: ['Parrilla'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Mixto: lomo fino + solomillo',
    descripcion:
      'Corte con hueso en T que combina dos músculos tiernos. Gran presentación en parrilla.',
    tips: 'Cocina indirecta para que el hueso transmita calor sin quemar el exterior.',
  },
  {
    id: 'club-steak',
    nombre: 'Club / Kansas City strip',
    alias: [
      'Club steak (US)',
      'Kansas City strip (US)',
      'Chuleta de lomo (ES)',
      'Chuleta de lomo (CO)',
    ],
    primal: { id: 'shortloin', en: 'Short Loin', es: 'Lomo corto', numero: '10' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Sabroso, con hueso',
    descripcion:
      'Strip con hueso (sin la porción del tender); más sabor por el hueso.',
    tips: 'Sella fuerte; termina indirecto cerca del hueso.',
  },

  // ==========================================================================
  // PRIMAL: RIB / COSTILLA
  // ==========================================================================
  {
    id: 'ribeye',
    nombre: 'Ribeye / Ojo de bife',
    alias: ['Ribeye (US)', 'Ojo de bife (AR)', 'Entrecot (ES)', 'Ribeye (CO)'],
    primal: { id: 'rib', en: 'Rib', es: 'Costilla', numero: '8' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'alta',
    proteina: 'alta',
    perfil: 'Marmoleo alto, muy jugoso',
    descripcion:
      'Corte de la costilla con gran marmoleo. Sabor intenso y textura mantecosa.',
    tips: 'Ideal a término medio. No necesita marinada; solo sal y pimienta.',
  },
  {
    id: 'costilla',
    nombre: 'Costilla / Short ribs',
    alias: [
      'Short ribs (US)',
      'Asado de tira (AR/UY)',
      'Costilla cargada (CO)',
    ],
    primal: { id: 'rib', en: 'Rib', es: 'Costilla', numero: '8' },
    especie: 'res',
    metodos: ['Brasear', 'Ahumar', 'Horno lento'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Altamente colagenoso, sabor profundo',
    descripcion:
      'Perfecta para braseados, guisos y BBQ estilo low & slow. Se deshace al comer.',
    tips: '150–160 °C por varias horas hasta que esté muy tierna.',
  },
  {
    id: 'prime-rib',
    nombre: 'Prime rib / Rib roast',
    alias: [
      'Prime rib (US)',
      'Rib roast (US/UK)',
      'Chuletón de costilla (ES)',
      'Costilla premium (CO)',
    ],
    primal: { id: 'rib', en: 'Rib', es: 'Costilla', numero: '8' },
    especie: 'res',
    metodos: ['Horno', 'Parrilla'],
    grasa: 'alta',
    proteina: 'alta',
    perfil: 'Extremadamente jugoso, festivo',
    descripcion:
      'Asado del costillar; clásico para hornear entero y cortar en la mesa.',
    tips: 'Dorar al inicio o al final; reposo largo antes de rebanar.',
  },
  {
    id: 'ribeye-cap',
    nombre: 'Ribeye cap',
    alias: [
      'Ribeye cap (US)',
      'Spinalis dorsi (anat.)',
      'Deckle (US)',
      'Tapa del ribeye (CO)',
    ],
    primal: { id: 'rib', en: 'Rib', es: 'Costilla', numero: '8' },
    especie: 'res',
    metodos: ['Parrilla', 'Sartén', 'Plancha'],
    grasa: 'alta',
    proteina: 'alta',
    perfil: 'Mantecoso, súper marmolado',
    descripcion:
      'La “tapa” del ribeye; muy codiciada por su terneza y grasa intramuscular.',
    tips: 'Cocción corta; basta sal gruesa para lucir su sabor.',
  },
  {
    id: 'back-ribs',
    nombre: 'Back ribs (costillas del lomo)',
    alias: [
      'Back ribs (US)',
      'Costillas del lomo (ES)',
      'Costillas del lomo (CO)',
    ],
    primal: { id: 'rib', en: 'Rib', es: 'Costilla', numero: '8' },
    especie: 'res',
    metodos: ['Ahumar', 'Horno lento', 'Brasear'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Colagenosas, ideales para BBQ',
    descripcion:
      'Costillas pegadas a la columna; menos carne que plate ribs pero muy sabrosas.',
    tips: 'Low & slow 3–5 h; glasear al final para brillo.',
  },
  {
    id: 'tomahawk',
    nombre: 'Tomahawk (presentación)',
    alias: ['Tomahawk (US)', 'Rib steak bone-in (US)', 'Tomahawk (CO)'],
    primal: { id: 'rib', en: 'Rib', es: 'Costilla', numero: '8' },
    especie: 'res',
    metodos: ['Parrilla', 'Horno'],
    grasa: 'alta',
    proteina: 'alta',
    perfil: 'Espectacular, con hueso largo',
    descripcion:
      'Ribeye con costilla larga “frenched”; mismo sabor del ribeye en formato show.',
    tips: 'Marcar directo y terminar indirecto; usar termómetro.',
  },

  // ==========================================================================
  // PRIMAL: TOP SIRLOIN / SOLOMILLO SUPERIOR
  // ==========================================================================
  {
    id: 'punta-de-anca',
    nombre: 'Punta de anca / Picanha',
    alias: [
      'Picanha (BR)',
      'Punta de anca (CO)',
      'Sirloin cap (US)',
      'Tapa de cuadril (AR)',
    ],
    primal: { id: 'topsir', en: 'Top Sirloin', es: 'Solomillo superior', numero: '14' },
    especie: 'res',
    metodos: ['Parrilla', 'Horno'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Capa de grasa sabrosa',
    descripcion:
      'Muy popular en Colombia y Brasil. Jugosa, con tapa de grasa que aporta sabor y crocancia.',
    tips: 'Cocina primero por el lado de la grasa para derretirla y dorarla.',
  },
  {
    id: 'top-sirloin-steak',
    nombre: 'Top sirloin steak (center-cut)',
    alias: [
      'Top sirloin steak (US)',
      'Centro de solomillo (ES)',
      'Centro de solomillo (CO)',
    ],
    primal: { id: 'topsir', en: 'Top Sirloin', es: 'Solomillo superior', numero: '14' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha', 'Sartén'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Equilibrado, rendidor',
    descripcion:
      'Corazón del top sirloin; buena terneza y sabor sin exceso de grasa.',
    tips: 'Marcar por ambos lados; reposar 5 min antes de cortar.',
  },

  // ==========================================================================
  // PRIMAL: BOTTOM SIRLOIN / CUADRIL
  // ==========================================================================
  {
    id: 'cuadril',
    nombre: 'Cuadril / Rump',
    alias: ['Rump (UK)', 'Cuadril (AR/CO)', 'Rabadilla (CO)'],
    primal: { id: 'bottomsir', en: 'Bottom Sirloin', es: 'Cuadril', numero: '15' },
    especie: 'res',
    metodos: ['Parrilla', 'Sartén'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro, sabroso',
    descripcion:
      'Corte versátil del cuarto trasero: laminado para asar o en cubos para salteados.',
    tips: 'Corta en contra de la fibra para máxima terneza.',
  },
  {
    id: 'tri-tip',
    nombre: 'Tri-tip',
    alias: [
      'Tri-tip (US)',
      'Colita de cuadril (AR/UY)',
      'Maminha (BR)',
      'Colita de cuadril (CO)',
    ],
    primal: { id: 'bottomsir', en: 'Bottom Sirloin', es: 'Cuadril', numero: '15' },
    especie: 'res',
    metodos: ['Parrilla', 'Horno'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Muy sabroso, grano marcado',
    descripcion:
      'Corte triangular del bottom sirloin; excelente para rebanar finito.',
    tips: 'Cocina a medio; rebana delgado y en contra de la fibra (cambia de dirección).',
  },
  {
    id: 'bavette-flap',
    nombre: 'Bavette / Flap meat',
    alias: [
      'Bavette (FR)',
      'Flap meat (US)',
      'Falda interna (ES)',
      'Falda interna (CO)',
    ],
    primal: { id: 'bottomsir', en: 'Bottom Sirloin', es: 'Cuadril', numero: '15' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Fibroso y súper sabroso',
    descripcion:
      'Lámina del flap; similar a vacío pero más suelta y muy jugosa.',
    tips: 'Marinar ayuda; siempre cortar en láminas contra la fibra.',
  },
  {
    id: 'ball-tip',
    nombre: 'Ball tip',
    alias: [
      'Ball tip (US)',
      'Centro de cuadril (ES)',
      'Centro de cuadril (CO)',
    ],
    primal: { id: 'bottomsir', en: 'Bottom Sirloin', es: 'Cuadril', numero: '15' },
    especie: 'res',
    metodos: ['Parrilla', 'Horno', 'Sartén'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro, versátil',
    descripcion:
      'Pieza cilíndrica del cuadril; va bien en filetes delgados o en roast.',
    tips: 'No sobrecocinar; marinar o dar reposo para suavizar.',
  },

  // ==========================================================================
  // PRIMAL: FLANK / VACÍO
  // ==========================================================================
  {
    id: 'vacío',
    nombre: 'Vacío / Flank steak',
    alias: [
      'Flank steak (US)',
      'Vacío (AR/CO)',
      'Bife de vacío (AR)',
      'Vacío (CO)',
    ],
    primal: { id: 'flank', en: 'Flank', es: 'Vacío', numero: '11' },
    especie: 'res',
    metodos: ['Parrilla', 'Asado lento'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Fibroso, muy sabroso',
    descripcion:
      'Lámina delgada con fibra marcada. Gran sabor; requiere corte fino tras reposo.',
    tips: 'Marina y cocina a punto medio; rebana fino en contra de la fibra.',
  },

  // ==========================================================================
  // PRIMAL: PLATE / FALDA
  // ==========================================================================
  {
    id: 'sobrebarriga',
    nombre: 'Sobrebarriga / Thin flank',
    alias: ['Sobrebarriga (CO)', 'Thin flank (UK)', 'Falda (CO/MX)'],
    primal: { id: 'plate', en: 'Plate', es: 'Falda', numero: '9' },
    especie: 'res',
    metodos: ['Brasear', 'Horno lento'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Gelatinoso, para cocción lenta',
    descripcion:
      'Clásico colombiano para sudados y asados largos. Colágeno que se vuelve mantequilla.',
    tips: 'Largo y lento con líquido aromático; terminar con dorado rápido.',
  },
  {
    id: 'outside-skirt',
    nombre: 'Skirt exterior (entraña gorda)',
    alias: [
      'Outside skirt (US)',
      'Entraña gorda (AR/CL)',
      'Entraña exterior (ES)',
      'Entraña gorda (CO)',
    ],
    primal: { id: 'plate', en: 'Plate', es: 'Falda', numero: '9' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Intensamente sabroso',
    descripcion: 'Entraña más gruesa y jugosa; favorita para asados y tacos.',
    tips: 'Cocción rápida alta; filetear muy fino contra la fibra.',
  },
  {
    id: 'inside-skirt',
    nombre: 'Skirt interior (entraña fina)',
    alias: [
      'Inside skirt (US)',
      'Entraña fina (AR/CL)',
      'Entraña interior (ES)',
      'Entraña fina (CO)',
    ],
    primal: { id: 'plate', en: 'Plate', es: 'Falda', numero: '9' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Súper rápida, gran sabor',
    descripcion: 'Entraña más delgada; ideal para sellados muy breves.',
    tips: '1–2 min por lado; reposo corto y corte en diagonal contra la fibra.',
  },
  {
    id: 'hanger-steak',
    nombre: 'Hanger steak (solomillo del carnicero)',
    alias: [
      'Hanger steak (US/UK)',
      'Solomillo de carnicero (ES)',
      'Hanging tender (US)',
      'Solomillo del carnicero (CO)',
    ],
    primal: { id: 'plate', en: 'Plate', es: 'Falda', numero: '9' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha', 'Sartén'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Muy sabroso, textura suelta',
    descripcion:
      'Músculo suspendido del diafragma; gran umami, mejor a punto medio.',
    tips: 'Retirar membranas; no pasar de medio para evitar dureza.',
  },
  {
    id: 'beef-navel',
    nombre: 'Beef navel (navel plate)',
    alias: [
      'Beef navel (US)',
      'Panceta de res (ES)',
      'Navel plate (US)',
      'Panceta de res (CO)',
    ],
    primal: { id: 'plate', en: 'Plate', es: 'Falda', numero: '9' },
    especie: 'res',
    metodos: ['Ahumar', 'Brasear', 'Horno lento'],
    grasa: 'alta',
    proteina: 'media',
    perfil: 'Graso y meloso',
    descripcion:
      'Se usa para pastrami/bacon de res; colágeno que funde y aporta potencia.',
    tips: 'Curado/ahumado lento; mantener 120–140 °C por varias horas.',
  },

  // ==========================================================================
  // PRIMAL: ROUND / POSTA - PIERNA
  // ==========================================================================
  // ==== ROUND ===============================================================
  {
    id: 'top-round',
    nombre: 'Top round (inside round)',
    alias: [
      'Top round (US)',
      'Posta negra / Contra (CO)',
      'Inside round (US/CA)',
      'Top round (CO)',
    ],
    primal: { id: 'round', en: 'Round', es: 'Posta / Pierna', numero: '16' },
    especie: 'res',
    metodos: ['Horno', 'Estofar', 'Plancha'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro, grano fino',
    descripcion:
      'Parte interna del muslo; bueno para roasts finos y milanesas.',
    tips: 'Golpear/abatir para ablandar si se hace a la plancha.',
  },
  {
    id: 'bottom-round',
    nombre: 'Bottom round (outside round)',
    alias: [
      'Bottom round (US)',
      'Babilla / Posta (CO)',
      'Outside round (US)',
      'Bottom round (CO)',
    ],
    primal: { id: 'round', en: 'Round', es: 'Posta / Pierna', numero: '16' },
    especie: 'res',
    metodos: ['Estofar', 'Brasear', 'Horno'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro y firme',
    descripcion: 'Parte externa del muslo; rinde en guisos y loncheados finos.',
    tips: 'Cocciones húmedas prolongadas para suavizar.',
  },
  {
    id: 'eye-of-round',
    nombre: 'Eye of round',
    alias: [
      'Eye of round (US)',
      'Muchacho redondo (CO)',
      'Redondo (ES)',
      'Eye of round (CO)',
    ],
    primal: { id: 'round', en: 'Round', es: 'Posta / Pierna', numero: '16' },
    especie: 'res',
    metodos: ['Horno', 'Brasear'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Muy magro, puede resecarse',
    descripcion:
      'Cilíndrico y compacto; bueno para roasts finos y deshidratados (cecinas).',
    tips: 'No pasar de término medio; reposo imprescindible.',
  },
  {
    id: 'knuckle',
    nombre: 'Knuckle (sirloin tip)',
    alias: [
      'Knuckle (US)',
      'Sirloin tip (US/CA)',
      'Bola / Pernil de cadera (CO)',
      'Solomo extranjero (CO)',
    ],
    primal: { id: 'round', en: 'Round', es: 'Posta / Pierna', numero: '16' },
    especie: 'res',
    metodos: ['Parrilla', 'Horno', 'Estofar'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro, versátil',
    descripcion:
      'Cuádriceps; sirve para bifes finos, milanesas o dados para guiso.',
    tips: 'Cortes finos y contra la fibra; si es grueso, marinar.',
  },

  // ==========================================================================
  // PRIMAL: BRISKET / PECHO
  // ==========================================================================
  // ==== BRISKET =============================================================
  {
    id: 'pecho',
    nombre: 'Pecho / Brisket',
    alias: ['Brisket (US)', 'Pecho (ES/CO)', 'Brisket (CO)'],
    primal: { id: 'brisket', en: 'Brisket', es: 'Pecho', numero: '6' },
    especie: 'res',
    metodos: ['Ahumar', 'Horno lento', 'Brasear'],
    grasa: 'alta',
    proteina: 'media',
    perfil: 'Graso y colagenoso',
    descripcion:
      'Rey del BBQ texano. Requiere paciencia para fundir colágeno y obtener jugosidad.',
    tips: "Baja temperatura 8–12 h; envolver en papel cuando 'stallea'.",
  },
  {
    id: 'brisket-flat',
    nombre: 'Brisket flat (plana)',
    alias: ['Brisket flat (US)', 'Pecho plano (ES/CO)', 'Brisket flat (CO)'],
    primal: { id: 'brisket', en: 'Brisket', es: 'Pecho', numero: '6' },
    especie: 'res',
    metodos: ['Ahumar', 'Horno lento', 'Brasear'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Más uniforme, rebana muy bien',
    descripcion:
      'La parte magra y pareja del pecho; clásica para rebanadas limpias.',
    tips: 'Mantener humedad; envolver cuando “stallea”.',
  },
  {
    id: 'brisket-point',
    nombre: 'Brisket point (punta)',
    alias: [
      'Brisket point (US)',
      'Punta de pecho (ES/CO)',
      'Brisket point (CO)',
    ],
    primal: { id: 'brisket', en: 'Brisket', es: 'Pecho', numero: '6' },
    especie: 'res',
    metodos: ['Ahumar', 'Horno lento', 'Brasear'],
    grasa: 'alta',
    proteina: 'media',
    perfil: 'Más grasa, ultra jugoso',
    descripcion: 'La sección más marmolada del pecho; ideal para burnt ends.',
    tips: 'Cocción más larga que el flat; renderizar grasa lentamente.',
  },

  // ==========================================================================
  // PRIMAL: SHANK / BRAZUELO
  // ==========================================================================
  // ==== SHANK ===============================================================
  {
    id: 'osobuco',
    nombre: 'Osobuco (corte transversal de morcillo)',
    alias: [
      'Ossobuco (IT)',
      'Osobuco (ES/AR)',
      'Shank cross-cut (US)',
      'Osobuco (CO)',
    ],
    primal: { id: 'rshank', en: 'Shank (rear)', es: 'Brazuelo trasero', numero: '18' },
    especie: 'res',
    metodos: ['Brasear'],
    grasa: 'baja',
    proteina: 'media',
    perfil: 'Con hueso y tuétano',
    descripcion:
      'Rodajas de pierna con hueso. El tuétano aporta untuosidad extraordinaria.',
    tips: 'Sellar fuerte y brasear 2–3 h con vino, tomate y hierbas.',
  },
  {
    id: 'morcillo',
    nombre: 'Morcillo / Jarrete',
    alias: [
      'Jarrete (ES)',
      'Morcillo (CO/ES)',
      'Shank (US/UK)',
      'Jarrete (CO)',
    ],
    primal: { id: 'fshank', en: 'Shank', es: 'Brazuelo', numero: '7' },
    especie: 'res',
    metodos: ['Brasear', 'Estofar'],
    grasa: 'baja',
    proteina: 'media',
    perfil: 'Fibroso, para guisos',
    descripcion:
      'Corte económico con gran sabor en cocciones húmedas y prolongadas.',
    tips: 'Añade ácido (vino/tomate) para ayudar a romper colágeno.',
  },

  // ==========================================================================
  // PRIMAL: CHUCK / ESPALDILLA
  // ==========================================================================
  // ==== CHUCK ===============================================================
  {
    id: 'flat-iron',
    nombre: 'Flat iron',
    alias: [
      'Flat iron (US)',
      'Bife de paleta (AR)',
      'Top blade steak (US)',
      'Bife de paleta (CO)',
    ],
    primal: { id: 'chuck', en: 'Chuck', es: 'Espaldilla', numero: '5' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha', 'Sartén', 'Sellado rápido'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Tierno, marmoleo medio',
    descripcion:
      'Del infraspinatus; uno de los cortes más tiernos del chuck una vez retirada la fascia.',
    tips: 'Retira la fascia central; sella fuerte y termina al punto deseado.',
  },
  {
    id: 'denver-steak',
    nombre: 'Denver steak',
    alias: [
      'Denver steak (US)',
      'Bife Denver (AR)',
      'Underblade steak (US)',
      'Denver steak (CO)',
    ],
    primal: { id: 'chuck', en: 'Chuck', es: 'Espaldilla', numero: '5' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha', 'Sartén'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Jugoso, buen marmoleo',
    descripcion:
      'Corte del underblade (serrato ventral); gran relación terneza/sabor.',
    tips: 'Ideal a término medio; rebanar en contra de la fibra.',
  },
  {
    id: 'chuck-eye-steak',
    nombre: 'Chuck eye steak',
    alias: [
      'Chuck eye steak (US)',
      'Delmonico (US)',
      'Ojo de aguja (ES)',
      'Ojo de aguja (CO)',
    ],
    primal: { id: 'chuck', en: 'Chuck', es: 'Espaldilla', numero: '5' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha', 'Sartén'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Sabroso, recuerda al ribeye',
    descripcion:
      'Porción del chuck contigua al ribeye; buen marmoleo a menor precio.',
    tips: 'Solo sal y pimienta; no pasar de término medio.',
  },
  {
    id: 'petite-tender',
    nombre: 'Petite tender',
    alias: [
      'Petite tender (US)',
      'Teres major (US)',
      'Bistec de paleta (ES)',
      'Bistec de paleta (CO)',
    ],
    primal: { id: 'chuck', en: 'Chuck', es: 'Espaldilla', numero: '5' },
    especie: 'res',
    metodos: ['Sartén', 'Plancha', 'Parrilla'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Muy tierno, magro',
    descripcion:
      'Pequeño músculo muy tierno del hombro; se comporta como un mini lomo.',
    tips: 'Sellar rápido y reposar; excelente para medallones.',
  },
  {
    id: 'shoulder-clod',
    nombre: 'Shoulder clod (paleta)',
    alias: [
      'Shoulder clod (US)',
      'Roast de paleta (ES)',
      'Paleta (CO)',
      'Paleta de res (CO)',
    ],
    primal: { id: 'chuck', en: 'Chuck', es: 'Espaldilla', numero: '5' },
    especie: 'res',
    metodos: ['Brasear', 'Horno', 'Asado lento'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro, para cocción lenta',
    descripcion:
      'Gran subprimal del hombro; ideal para roasts, desmechado y guisos.',
    tips: 'Baja temperatura con líquido aromático 3–5 h hasta que ceda.',
  },

  // ==========================================================================
  // PRIMAL: TONGUE / LENGUA — CHEEK / CARRILLERA — NECK / CUELLO
  // (Vísceras y cortes de variedad)
  // ==========================================================================
  // ==== OFFAL / VARIEDAD ====================================================
  {
    id: 'lengua',
    nombre: 'Lengua',
    alias: ['Lengua (ES/CO)', 'Tongue (US)'],
    primal: { id: 'tongue', en: 'Tongue', es: 'Lengua', numero: '2' },
    especie: 'res',
    metodos: ['Brasear', 'Estofar'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Gelatinosa y sabrosa',
    descripcion:
      'Se cocina larga y suavemente; luego se pela y se rebana o dora.',
    tips: 'Cocer 2–3 h con aromáticos; prensar y dorar para tacos.',
  },
  {
    id: 'carrillera',
    nombre: 'Carrillera / Cachete',
    alias: ['Carrillera (ES)', 'Cachete (CO)', 'Cheek (US)'],
    primal: { id: 'cheek', en: 'Cheek', es: 'Cachete', numero: '3' },
    especie: 'res',
    metodos: ['Brasear', 'Estofar'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Melosa, colagenosa',
    descripcion:
      'Fibra de trabajo con mucho colágeno; queda mantequillosa en guisos.',
    tips: 'Baja temperatura 2–4 h; termina con reducción del fondo.',
  },
  {
    id: 'cuello',
    nombre: 'Cuello',
    alias: ['Cuello (ES/CO)', 'Neck (US)'],
    primal: { id: 'neck', en: 'Neck', es: 'Cuello', numero: '4' },
    especie: 'res',
    metodos: ['Estofar', 'Brasear'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Fibroso, muy sabroso',
    descripcion:
      'Excelente para molida, ragú y cubos de guiso por su sabor intenso.',
    tips: 'Cortes pequeños y cocción húmeda prolongada.',
  },
  {
    id: 'higado',
    nombre: 'Hígado',
    alias: ['Hígado (ES/CO)', 'Liver (US)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'res',
    metodos: ['Plancha', 'Salteado', 'Paté'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Intenso y cremoso',
    descripcion:
      'Órgano muy nutritivo y con sabor marcado, rico en hierro y vitaminas.',
    tips: 'Marinar en leche para suavizar sabor y evitar amargor.',
  },
  {
    id: 'rinones',
    nombre: 'Riñones',
    alias: ['Riñones (ES/CO)', 'Kidneys (US)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'res',
    metodos: ['Salteado', 'Plancha', 'Estofado'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Sabor fuerte y particular',
    descripcion: 'Víscera de sabor intenso, tradicional en guisos y salteados.',
    tips: 'Remojar en leche o vinagre diluido antes de cocinar para suavizar sabor.',
  },
  {
    id: 'corazon',
    nombre: 'Corazón',
    alias: ['Corazón (ES/CO)', 'Heart (US)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'res',
    metodos: ['Parrilla', 'Plancha', 'Brochetas'],
    grasa: 'baja',
    proteina: 'alta',
    perfil: 'Magro, firme y muy sabroso',
    descripcion:
      'Fibroso pero jugoso; ideal para anticuchos, parrilla y guisos.',
    tips: 'Marinar y cocinar a fuego fuerte por poco tiempo.',
  },
  {
    id: 'mollejas',
    nombre: 'Mollejas',
    alias: ['Mollejas (ES/CO)', 'Sweetbreads (US)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'res',
    metodos: ['Plancha', 'Parrilla'],
    grasa: 'media',
    proteina: 'media',
    perfil: 'Cremosas y delicadas',
    descripcion:
      'Glándulas del timo o páncreas; manjar muy valorado en la cocina gourmet.',
    tips: 'Blanquear y dorar fuerte; textura suave y sabor delicado.',
  },
  {
    id: 'sesos',
    nombre: 'Sesos',
    alias: ['Sesos (ES/CO)', 'Brain (US)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'res',
    metodos: ['Empanizado', 'Frito', 'Revuelto'],
    grasa: 'alta',
    proteina: 'media',
    perfil: 'Muy tiernos y delicados',
    descripcion: 'Víscera blanda, se usa en frituras, revueltos y empanizados.',
    tips: 'Blanquear en agua con sal antes de cocinar.',
  },
  {
    id: 'callos',
    nombre: 'Callos / Tripas',
    alias: ['Callos (ES)', 'Callos (CO)', 'Tripe (US)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'res',
    metodos: ['Guiso', 'Estofado'],
    grasa: 'baja',
    proteina: 'media',
    perfil: 'Gelatinoso y fibroso',
    descripcion:
      'Partes del estómago (omaso, retículo, panal), clásicos en guisos tradicionales.',
    tips: 'Limpieza minuciosa y cocción prolongada con especias.',
  },
  {
    id: 'rabo',
    nombre: 'Rabo',
    alias: ['Rabo de toro (ES)', 'Oxtail (US)', 'Rabo (CO)'],
    primal: { id: 'oxtail', en: 'Oxtail', es: 'Rabo', numero: '17' },
    especie: 'res',
    metodos: ['Braseado', 'Estofado'],
    grasa: 'media',
    proteina: 'alta',
    perfil: 'Muy colagenoso y sabroso',
    descripcion:
      'Corte muy apreciado en guisos largos, suelta gran cantidad de gelatina.',
    tips: 'Dorar bien antes de brasear para potenciar sabor.',
  },
  {
    id: 'tuetano',
    nombre: 'Tuétano',
    alias: ['Tuétano (ES/CO)', 'Bone Marrow (US)'],
    primal: { id: 'offal', en: 'Offal', es: 'Vísceras' },
    especie: 'res',
    metodos: ['Horno', 'Braseado'],
    grasa: 'alta',
    proteina: 'baja',
    perfil: 'Untuoso y rico en colágeno',
    descripcion:
      'Médula de los huesos largos; se usa en caldos o al horno con pan.',
    tips: 'Hornear 12–15 min y servir con pan tostado.',
  },
];
