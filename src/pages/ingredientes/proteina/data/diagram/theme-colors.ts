// Colores temáticos para diagramas basados en slides.ts
export const DIAGRAM_THEMES = {
  cow: {
    // Tema: bg-gradient-to-br from-red-700 via-red-600 to-amber-600
    bgGradient: {
      from: '#b91c1c', // red-700
      to: '#d97706'    // amber-600
    },
    dotInactive: '#ffffffd9',
    dotActive: '#ffffff',
    dotGlow: '#ffffff',
    pathStroke: '#ffffff',
    containerBg: 'bg-white/5',
    containerBorder: 'border-white/20',
    textColor: 'text-white',
    // Tooltip colors
    tooltipBg: '#ffffff', // Usar el color de texto del tema
    tooltipBgOpacity: 0.92,
    tooltipText1: '#B91C1C', // red-700
    tooltipText2: '#1f2937cc', // Texto secundario más oscuro para contraste
    tooltipArrow: '#ffffff' // Usar el color de texto del tema
  },
  pig: {
    // Tema: bg-gradient-to-br from-pink-600 via-rose-500 to-amber-400
    bgGradient: {
      from: '#db2777', // pink-600
      to: '#fbbf24'    // amber-400
    },
    dotInactive: '#ffffffd9',
    dotActive: '#ffffff',
    dotGlow: '#ffffff',
    pathStroke: '#ffffff',
    containerBg: 'bg-white/5',
    containerBorder: 'border-white/20',
    textColor: 'text-white',
    // Tooltip colors
    tooltipBg: '#ffffff', // Usar el color de texto del tema
    tooltipBgOpacity: 0.92,
    tooltipText1: '#DB2777', // pink-600
    tooltipText2: '#1f2937cc', // Texto secundario más oscuro para contraste
    tooltipArrow: '#ffffff' // Usar el color de texto del tema
  },
  chicken: {
    // Tema: bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500
    bgGradient: {
      from: '#eab308', // yellow-500
      to: '#f97316'    // orange-500
    },
    dotInactive: '#1f2937d9', // slate-800 con opacidad
    dotActive: '#1f2937',      // slate-800
    dotGlow: '#1f2937',
    pathStroke: '#1f2937',
    containerBg: 'bg-slate-800/5',
    containerBorder: 'border-slate-800/20',
    textColor: 'text-slate-800',
    // Tooltip colors
    tooltipBg: '#1f2937', // Usar el color de texto del tema (slate-800)
    tooltipBgOpacity: 0.92,
    tooltipText1: '#EAB308', // yellow-500
    tooltipText2: '#ffffffcc', // Texto secundario claro para contraste
    tooltipArrow: '#1f2937' // Usar el color de texto del tema
  },
  fish: {
    // Tema: bg-gradient-to-br from-sky-600 via-cyan-500 to-teal-500
    bgGradient: {
      from: '#0284c7', // sky-600
      to: '#14b8a6'    // teal-500
    },
    dotInactive: '#ffffffd9',
    dotActive: '#ffffff',
    dotGlow: '#ffffff',
    pathStroke: '#ffffff',
    containerBg: 'bg-white/5',
    containerBorder: 'border-white/20',
    textColor: 'text-white',
    // Tooltip colors
    tooltipBg: '#ffffff', // Usar el color de texto del tema
    tooltipBgOpacity: 0.92,
    tooltipText1: '#0284C7', // sky-600
    tooltipText2: '#1f2937cc', // Texto secundario más oscuro para contraste
    tooltipArrow: '#ffffff' // Usar el color de texto del tema
  },
  lamb: {
    // Tema: bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-500
    bgGradient: {
      from: '#047857', // emerald-700
      to: '#84cc16'    // lime-500
    },
    dotInactive: '#ffffffd9',
    dotActive: '#ffffff',
    dotGlow: '#ffffff',
    pathStroke: '#ffffff',
    containerBg: 'bg-white/5',
    containerBorder: 'border-white/20',
    textColor: 'text-white',
    // Tooltip colors
    tooltipBg: '#ffffff', // Usar el color de texto del tema
    tooltipBgOpacity: 0.92,
    tooltipText1: '#047857', // emerald-700
    tooltipText2: '#1f2937cc', // Texto secundario más oscuro para contraste
    tooltipArrow: '#ffffff' // Usar el color de texto del tema
  },
  turkey: {
    // Tema: bg-gradient-to-br from-orange-700 via-amber-600 to-rose-500
    bgGradient: {
      from: '#c2410c', // orange-700
      to: '#f43f5e'    // rose-500
    },
    dotInactive: '#ffffffd9',
    dotActive: '#ffffff',
    dotGlow: '#ffffff',
    pathStroke: '#ffffff',
    containerBg: 'bg-white/5',
    containerBorder: 'border-white/20',
    textColor: 'text-white',
    // Tooltip colors
    tooltipBg: '#ffffff', // Usar el color de texto del tema
    tooltipBgOpacity: 0.92,
    tooltipText1: '#C2410C', // orange-700
    tooltipText2: '#1f2937cc', // Texto secundario más oscuro para contraste
    tooltipArrow: '#ffffff' // Usar el color de texto del tema
  },
  goat: {
    // Tema: bg-gradient-to-br from-purple-700 via-violet-600 to-fuchsia-500
    bgGradient: {
      from: '#7c3aed', // purple-700
      to: '#d946ef'    // fuchsia-500
    },
    dotInactive: '#ffffffd9',
    dotActive: '#ffffff',
    dotGlow: '#ffffff',
    pathStroke: '#ffffff',
    containerBg: 'bg-white/5',
    containerBorder: 'border-white/20',
    textColor: 'text-white',
    // Tooltip colors
    tooltipBg: '#ffffff', // Usar el color de texto del tema
    tooltipBgOpacity: 0.92,
    tooltipText1: '#7C3AED', // purple-700
    tooltipText2: '#1f2937cc', // Texto secundario más oscuro para contraste
    tooltipArrow: '#ffffff' // Usar el color de texto del tema
  }
} as const;

export type DiagramTheme = keyof typeof DIAGRAM_THEMES;
