import React, { useEffect, useMemo, useState, useId, useRef } from 'react';
import type { CSSProperties } from 'react';
import { HOTSPOTS_RES, type Hotspot } from '../hotspots/hotspots';
import { DIAGRAM_THEMES } from './theme-colors';

export default function CowDiagram() {
  /** =========================
   *  🎛️ CONFIGURACIÓN EDITABLE
   *  ========================= */

  // Tema de colores
  const theme = DIAGRAM_THEMES.cow;

  // ViewBox y contenedor
  const VIEWBOX_WIDTH = 320;
  const VIEWBOX_HEIGHT = 180;
  const CONTAINER_CLASS =
    `relative mx-auto w-full max-w-md rounded-3xl border ${theme.containerBorder} ${theme.containerBg} p-5 ${theme.textColor} shadow-inner`;
  const SVG_ARIA_LABEL = 'Diagrama de cortes de res';

  // Fondo degradado del SVG
  const BG_GRADIENT_ID = useId(); // evita colisiones si hay varios SVG en la página
  const BG_FROM_COLOR = theme.bgGradient.from;
  const BG_TO_COLOR = theme.bgGradient.to;
  const BG_RECT_RX = 14;
  const BG_RECT_OPACITY = 0.12;

  // Silueta / paths
  const PATH_GROUP_OUTER_TX = 30;
  const PATH_GROUP_OUTER_TY = 50;
  const PATH_GROUP_OUTER_SCALE = 0.4;
  const PATH_GROUP_INNER_TX = 0;
  const PATH_GROUP_INNER_TY = 304;
  const PATH_GROUP_INNER_SCALE_X = 0.1;
  const PATH_GROUP_INNER_SCALE_Y = -0.1;
  const PATH_STROKE_COLOR = theme.pathStroke;
  const PATH_STROKE_WIDTH = 16;
  const PATH_FILL = 'none';

  // Punto (hotspot)
  const DOT_RADIUS = 2;
  const DOT_RADIUS_HOVER = 3;
  const DOT_RADIUS_ACTIVE = 4;
  const DOT_FILL_INACTIVE = theme.dotInactive;
  const DOT_GLOW_SOFT_ID = useId();
  const DOT_GLOW_SOFT_STDDEV = 1.5;

  // Relleno activo del punto (radial)
  const DOT_ACTIVE_GRADIENT_ID = useId();
  const DOT_ACTIVE_CENTER_COLOR = theme.dotActive;
  const DOT_ACTIVE_CENTER_OPACITY = 1.0;
  const DOT_ACTIVE_EDGE_COLOR = theme.dotActive;
  const DOT_ACTIVE_EDGE_OPACITY = 0.85;

  // Anillos (sin bordes por defecto)
  const RING_RADIUS = 7;
  const RING_RADIUS_ACTIVE = 5;
  const RING_STROKE_BASE_COLOR = 'none';
  const RING_STROKE_BASE_WIDTH = 0;
  const RING_OPACITY_BASE = 0.0;
  const RING_OPACITY_ACTIVE = 0.0;

  // Anillo externo animado — OFF (deja el CSS por si lo activas luego)
  const SHOW_OUTER_SPIN_RING = false;
  const OUTER_SPIN_DASHARRAY = '6 10';
  const OUTER_SPIN_STROKE_WIDTH = 1.5;
  const OUTER_SPIN_OPACITY = 0.85;
  const OUTER_SPIN_DURATION_SEC = 2.4;
  const OUTER_SPIN_DASHOFFSET_TO = -64;

  // Área de toque/click (invisible)
  const HIT_RADIUS = 15;
  const HIT_FILL = '#ffffff';
  const HIT_OPACITY = 0.0;
  const HIT_POINTER_EVENTS: CSSProperties['pointerEvents'] = 'all';

  // Tooltip
  const TOOLTIP_WIDTH = 200;
  const TOOLTIP_HEIGHT = 60;
  const TOOLTIP_PADDING_X = 15;
  const TOOLTIP_PADDING_Y = 10;
  const TOOLTIP_RX = 10;

  const TOOLTIP_BG_COLOR = theme.tooltipBg;
  const TOOLTIP_BG_OPACITY = theme.tooltipBgOpacity;
  const TOOLTIP_BORDER_COLOR = 'none';
  const TOOLTIP_BORDER_WIDTH = 0;
  const TOOLTIP_BORDER_OPACITY = 0;

  // Tipografía
  const TOOLTIP_TEXT1_X = TOOLTIP_PADDING_X;
  const TOOLTIP_TEXT1_Y = 18;
  const TOOLTIP_TEXT1_FILL = theme.tooltipText1;
  const TOOLTIP_TEXT1_FONTSIZE = 12;
  const TOOLTIP_TEXT1_FONTWEIGHT = 700;

  const TOOLTIP_TEXT2_X = TOOLTIP_PADDING_X;
  const TOOLTIP_TEXT2_Y = 34;
  const TOOLTIP_TEXT2_FILL = theme.tooltipText2;
  const TOOLTIP_TEXT2_FONTSIZE = 11;

  // Flecha del tooltip (triángulo apuntando al punto)
  const TOOLTIP_ARROW_PATH = 'M 0 6 L 12 12 L 12 0 Z';
  const TOOLTIP_ARROW_FILL = theme.tooltipArrow;
  const TOOLTIP_ARROW_OPACITY = TOOLTIP_BG_OPACITY;

  // Accesibilidad
  const KEY_CLOSE = 'Escape';

  // Clases útiles
  const DOT_CLASS_TRANSITION = 'transition';
  const RING_CLASS_BASE = 'pointer-events-none';
  const TOOLTIP_TEXT1_CLASS = '';
  const TOOLTIP_TEXT2_CLASS = '';

  /** =========================
   *  🔢 ESTADO + MEMOS
   *  ========================= */
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const sel = useMemo<Hotspot | null>(
    () => HOTSPOTS_RES.find((h) => h.id === active) ?? null,
    [active]
  );

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Tamaño y offset (px) del SVG relativo al contenedor
  const [svgSize, setSvgSize] = useState({ width: VIEWBOX_WIDTH, height: VIEWBOX_HEIGHT });
  const [svgOffset, setSvgOffset] = useState({ left: 0, top: 0 });

  useEffect(() => {
    const update = () => {
      if (!svgRef.current || !containerRef.current) return;
      const s = svgRef.current.getBoundingClientRect();
      const c = containerRef.current.getBoundingClientRect();
      setSvgSize({ width: s.width, height: s.height });
      // offset del SVG respecto al contenedor (considera paddings, bordes, etc.)
      setSvgOffset({ left: s.left - c.left, top: s.top - c.top });
    };

    update();
    const ro = new ResizeObserver(update);
    if (svgRef.current) ro.observe(svgRef.current);
    if (containerRef.current) ro.observe(containerRef.current);

    // si tu layout se mueve por scroll dentro del contenedor, escuchar scroll ayuda
    window.addEventListener('scroll', update, true);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update, true);
    };
  }, []);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KEY_CLOSE) setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Padding del tooltip respecto al punto activo
  const DOT_RADIUS_ACTIVE_PAD = DOT_RADIUS_ACTIVE;
  const TOOLPAD_X = DOT_RADIUS_ACTIVE_PAD + TOOLTIP_PADDING_X;
  const TOOLPAD_Y = DOT_RADIUS_ACTIVE_PAD + TOOLTIP_PADDING_Y;

  // CSS embebido (para el anillo que gira si lo activas)
  const ringSpinCSS = `
    .ring-spin {
      stroke-dasharray: ${OUTER_SPIN_DASHARRAY};
      animation: dash ${OUTER_SPIN_DURATION_SEC}s linear infinite;
    }
    @keyframes dash { to { stroke-dashoffset: ${OUTER_SPIN_DASHOFFSET_TO}; } }
  `;

  /** =========================
   *  🧩 RENDER
   *  ========================= */
  return (
    <div className={CONTAINER_CLASS} ref={containerRef}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label={SVG_ARIA_LABEL}
      >
        <defs>
          {/* Fondo degradado */}
          <linearGradient id={BG_GRADIENT_ID} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={BG_FROM_COLOR} />
            <stop offset="100%" stopColor={BG_TO_COLOR} />
          </linearGradient>

          {/* Punto activo (radial) */}
          <radialGradient id={DOT_ACTIVE_GRADIENT_ID} cx="50%" cy="50%" r="60%">
            <stop
              offset="0%"
              stopColor={DOT_ACTIVE_CENTER_COLOR}
              stopOpacity={DOT_ACTIVE_CENTER_OPACITY}
            />
            <stop
              offset="100%"
              stopColor={DOT_ACTIVE_EDGE_COLOR}
              stopOpacity={DOT_ACTIVE_EDGE_OPACITY}
            />
          </radialGradient>

          {/* Gradiente del anillo activo (opcional) */}
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>

          {/* Glow suave del punto */}
          <filter
            id={DOT_GLOW_SOFT_ID}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation={DOT_GLOW_SOFT_STDDEV} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sombra tooltip */}
          <filter id="shadowLg" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
          </filter>

          <style>{ringSpinCSS}</style>
        </defs>

        {/* Fondo */}
        <rect
          x={0}
          y={0}
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          rx={BG_RECT_RX}
          fill={`url(#${BG_GRADIENT_ID})`}
          opacity={BG_RECT_OPACITY}
        />

        {/* Silueta (inserta aquí tus <path> reales) */}
        <g
          transform={`translate(${PATH_GROUP_OUTER_TX},${PATH_GROUP_OUTER_TY}) scale(${PATH_GROUP_OUTER_SCALE})`}
        >
          <g
            transform={`translate(${PATH_GROUP_INNER_TX},${PATH_GROUP_INNER_TY}) scale(${PATH_GROUP_INNER_SCALE_X},${PATH_GROUP_INNER_SCALE_Y})`}
            fill={PATH_FILL}
            stroke={PATH_STROKE_COLOR}
            strokeWidth={PATH_STROKE_WIDTH}
          >
            <path
              d="M837 3955 c-7 -44 9 -148 29 -187 23 -44 11 -51 -67 -44 -107 11
                    -125 -10 -98 -109 11 -40 11 -40 -33 -80 -24 -22 -61 -62 -82 -88 -21 -26 -62
                    -66 -92 -88 -29 -23 -70 -66 -91 -97 -45 -69 -92 -113 -158 -147 -122 -65
                    -140 -121 -68 -213 l18 -22 115 35 c63 20 158 49 210 64 52 16 119 36 149 45
                    29 9 67 16 85 16 17 0 48 5 69 11 33 9 38 14 33 32 -3 12 -8 63 -12 112 -5 81
                    -3 94 18 135 30 57 96 92 185 98 75 5 98 0 145 -32 l35 -24 7 76 c3 41 6 102
                    6 135 0 58 -1 61 -45 101 -45 42 -45 43 -45 111 0 61 -3 72 -27 97 -36 38 -62
                    35 -108 -12 -21 -22 -45 -40 -51 -40 -18 0 -76 72 -89 111 -15 45 -31 47 -38
                    4z"
            />
            <path
              d="M1296 3483 c-16 -288 -28 -429 -53 -588 l-26 -171 33 -62 c28 -55 88
                    -122 109 -122 13 0 151 333 151 364 0 9 4 24 9 34 33 59 201 489 201 512 0 4
                    -48 21 -107 39 -108 32 -142 44 -241 88 -29 13 -56 23 -61 23 -5 0 -11 -53
                    -15 -117z"
            />
            <path
              d="M5105 3540 c-49 -5 -143 -11 -208 -15 l-118 -7 60 -63 c34 -35 61
                    -69 61 -77 0 -7 16 -38 36 -68 20 -30 55 -93 76 -140 22 -47 46 -98 54 -115
                    24 -53 67 -179 75 -220 4 -22 23 -103 42 -180 66 -258 71 -292 72 -440 l0
                    -140 -44 -93 c-24 -51 -42 -95 -39 -97 3 -3 45 -14 94 -25 83 -19 441 -56 450
                    -47 2 2 -5 33 -15 68 -47 152 -54 213 -42 374 6 83 13 260 16 395 3 135 12
                    304 20 375 21 186 25 169 -47 184 -76 16 -189 72 -232 117 -18 19 -55 76 -82
                    129 l-49 95 -45 -1 c-25 -1 -85 -5 -135 -9z"
            />
            <path d="M 5370 3538 c 1 -17 50 -110 75 -139 c 30 -36 98 -87 139 -104 c 19 -8 65 -17 101 -19 c 36 -2 69 -6 72 -10 c 14 -14 43 -117 52 -186 c 6 -41 12 -286 14 -545 c 5 -505 5 -499 -49 -625 c -15 -37 -28 -86 -29 -112 c 0 -26 -4 -51 -8 -54 c -12 -12 -270 16 -406 43 c -216 44 -200 46 -264 -35 c -30 -38 -88 -98 -120 -132 c -49 -42 -54 -59 2 -84 c 6 -16 11 -34 11 -41 c 0 -7 13 -53 29 -102 c 34 -105 56 -283 48 -391 l -6 -75 l 107 7 c 59 4 110 9 115 12 c 4 2 7 16 7 31 c 0 39 31 114 100 246 c 35 66 60 127 60 145 c 0 46 15 45 51 -1 c 19 -24 39 -47 45 -53 c 7 -5 26 -30 44 -55 c 28 -39 31 -50 25 -88 c -5 -31 -1 -53 14 -85 c 10 -23 40 -87 65 -142 l 46 -100 l 68 2 c 37 1 80 6 95 12 c 27 10 27 12 22 73 c -24 296 -26 338 -15 420 c 10 74 9 90 -4 116 c -20 40 -20 81 0 111 c 27 38 30 138 6 217 c -20 68 -36 176 -36 244 c 1 72 24 520 34 645 c 22 276 11 470 -33 589 c -31 86 -141 178 -263 221 c -78 28 -214 36 -214 13 z" />
            <path
              d="M3995 3512 c-16 -2 -100 -19 -185 -37 -112 -24 -203 -37 -325 -45
                    -93 -6 -177 -13 -187 -16 -15 -4 -14 -11 9 -67 93 -232 134 -416 178 -800 8
                    -64 16 -121 19 -126 3 -5 52 -12 108 -16 113 -8 295 -36 401 -61 37 -9 70 -15
                    72 -12 7 6 22 280 27 458 l3 135 -140 6 c-90 5 -158 13 -190 24 -108 37 -148
                    80 -125 135 24 59 92 86 358 141 60 12 57 0 41 165 -7 65 -17 114 -23 116 -6
                    2 -24 2 -41 0z"
            />
            <path
              d="M4121 3483 c2 -86 25 -228 36 -226 20 4 396 60 573 85 41 6 79 14 83
                    18 13 11 -56 83 -118 125 l-53 35 -261 0 -261 0 1 -37z"
            />
            <path
              d="M1746 3318 c-21 -62 -41 -117 -46 -123 -4 -5 -13 -28 -20 -50 -7 -22
                    -23 -62 -35 -90 -34 -75 -111 -271 -135 -345 -19 -56 -20 -65 -7 -75 15 -11
                    175 -52 372 -95 55 -12 114 -26 130 -31 83 -24 363 -74 371 -66 3 2 0 55 -6
                    118 -17 191 -18 214 -19 537 l-1 314 -72 -6 c-197 -17 -236 -17 -333 -1 -55 9
                    -114 19 -131 22 l-31 5 -37 -114z"
            />
            <path
              d="M2415 3365 c-16 -106 13 -791 38 -891 l12 -49 60 -9 c36 -5 176 -4
                    350 3 160 6 345 8 411 5 67 -4 128 -5 136 -2 11 5 12 21 7 84 -16 170 -58 403
                    -99 547 -36 126 -63 212 -70 222 -3 6 -17 38 -30 73 l-25 62 -392 0 -392 0 -6
                    -45z"
            />
            <path
              d="M982 3343 c-66 -23 -78 -59 -62 -185 7 -54 17 -101 24 -106 27 -21
                    144 -65 181 -70 60 -6 69 10 73 137 7 181 -24 242 -120 240 -29 0 -73 -7 -96
                    -16z"
            />
            <path
              d="M4745 3280 c-76 -8 -247 -34 -335 -50 -30 -5 -145 -26 -255 -46 -231
                    -41 -268 -49 -350 -77 -101 -34 -104 -45 -18 -80 85 -35 446 -35 1093 0 52 3
                    99 8 103 12 8 8 -8 49 -68 174 -42 87 -28 82 -170 67z"
            />
            <path
              d="M795 2985 c-22 -7 -76 -23 -120 -35 -236 -63 -420 -123 -418 -135 0
                    -5 14 -14 30 -20 17 -5 46 -25 67 -42 43 -39 66 -41 143 -10 52 19 73 22 193
                    19 74 -1 145 0 157 3 43 10 98 169 73 214 -13 24 -60 26 -125 6z"
            />
            <path
              d="M4895 2959 c-108 -10 -499 -29 -619 -29 l-96 0 0 -79 0 -78 83 -7
                    c45 -3 120 -13 167 -21 82 -15 560 -83 648 -92 31 -4 42 -2 42 9 0 18 -76 263
                    -90 288 -12 22 -12 22 -135 9z"
            />
            <path
              d="M990 2906 c0 -18 -7 -53 -15 -76 -8 -24 -13 -45 -11 -47 2 -2 23 1
                    46 7 23 6 65 10 92 9 58 -3 68 6 68 69 0 42 0 42 -37 42 -21 1 -56 7 -78 15
                    -58 21 -65 19 -65 -19z"
            />
            <path
              d="M4175 2688 c-2 -7 -5 -93 -8 -191 l-4 -179 31 -13 c17 -7 65 -26 106
                    -41 41 -16 125 -58 185 -94 104 -62 152 -86 340 -167 97 -42 243 -93 265 -93
                    18 0 25 12 64 115 39 103 46 164 30 270 -25 166 -48 277 -58 280 -11 3 -131
                    20 -351 51 -60 8 -175 24 -255 35 -307 44 -338 46 -345 27z"
            />
            <path
              d="M1438 2526 l-22 -46 52 -53 c29 -29 52 -58 52 -64 0 -6 12 -35 28
                    -64 15 -30 43 -88 61 -129 19 -41 57 -102 85 -134 53 -61 75 -96 146 -231 48
                    -90 121 -194 174 -244 l35 -34 33 25 c41 31 161 82 243 102 85 21 263 46 329
                    46 32 0 56 4 56 10 0 13 -36 86 -60 120 -27 40 -155 291 -175 343 -12 33 -27
                    52 -44 59 -21 9 -23 12 -8 15 21 5 22 0 -7 64 l-23 54 -74 11 c-90 14 -271 50
                    -319 63 -19 5 -75 19 -125 31 -49 13 -128 33 -174 46 -46 13 -107 28 -135 34
                    -28 5 -63 12 -78 16 -25 6 -29 2 -50 -40z"
            />
            <path
              d="M2925 2350 c-82 -4 -216 -6 -297 -5 -84 1 -148 -2 -148 -7 0 -18 51
                    -137 85 -200 19 -35 81 -154 137 -265 l103 -203 120 0 c77 0 188 -9 312 -27
                    106 -15 195 -24 199 -20 11 10 8 707 -2 717 -13 11 -335 18 -509 10z"
            />
            <path d="M 3514 1979 l 2 -364 l 50 -6 c 27 -3 137 -9 244 -13 l 195 -7 l 80 30 c 44 16 137 52 206 81 l 126 53 l 55 -45 c 75 -61 173 -99 274 -105 l 80 -6 l 40 39 c 50 49 178 192 182 203 c 1 4 -19 14 -45 21 c -26 7 -66 21 -88 30 c -22 10 -65 28 -95 40 c -74 30 -358 169 -393 193 c -118 80 -449 187 -580 187 c -24 0 -66 4 -93 9 c -27 5 -92 13 -145 17 l -96 7 l 1 -364 z z" />
            <path
              d="M2550 1624 c-231 -35 -289 -48 -350 -79 -99 -50 -105 -60 -91 -147 6
                    -40 13 -156 15 -258 4 -198 4 -195 44 -282 26 -56 28 -58 67 -58 71 0 83 8
                    101 64 25 75 75 186 85 186 13 0 65 -108 79 -166 l13 -52 50 -6 c27 -4 54 -3
                    59 2 9 9 17 46 52 242 14 80 46 443 46 523 l0 37 -72 -1 c-40 -1 -84 -3 -98
                    -5z"
            />
            <path
              d="M5100 890 c-36 -4 -68 -6 -72 -3 -12 6 -26 -31 -57 -152 -44 -169
                    -85 -273 -126 -315 -19 -20 -35 -40 -35 -44 0 -5 -25 -34 -55 -64 -30 -31 -55
                    -59 -55 -64 0 -12 196 -15 226 -4 6 2 24 36 39 75 15 39 31 71 35 71 5 0 11 8
                    14 18 3 9 19 26 35 36 21 15 33 35 44 75 26 96 92 274 128 343 21 41 11 43
                    -121 28z"
            />
            <path
              d="M5840 824 c-14 -2 -41 -9 -60 -14 l-35 -9 -1 -133 c0 -193 -16 -273
                    -75 -391 -27 -53 -49 -104 -49 -112 0 -8 14 -17 35 -21 44 -8 186 5 203 18 8
                    7 12 38 12 87 0 81 9 101 45 101 32 0 33 5 18 63 -8 28 -17 133 -21 232 -8
                    198 -4 189 -72 179z"
            />
            <path
              d="M2496 699 c-4 -35 -8 -126 -9 -201 -2 -76 -6 -141 -10 -145 -4 -5
                    -40 -40 -79 -80 -40 -40 -69 -76 -64 -80 12 -12 197 -7 238 6 l37 12 -6 88
                    c-6 86 -5 88 21 108 24 20 26 26 25 104 0 91 -12 225 -19 233 -3 2 -33 8 -67
                    11 l-61 7 -6 -63z"
            />
            <path
              d="M2184 703 c-3 -16 -17 -71 -30 -123 -13 -52 -24 -106 -24 -120 0 -32
                    -27 -112 -68 -201 -21 -45 -41 -73 -66 -90 -20 -13 -36 -27 -36 -31 0 -10 97
                    -28 170 -31 l65 -2 10 80 c9 70 13 80 31 83 27 4 34 40 34 178 0 55 5 127 10
                    160 6 32 13 74 16 92 l5 32 -55 0 c-52 0 -56 -2 -62 -27z"
            />
          </g>
        </g>

        {/* Hotspots */}
        {HOTSPOTS_RES.map((h) => {
          const isActive = active === h.id;
          const isHover = hover === h.id;
          const rDot = isActive
            ? DOT_RADIUS_ACTIVE
            : isHover
            ? DOT_RADIUS_HOVER
            : DOT_RADIUS;
          const rRing = isActive ? RING_RADIUS_ACTIVE : RING_RADIUS;

          return (
            <g
              key={h.id}
              role="button"
              tabIndex={-1}
              aria-label={`${h.en} / ${h.es}`}
              onMouseEnter={() => setHover(h.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setActive(isActive ? null : h.id)}
            >
              {/* Área clickeable invisible */}
              <circle
                cx={h.x}
                cy={h.y}
                r={HIT_RADIUS}
                fill={HIT_FILL}
                opacity={HIT_OPACITY}
                style={{ pointerEvents: HIT_POINTER_EVENTS }}
              />

              {/* Número del hotspot con estilo del punto */}
              <text
                x={h.x}
                y={h.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                className={DOT_CLASS_TRANSITION}
                fill={
                  isActive
                    ? `url(#${DOT_ACTIVE_GRADIENT_ID})`
                    : DOT_FILL_INACTIVE
                }
                filter={`url(#${DOT_GLOW_SOFT_ID})`}
                style={{
                  fontSize: 'clamp(8px, 1.5vw, 10px)',
                  fontWeight: 'bold',
                  textShadow: isActive ? '0 0 1px rgba(0,0,0,0.6)' : '0 0 0.5px rgba(255,255,255,0.9)'
                }}
              >
                {HOTSPOTS_RES.findIndex(spot => spot.id === h.id) + 1}
              </text>

              {/* Anillo base */}
              <circle
                cx={h.x}
                cy={h.y}
                r={rRing}
                className={RING_CLASS_BASE}
                fill="none"
                stroke={RING_STROKE_BASE_COLOR}
                strokeWidth={RING_STROKE_BASE_WIDTH}
                opacity={isActive ? RING_OPACITY_ACTIVE : RING_OPACITY_BASE}
              />

              {/* (Opcional) Anillo externo giratorio */}
              {SHOW_OUTER_SPIN_RING && isActive && (
                <circle
                  cx={h.x}
                  cy={h.y}
                  r={rRing + 6}
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth={OUTER_SPIN_STROKE_WIDTH}
                  className="ring-spin"
                  opacity={OUTER_SPIN_OPACITY}
                />
              )}
            </g>
          );
        })}

      </svg>

      {/* === Overlay HTML: tooltip fuera del SVG y apuntando EXACTO al hotspot === */}
      {sel && (() => {
        // Escalas del SVG renderizado vs viewBox
        const scaleX = svgSize.width / VIEWBOX_WIDTH;
        const scaleY = svgSize.height / VIEWBOX_HEIGHT;

        // Hotspot en px dentro del SVG renderizado
        const anchorSvgX = sel.x * scaleX;
        const anchorSvgY = sel.y * scaleY;

        // Convertimos a coords del CONTENEDOR sumando el offset del SVG
        const anchorLeft = svgOffset.left + anchorSvgX;
        const anchorTop  = svgOffset.top  + anchorSvgY;

        // Geometría/constantes en px
        const ARROW_W = 10;
        const ARROW_H = 12;
        const BOX_W = TOOLTIP_WIDTH;
        const BOX_H = TOOLTIP_HEIGHT;
        const MARGIN = 8;

        // Área útil para clamping = rectángulo del SVG dentro del contenedor
        const clampLeft   = svgOffset.left + MARGIN;
        const clampRight  = svgOffset.left + svgSize.width  - BOX_W - MARGIN;
        const clampTop    = svgOffset.top  + MARGIN;
        const clampBottom = svgOffset.top  + svgSize.height - BOX_H - MARGIN;

        // Decidir lado (derecha si cabe dentro del propio ancho del SVG)
        const placeRight = (anchorSvgX + ARROW_W + BOX_W + MARGIN) <= svgSize.width;

        // Posición base de la caja respecto al ancla (en coords del contenedor)
        let boxLeft = placeRight
          ? anchorLeft + ARROW_W
          : anchorLeft - ARROW_W - BOX_W;

        let boxTop = anchorTop - BOX_H / 2;

        // Clamp para mantener la caja dentro del área del SVG dibujado
        boxLeft = Math.max(clampLeft, Math.min(boxLeft, clampRight));
        boxTop  = Math.max(clampTop,  Math.min(boxTop,  clampBottom));

        // Flecha: PUNTA exactamente en el hotspot (coords del contenedor)
        const arrowLeft = placeRight ? anchorLeft : anchorLeft - ARROW_W;
        const arrowTop  = anchorTop - ARROW_H / 2;

        return (
          <>
            {/* Caja */}
            <div
              className="pointer-events-none absolute z-50"
              style={{
                left: boxLeft,
                top: boxTop,
                width: BOX_W,
                height: BOX_H,
                filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.35))',
                willChange: 'transform',
              }}
            >
              <svg width={BOX_W} height={BOX_H}>
                <rect
                  x={0}
                  y={0}
                  rx={TOOLTIP_RX}
                  width={BOX_W}
                  height={BOX_H}
                  fill={TOOLTIP_BG_COLOR}
                  opacity={TOOLTIP_BG_OPACITY}
                />
                <text
                  x={TOOLTIP_TEXT1_X}
                  y={TOOLTIP_TEXT1_Y}
                  fill={TOOLTIP_TEXT1_FILL}
                  fontSize={TOOLTIP_TEXT1_FONTSIZE}
                  fontWeight={TOOLTIP_TEXT1_FONTWEIGHT}
                  className={TOOLTIP_TEXT1_CLASS}
                >
                  {sel.en} / {sel.es}
                </text>
                <text
                  x={TOOLTIP_TEXT2_X}
                  y={TOOLTIP_TEXT2_Y}
                  fill={TOOLTIP_TEXT2_FILL}
                  fontSize={TOOLTIP_TEXT2_FONTSIZE}
                  className={TOOLTIP_TEXT2_CLASS}
                >
                  Click para fijar • {KEY_CLOSE} para cerrar
                </text>
              </svg>
            </div>

            {/* Flecha */}
            <svg
              className="pointer-events-none absolute z-50"
              width={ARROW_W}
              height={ARROW_H}
              style={{
                left: arrowLeft,
                top: arrowTop,
                transform: placeRight ? 'scale(1,1)' : 'scale(-1,1)',
                transformOrigin: 'center',
              }}
            >
              <path d="M 0 6 L 10 12 L 10 0 Z" fill={TOOLTIP_ARROW_FILL} opacity={TOOLTIP_BG_OPACITY} />
            </svg>
          </>
        );
      })()}

      <p className="mt-3 text-center text-xs text-white/80">
        Esquema ilustrativo. Toca un punto para ver el corte.
      </p>
    </div>
  );
}
