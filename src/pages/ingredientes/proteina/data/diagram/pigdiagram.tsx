import React, { useEffect, useMemo, useState, useId, useRef } from 'react';
import type { CSSProperties } from 'react';
import { HOTSPOTS_PIG, type Hotspot } from '../hotspots/hotspots';
import { DIAGRAM_THEMES } from './theme-colors';

export default function PigDiagram() {
  /** =========================
   *  🎛️ CONFIGURACIÓN EDITABLE
   *  ========================= */

  // ViewBox y contenedor
  const VIEWBOX_WIDTH = 320;
  const VIEWBOX_HEIGHT = 180;

  // Tema de colores
  const theme = DIAGRAM_THEMES.pig;

  const CONTAINER_CLASS =
    `relative mx-auto w-full max-w-md rounded-3xl border ${theme.containerBorder} ${theme.containerBg} p-5 ${theme.textColor} shadow-inner`;
  const SVG_ARIA_LABEL = 'Diagrama de cortes de cerdo';

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
  const TOOLTIP_WIDTH = 192;
  const TOOLTIP_HEIGHT = 52;
  const TOOLTIP_PADDING_X = 12;
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
    () => HOTSPOTS_PIG.find((h) => h.id === active) ?? null,
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
            d="M3725 3469 c-49 -5 -117 -13 -150 -18 -148 -25 -338 -32 -654 -26
            l-324 7 7 -103 c4 -57 11 -120 15 -139 l7 -35 84 -3 c47 -2 168 1 270 7 207
            12 470 3 710 -25 155 -17 347 -64 467 -114 39 -17 79 -30 88 -30 10 0 27 23
            45 64 31 68 105 194 153 261 25 36 27 41 12 52 -46 33 -297 88 -470 103 -132
            11 -132 11 -260 -1z"
            />
            <path
            d="M2300 3411 c-264 -48 -476 -135 -676 -277 -87 -62 -203 -172 -210
            -199 -7 -29 25 -205 38 -205 5 0 28 13 51 29 152 106 311 192 457 248 87 33
            307 90 400 103 41 6 106 15 144 21 l69 11 -7 128 c-3 71 -9 135 -12 144 -8 22
            -126 20 -254 -3z"
            />
            <path
            d="M4462 3273 c-89 -123 -125 -196 -198 -408 -78 -226 -90 -316 -75
            -550 18 -278 70 -465 199 -722 40 -78 183 -213 226 -213 8 0 31 14 50 30 55
            49 143 97 230 127 75 26 92 28 238 27 l156 -1 22 56 c123 313 157 474 167 789
            l6 194 56 -7 c31 -4 64 -11 74 -17 10 -5 23 -7 30 -5 13 4 -51 47 -71 47 -7 0
            -22 5 -32 10 -18 10 -18 12 10 57 59 92 29 183 -58 183 -23 0 -45 -6 -52 -15
            -27 -33 -48 -28 -102 25 -28 28 -81 70 -117 94 -135 89 -659 366 -693 366 -9
            0 -38 -30 -66 -67z m1056 -465 c18 -18 15 -42 -9 -72 -28 -36 -56 -34 -64 4
            -12 55 39 102 73 68z"
            />
            <path
            d="M2810 3121 c-86 -4 -162 -11 -169 -16 -11 -6 -12 -29 -8 -104 18
            -299 38 -635 47 -771 5 -85 10 -192 10 -238 0 -75 2 -83 18 -78 37 11 304 48
            447 61 175 17 530 20 677 5 57 -6 158 -20 226 -32 68 -11 126 -17 129 -14 4 4
            -1 35 -10 69 -47 165 -61 407 -33 585 8 57 31 154 51 216 44 140 44 150 3 169
            -103 48 -386 114 -583 137 -123 14 -595 21 -805 11z"
            />
            <path
            d="M2479 3096 c-2 -2 -42 -10 -89 -16 -95 -13 -214 -41 -305 -71 -76
            -26 -319 -135 -365 -164 -19 -12 -40 -24 -45 -26 -6 -2 -57 -33 -114 -69
            l-103 -64 6 -41 c14 -91 100 -329 175 -487 28 -59 63 -152 77 -205 31 -119 92
            -269 141 -343 49 -76 218 -239 282 -274 54 -29 54 -29 105 -13 87 28 197 39
            267 28 35 -6 67 -7 71 -3 4 4 12 55 18 112 5 58 16 166 25 240 19 175 19 532
            0 815 -17 253 -43 542 -51 568 -4 13 -16 17 -48 17 -23 0 -45 -2 -47 -4z"
            />
            <path
            d="M1319 2867 c-24 -19 -79 -57 -121 -86 -43 -29 -78 -57 -79 -64 -1 -7
            0 -46 1 -88 2 -85 -5 -103 -72 -205 -56 -84 -115 -123 -209 -136 -124 -17
            -116 -12 -123 -70 -9 -69 -41 -122 -116 -191 -33 -31 -60 -61 -60 -66 0 -6 15
            -31 33 -55 44 -62 82 -125 95 -163 29 -81 35 -93 46 -93 14 0 226 108 246 125
            24 21 249 135 320 162 36 14 126 45 200 69 74 25 139 49 143 53 5 5 -12 51
            -36 102 -94 197 -174 460 -196 643 -5 43 -13 82 -18 87 -6 6 -27 -4 -54 -24z"
            />
            <path
            d="M618 2774 c6 -10 29 -37 51 -59 23 -21 41 -47 41 -57 0 -17 -14 -18
            -190 -18 -110 0 -190 -4 -190 -9 0 -5 65 -68 145 -140 98 -88 164 -139 203
            -157 55 -25 60 -26 131 -15 41 6 88 20 105 30 30 19 94 80 135 129 31 38 50
            152 35 209 -8 28 -44 39 -175 53 -52 6 -123 17 -159 25 -36 9 -82 18 -104 22
            -35 5 -37 4 -28 -13z"
            />
            <path
            d="M1460 1951 c-154 -53 -235 -90 -370 -169 -114 -67 -212 -113 -385
            -182 -71 -29 -134 -56 -139 -61 -5 -5 3 -13 20 -19 29 -12 253 -43 434 -60 52
            -6 165 -23 250 -39 307 -59 484 -81 642 -81 120 0 121 2 35 89 -147 149 -224
            298 -281 544 -5 23 -11 27 -39 26 -17 0 -93 -22 -167 -48z"
            />
            <path
            d="M3170 1934 c-171 -16 -435 -53 -467 -65 -22 -8 -23 -14 -23 -107 0
            -53 -9 -160 -20 -237 -21 -149 -25 -221 -12 -229 10 -6 325 -71 442 -91 350
            -60 634 -61 973 -4 185 31 491 113 485 131 -2 4 -30 29 -63 56 -33 26 -75 70
            -93 97 -35 52 -109 201 -159 320 -34 82 -40 85 -210 109 -266 38 -581 45 -853
            20z"
            />
            <path
            d="M440 1913 c-14 -10 -43 -18 -65 -18 -48 0 -65 -25 -65 -100 0 -92 37
            -165 84 -165 13 0 28 -12 37 -29 25 -43 63 -47 140 -15 85 36 90 43 74 102
            -17 67 -51 129 -103 190 -48 56 -64 62 -102 35z"
            />
            <path
            d="M4944 1505 c-94 -20 -274 -118 -274 -149 0 -7 30 -19 73 -29 118 -28
            168 -63 234 -165 31 -48 65 -108 76 -134 l20 -47 86 5 c47 3 91 7 97 9 7 2 20
            28 30 57 23 64 24 193 5 346 -12 95 -15 104 -38 113 -35 13 -238 10 -309 -6z"
            />
            <path
            d="M2380 1309 c-80 -9 -136 -25 -145 -40 -4 -5 2 -21 13 -37 33 -47 41
            -93 44 -257 l3 -160 55 -6 c30 -3 72 -12 92 -19 21 -8 40 -11 43 -8 15 14 55
            246 55 316 0 43 6 101 14 130 14 55 10 64 -29 75 -47 12 -74 13 -145 6z"
            />
            <path
            d="M4674 1296 c-3 -9 -4 -22 -1 -30 6 -16 -36 -206 -63 -283 -10 -29
            -15 -55 -12 -57 4 -2 23 -7 42 -11 19 -4 54 -18 77 -31 l42 -24 15 22 c9 12
            27 57 42 100 14 44 35 85 48 95 29 24 66 77 66 97 0 24 -39 56 -115 91 -90 43
            -133 52 -141 31z"
            />
            <path
            d="M2147 1162 c-5 -109 -22 -185 -61 -273 -6 -14 1 -18 41 -24 26 -4 63
            -13 82 -21 19 -8 36 -12 39 -9 9 9 21 98 21 160 1 108 -39 226 -88 263 l-28
            20 -6 -116z"
            />
            <path
            d="M5103 940 c-23 -9 -23 -9 -16 -188 l6 -178 -26 -46 c-38 -64 -36 -85
            11 -97 20 -6 57 -11 81 -11 36 0 48 5 75 34 17 19 40 35 51 37 33 7 47 78 30
            153 -8 34 -22 111 -31 171 -9 61 -21 116 -26 123 -12 14 -121 16 -155 2z"
            />
            <path
            d="M4515 794 c-31 -55 -69 -116 -83 -137 l-25 -38 22 -22 c51 -51 221
            -6 221 59 0 13 8 29 19 36 19 14 71 108 71 131 0 17 -78 55 -129 63 l-39 6
            -57 -98z"
            />
            <path
            d="M2059 830 c-19 -11 -149 -201 -149 -218 0 -16 44 -26 115 -26 70 -1
            108 20 124 66 6 16 21 38 34 49 14 10 30 32 37 49 16 40 3 55 -63 75 -58 17
            -76 18 -98 5z"
            />
            <path
            d="M2294 769 c-3 -6 -10 -42 -14 -79 -6 -57 -14 -76 -47 -121 -22 -30
            -47 -60 -56 -68 -20 -16 -23 -66 -5 -77 6 -4 35 -13 64 -20 44 -10 57 -9 84 4
            17 8 34 22 37 29 3 8 23 23 44 33 34 18 41 28 59 86 25 84 27 165 3 186 -39
            33 -153 52 -169 27z"
            />
          </g>
        </g>

        {/* Hotspots */}
        {HOTSPOTS_PIG.map((h) => {
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
                {HOTSPOTS_PIG.findIndex(spot => spot.id === h.id) + 1}
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
        const ARROW_W = 12;
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
              <path d={TOOLTIP_ARROW_PATH} fill={TOOLTIP_ARROW_FILL} opacity={TOOLTIP_ARROW_OPACITY} />
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
