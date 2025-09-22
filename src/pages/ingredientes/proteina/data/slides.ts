// src/data/slides.ts
export type GraphicId =
  | 'cow' // res
  | 'pig' // cerdo
  | 'chicken' // pollo
  | 'lamb' // cordero
  | 'turkey' // pavo
  | 'goat' // cabra
  | 'fish'; // pescado

export type Theme = {
  /** Fondo del slide */
  bg: string; // ej: 'bg-gradient-to-br from-red-700 via-red-600 to-amber-600'
  /** Colores de texto */
  text: string; // ej: 'text-white' o 'text-slate-900'
  textMuted: string; // ej: 'text-white/90' o 'text-slate-800/90'
  accent: string; // ej: 'text-amber-300'
  /** Botones */
  btnSolid: string; // ej: 'bg-white text-red-700'
  btnOutline: string; // ej: 'border-white/40 text-white hover:bg-white/10'
};

export type Slide = {
  key: string;
  titleA: string;
  titleB: string;
  body: string;
  cta1: { href: string; label: string };
  cta2: { href: string; label: string };
  graphic: GraphicId;
  theme: Theme;
};

const slides: Slide[] = [
  {
    key: 'res',
    titleA: 'Cortes de',
    titleB: 'Res',
    body: 'Empezamos con la base: entender qué es cada corte, cómo cocinarlo y por qué. Sin registros ni complicaciones: puro conocimiento práctico.',
    cta1: { href: '#cortes', label: 'Explorar cortes' },
    cta2: { href: '#metodos', label: 'Métodos de cocción' },
    graphic: 'cow',
    theme: {
      bg: 'bg-gradient-to-br from-red-700 via-red-600 to-amber-600',
      text: 'text-white',
      textMuted: 'text-white/90',
      accent: 'text-amber-300',
      btnSolid: 'bg-white text-red-700',
      btnOutline: 'border-white/40 text-white hover:bg-white/10',
    },
  },
  {
    key: 'cerdo',
    titleA: 'Cortes de',
    titleB: 'Cerdo',
    body: 'Del lomo a la panceta: cortes versátiles para parrilla, horno y salteados. Aprende puntos, marinadas y crocancia perfecta.',
    cta1: { href: '#cortes', label: 'Ver cortes de cerdo' },
    cta2: { href: '#metodos', label: 'Técnicas recomendadas' },
    graphic: 'pig',
    theme: {
      bg: 'bg-gradient-to-br from-pink-600 via-rose-500 to-amber-400',
      text: 'text-white',
      textMuted: 'text-white/90',
      accent: 'text-fuchsia-200',
      btnSolid: 'bg-white text-pink-700',
      btnOutline: 'border-white/40 text-white hover:bg-white/10',
    },
  },
  {
    key: 'pollo',
    titleA: 'Cortes de',
    titleB: 'Pollo',
    body: 'Pechuga, muslo y alas: domina jugosidad, piel crocante y seguridad alimentaria sin perder sabor.',
    cta1: { href: '#cortes', label: 'Ver cortes de pollo' },
    cta2: { href: '#metodos', label: 'Métodos para aves' },
    graphic: 'chicken',
    theme: {
      bg: 'bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500',
      text: 'text-slate-900',
      textMuted: 'text-slate-800/90',
      accent: 'text-white',
      btnSolid: 'bg-slate-900 text-white',
      btnOutline: 'border-slate-900/20 text-slate-900 hover:bg-white/10',
    },
  },
  {
    key: 'pescado',
    titleA: 'Cortes de',
    titleB: 'Pescado',
    body: 'Filetes y lomos: cocción precisa, piel crocante y técnicas suaves para preservar textura.',
    cta1: { href: '#cortes', label: 'Ver cortes de pescado' },
    cta2: { href: '#metodos', label: 'Plancha y vapor' },
    graphic: 'fish',
    theme: {
      bg: 'bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500',
      text: 'text-white',
      textMuted: 'text-white/90',
      accent: 'text-cyan-200',
      btnSolid: 'bg-white text-sky-700',
      btnOutline: 'border-white/40 text-white hover:bg-white/10',
    },
  },
  {
    key: 'cordero',
    titleA: 'Cortes de',
    titleB: 'Cordero',
    body: 'Pierna, paleta y rack: sabores intensos con hierbas, sellados aromáticos y cocciones lentas.',
    cta1: { href: '#cortes', label: 'Ver cortes de cordero' },
    cta2: { href: '#metodos', label: 'Bajos y lentos' },
    graphic: 'lamb',
    theme: {
      bg: 'bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500',
      text: 'text-white',
      textMuted: 'text-white/90',
      accent: 'text-lime-200',
      btnSolid: 'bg-white text-emerald-700',
      btnOutline: 'border-white/40 text-white hover:bg-white/10',
    },
  },
  {
    key: 'pavo',
    titleA: 'Cortes de',
    titleB: 'Pavo',
    body: 'Magro y rendidor: aprende salmueras, temperaturas internas y técnicas para piel dorada.',
    cta1: { href: '#cortes', label: 'Ver cortes de pavo' },
    cta2: { href: '#metodos', label: 'Ahumado y horno' },
    graphic: 'turkey',
    theme: {
      bg: 'bg-gradient-to-br from-orange-700 via-amber-600 to-rose-500',
      text: 'text-white',
      textMuted: 'text-white/90',
      accent: 'text-orange-200',
      btnSolid: 'bg-white text-orange-700',
      btnOutline: 'border-white/40 text-white hover:bg-white/10',
    },
  },
  {
    key: 'cabra',
    titleA: 'Cortes de',
    titleB: 'Cabra',
    body: 'Excelente para estofados y parrilla regional. Controla el punto para lograr ternura y carácter.',
    cta1: { href: '#cortes', label: 'Ver cortes de cabra' },
    cta2: { href: '#metodos', label: 'Braseados y marinados' },
    graphic: 'goat',
    theme: {
      bg: 'bg-gradient-to-br from-purple-700 via-violet-600 to-fuchsia-500',
      text: 'text-white',
      textMuted: 'text-white/90',
      accent: 'text-violet-200',
      btnSolid: 'bg-white text-purple-700',
      btnOutline: 'border-white/40 text-white hover:bg-white/10',
    },
  },
];

export default slides;
