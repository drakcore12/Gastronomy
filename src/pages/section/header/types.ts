import React from 'react';

/* ============================
 * Tipos y constantes
 * ============================ */

export type PageKey =
  | 'home'
  | 'ingredientes'
  | 'proteina'
  | 'verduras'
  | 'frutas'
  | 'especias'
  | 'harinas'
  | 'aceites'
  | 'legumbres'
  | 'recetas'
  | 'arroces'
  | 'bebidas'
  | 'ensaladas'
  | 'estofados'
  | 'pastas'
  | 'postres'
  | 'proteinas'
  | 'salsas'
  | 'sopas'
  | 'tapas'
  | 'tecnicas'
  | 'herramientas'
  | 'examen';

export type IconType = React.ComponentType<{ className?: string }>;

export interface Breadcrumb {
  name: string;
  path: PageKey | string;
  icon?: IconType;
}

export interface HeaderProps {
  currentPage?: PageKey;
  breadcrumbs?: Breadcrumb[];
  onBack?: () => void;
  showBackButton?: boolean;
  onNavigate?: (page: PageKey) => void;
  showCategories?: boolean;
  className?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  color: string;
  borderColor: string;
  page: PageKey;
}

export interface PageInfo {
  name: string;
  icon: IconType;
  color: string;
  lightColor: string;
}
