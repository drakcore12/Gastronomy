export type Cut = {
  id: string;
  nombre: string;
  alias?: string[];
  primal?: {
    id: string;
    en: string;
    es: string;
  };
  especie?: 'res' | 'cerdo' | 'pollo' | 'cordero' | 'pavo' | 'cabra' | 'pescado';
  metodos?: string[];
  grasa?: 'baja' | 'media' | 'alta';
  proteina?: 'baja' | 'media' | 'alta';
  perfil?: string;
  descripcion?: string;
  tips?: string;
};
