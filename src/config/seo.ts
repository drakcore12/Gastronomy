// Configuración SEO centralizada para 2025
export const SEO_CONFIG = {
  // Información básica del sitio
  site: {
    name: 'Gastronomía Profesional - Miguel Ángel Noreña',
    url: 'https://gastronomia-profesional.com',
    description: 'Proyecto educativo e interactivo de gastronomía por Miguel Ángel Noreña Cano. Aprende sobre cortes de carne, técnicas culinarias y cultura gastronómica.',
    logo: 'https://gastronomia-profesional.com/logo.png',
    ogImage: 'https://gastronomia-profesional.com/og-image.jpg',
    author: 'Miguel Ángel Noreña Cano',
    location: 'Medellín, Colombia',
    github: 'https://github.com/drakcore12'
  },

  // Meta tags por defecto
  defaultMeta: {
    title: 'Guía Completa de Cortes de Carne | Gastronomía Profesional',
    description: 'Descubre todos los cortes de carne: res, cerdo, pollo, cordero, pavo, cabra y pescado. Aprende métodos de cocción, técnicas culinarias y consejos profesionales para chefs.',
    keywords: [
      'cortes de carne',
      'gastronomía',
      'cocina profesional',
      'métodos de cocción',
      'res',
      'cerdo',
      'pollo',
      'cordero',
      'pavo',
      'cabra',
      'pescado',
      'técnicas culinarias',
      'chef',
      'carnicería',
      'butcher cuts',
      'cooking methods'
    ],
    author: 'Miguel Ángel Noreña Cano',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },

  // Configuración por especies
  species: {
    res: {
      title: 'Cortes de Res | Guía Completa de Carne de Vaca',
      description: 'Descubre todos los cortes de res: ribeye, filete, lomo, costillas y más. Aprende métodos de cocción y técnicas profesionales.',
      keywords: ['cortes de res', 'carne de vaca', 'ribeye', 'filete', 'lomo', 'costillas', 'bistec']
    },
    cerdo: {
      title: 'Cortes de Cerdo | Guía Completa de Carne de Puerco',
      description: 'Explora los mejores cortes de cerdo: chuleta, lomo, costilla, jamón y más. Técnicas de cocción y consejos profesionales.',
      keywords: ['cortes de cerdo', 'carne de puerco', 'chuleta', 'lomo', 'costilla', 'jamón', 'panceta']
    },
    pollo: {
      title: 'Cortes de Pollo | Guía Completa de Aves de Corral',
      description: 'Aprende sobre cortes de pollo: pechuga, muslo, ala, contramuslo. Métodos de cocción y preparación profesional.',
      keywords: ['cortes de pollo', 'aves de corral', 'pechuga', 'muslo', 'ala', 'contramuslo', 'pollo entero']
    },
    cordero: {
      title: 'Cortes de Cordero | Guía Completa de Carne de Oveja',
      description: 'Descubre los cortes de cordero: chuleta, pierna, paletilla, costillas. Técnicas de cocción y preparación.',
      keywords: ['cortes de cordero', 'carne de oveja', 'chuleta', 'pierna', 'paletilla', 'costillas', 'cordero lechal']
    },
    pavo: {
      title: 'Cortes de Pavo | Guía Completa de Aves de Corral',
      description: 'Explora los cortes de pavo: pechuga, muslo, ala, contramuslo. Preparación y métodos de cocción.',
      keywords: ['cortes de pavo', 'aves de corral', 'pechuga de pavo', 'muslo de pavo', 'pavo entero']
    },
    cabra: {
      title: 'Cortes de Cabra | Guía Completa de Carne Caprina',
      description: 'Aprende sobre cortes de cabra: chuleta, pierna, costillas, paletilla. Técnicas de cocción tradicionales.',
      keywords: ['cortes de cabra', 'carne caprina', 'chuleta de cabra', 'pierna de cabra', 'costillas de cabra']
    },
    pescado: {
      title: 'Cortes de Pescado | Guía Completa de Mariscos',
      description: 'Descubre los cortes de pescado: filete, rodaja, lomo, cabeza. Técnicas de preparación y cocción.',
      keywords: ['cortes de pescado', 'mariscos', 'filete de pescado', 'rodaja', 'lomo de pescado', 'pescado entero']
    }
  },

  // Configuración de redes sociales
  social: {
    twitter: {
      card: 'summary_large_image',
      site: '@drakcore12',
      creator: '@drakcore12'
    },
    facebook: {
      appId: '', // Configurar si tienes Facebook App
      admins: '' // Configurar si tienes Facebook App
    },
    github: {
      username: 'drakcore12',
      url: 'https://github.com/drakcore12'
    }
  },

  // Configuración de analytics
  analytics: {
    googleAnalytics: 'G-XXXXXXXXXX', // Reemplazar con tu GA4 ID real
    googleTagManager: 'GTM-XXXXXXX', // Reemplazar con tu GTM ID real
    facebookPixel: '1234567890' // Reemplazar con tu Pixel ID real
  },

  // Configuración de rendimiento
  performance: {
    // Límites de Core Web Vitals
    lcpThreshold: 2500, // ms
    fidThreshold: 100, // ms
    clsThreshold: 0.1,
    
    // Configuración de lazy loading
    lazyLoadOffset: 100, // px
    imageQuality: 85, // %
    
    // Configuración de caché
    cacheMaxAge: 31536000, // 1 año en segundos
  }
};

// Función para generar meta tags dinámicos
export function generateMetaTags(page: string, species?: string) {
  const baseMeta = SEO_CONFIG.defaultMeta;
  const speciesMeta = species ? SEO_CONFIG.species[species as keyof typeof SEO_CONFIG.species] : null;
  
  return {
    title: speciesMeta?.title || baseMeta.title,
    description: speciesMeta?.description || baseMeta.description,
    keywords: speciesMeta?.keywords ? 
      [...baseMeta.keywords, ...speciesMeta.keywords].join(', ') : 
      baseMeta.keywords.join(', '),
    ...baseMeta
  };
}

// Función para generar URLs canónicas
export function generateCanonicalUrl(path: string = '') {
  return `${SEO_CONFIG.site.url}${path}`;
}

// Función para generar Open Graph tags
export function generateOpenGraphTags(page: string, species?: string) {
  const meta = generateMetaTags(page, species);
  
  return {
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': generateCanonicalUrl(),
    'og:image': SEO_CONFIG.site.ogImage,
    'og:type': 'website',
    'og:site_name': SEO_CONFIG.site.name,
    'og:locale': 'es_ES'
  };
}
