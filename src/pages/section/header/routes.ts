import { PageKey } from './types';

/**
 * Mapeo de PageKey a rutas href
 * Define las URLs para cada página del sitio
 */
export const PAGE_ROUTES: Record<PageKey, string> = {
  home: '/',
  ingredientes: '/ingredientes',
  proteina: '/ingredientes/proteina',
  verduras: '/ingredientes/verduras',
  frutas: '/ingredientes/frutas',
  especias: '/ingredientes/especias',
  harinas: '/ingredientes/harinas',
  aceites: '/ingredientes/aceites',
  legumbres: '/ingredientes/legumbres',
  recetas: '/recetas',
  arroces: '/recetas/arroces',
  bebidas: '/recetas/bebidas',
  ensaladas: '/recetas/ensaladas',
  estofados: '/recetas/estofados',
  pastas: '/recetas/pastas',
  postres: '/recetas/postres',
  proteinas: '/recetas/proteinas',
  salsas: '/recetas/salsas',
  sopas: '/recetas/sopas',
  tapas: '/recetas/tapas',
  tecnicas: '/tecnicas',
  herramientas: '/herramientas',
  examen: '/examen'
};

/**
 * Función helper para obtener la ruta de una página
 */
export function getPageRoute(page: PageKey): string {
  return PAGE_ROUTES[page] || '/';
}

/**
 * Función helper para verificar si una ruta es externa
 */
export function isExternalRoute(href: string): boolean {
  return href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
}
