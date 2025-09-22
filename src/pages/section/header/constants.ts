import {
  Beef,
  Home,
  Carrot,
  Apple,
  Award,
  Wheat,
  Droplets,
  BookOpen,
  Hammer,
  Wrench
} from 'lucide-react';
import { PageInfo, PageKey } from './types';

/* ============================
 * Constantes de datos
 * ============================ */

/** Categorías principales con subcategorías */
export const MAIN_CATEGORIES = [
  {
    id: 'home',
    name: 'Inicio',
    icon: Home,
    color: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    page: 'home' as PageKey,
    subcategories: []
  },
  {
    id: 'ingredientes',
    name: 'Ingredientes',
    icon: Beef,
    color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    page: 'ingredientes' as PageKey,
    subcategories: [
      { id: 'aceites', name: 'Aceites', page: 'aceites' as PageKey },
      { id: 'proteina', name: 'Proteínas', page: 'proteina' as PageKey },
      { id: 'especias', name: 'Especias', page: 'especias' as PageKey },
      { id: 'frutas', name: 'Frutas', page: 'frutas' as PageKey },
      { id: 'verduras', name: 'Verduras', page: 'verduras' as PageKey },
      { id: 'harinas', name: 'Harinas', page: 'harinas' as PageKey },
      { id: 'legumbres', name: 'Legumbres', page: 'legumbres' as PageKey }
    ]
  },
  {
    id: 'recetas',
    name: 'Recetas',
    icon: BookOpen,
    color: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    page: 'recetas' as PageKey,
    subcategories: [
      { id: 'arroces', name: 'Arroces', page: 'arroces' as PageKey },
      { id: 'bebidas', name: 'Bebidas', page: 'bebidas' as PageKey },
      { id: 'ensaladas', name: 'Ensaladas', page: 'ensaladas' as PageKey },
      { id: 'estofados', name: 'Estofados', page: 'estofados' as PageKey },
      { id: 'pastas', name: 'Pastas', page: 'pastas' as PageKey },
      { id: 'postres', name: 'Postres', page: 'postres' as PageKey },
      { id: 'proteinas', name: 'Proteínas', page: 'proteinas' as PageKey },
      { id: 'salsas', name: 'Salsas', page: 'salsas' as PageKey },
      { id: 'sopas', name: 'Sopas', page: 'sopas' as PageKey },
      { id: 'tapas', name: 'Tapas', page: 'tapas' as PageKey }
    ]
  },
  {
    id: 'tecnicas',
    name: 'Técnicas',
    icon: Hammer,
    color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
    page: 'tecnicas' as PageKey,
    subcategories: []
  },
  {
    id: 'examen',
    name: 'Examen',
    icon: Award,
    color: 'bg-red-50 text-red-600 hover:bg-red-100',
    page: 'examen' as PageKey,
    subcategories: []
  }
] as const;

/* Mapa de páginas → nombre, icono y color */
export const PAGE_MAP: Record<PageKey, PageInfo> = {
  home: { name: 'Inicio', icon: Home, color: 'bg-orange-600', lightColor: 'bg-orange-50' },
  ingredientes: { name: 'Ingredientes', icon: Beef, color: 'bg-blue-600', lightColor: 'bg-blue-50' },
  proteina: { name: 'Proteínas', icon: Beef, color: 'bg-red-600', lightColor: 'bg-red-50' },
  verduras: { name: 'Verduras', icon: Carrot, color: 'bg-green-600', lightColor: 'bg-green-50' },
  frutas: { name: 'Frutas', icon: Apple, color: 'bg-yellow-600', lightColor: 'bg-yellow-50' },
  especias: { name: 'Especias', icon: Award, color: 'bg-purple-600', lightColor: 'bg-purple-50' },
  harinas: { name: 'Harinas', icon: Wheat, color: 'bg-amber-600', lightColor: 'bg-amber-50' },
  aceites: { name: 'Aceites', icon: Droplets, color: 'bg-blue-600', lightColor: 'bg-blue-50' },
  legumbres: { name: 'Legumbres', icon: Wheat, color: 'bg-green-600', lightColor: 'bg-green-50' },
  recetas: { name: 'Recetas', icon: BookOpen, color: 'bg-pink-600', lightColor: 'bg-pink-50' },
  arroces: { name: 'Arroces', icon: BookOpen, color: 'bg-yellow-600', lightColor: 'bg-yellow-50' },
  bebidas: { name: 'Bebidas', icon: BookOpen, color: 'bg-blue-600', lightColor: 'bg-blue-50' },
  ensaladas: { name: 'Ensaladas', icon: BookOpen, color: 'bg-green-600', lightColor: 'bg-green-50' },
  estofados: { name: 'Estofados', icon: BookOpen, color: 'bg-orange-600', lightColor: 'bg-orange-50' },
  pastas: { name: 'Pastas', icon: BookOpen, color: 'bg-yellow-600', lightColor: 'bg-yellow-50' },
  postres: { name: 'Postres', icon: BookOpen, color: 'bg-pink-600', lightColor: 'bg-pink-50' },
  proteinas: { name: 'Proteínas', icon: BookOpen, color: 'bg-red-600', lightColor: 'bg-red-50' },
  salsas: { name: 'Salsas', icon: BookOpen, color: 'bg-orange-600', lightColor: 'bg-orange-50' },
  sopas: { name: 'Sopas', icon: BookOpen, color: 'bg-blue-600', lightColor: 'bg-blue-50' },
  tapas: { name: 'Tapas', icon: BookOpen, color: 'bg-purple-600', lightColor: 'bg-purple-50' },
  tecnicas: { name: 'Técnicas', icon: Hammer, color: 'bg-indigo-600', lightColor: 'bg-indigo-50' },
  herramientas: { name: 'Herramientas', icon: Wrench, color: 'bg-gray-600', lightColor: 'bg-gray-50' },
  examen: { name: 'Examen', icon: Award, color: 'bg-red-600', lightColor: 'bg-red-50' }
};