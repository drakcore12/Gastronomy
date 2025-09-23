import React, { useEffect, useMemo, useState, useId, useRef } from 'react';
import type { CSSProperties } from 'react';
import { HOTSPOTS_FISH, type Hotspot } from '../hotspots/hotspots';
import { DIAGRAM_THEMES } from './theme-colors';

export default function FishDiagram() {
  /** =========================
   *  🎛️ CONFIGURACIÓN EDITABLE
   *  ========================= */

  // Tema de colores
  const theme = DIAGRAM_THEMES.fish;

  // ViewBox y contenedor
  const VIEWBOX_WIDTH = 320;
  const VIEWBOX_HEIGHT = 180;
  const CONTAINER_CLASS =
    `relative mx-auto w-full max-w-md rounded-3xl border ${theme.containerBorder} ${theme.containerBg} p-5 ${theme.textColor} shadow-inner`;
  const SVG_ARIA_LABEL = 'Diagrama de cortes de pescado';

  // Fondo degradado del SVG
  const BG_GRADIENT_ID = useId(); // evita colisiones si hay varios SVG en la página
  const BG_FROM_COLOR = theme.bgGradient.from;
  const BG_TO_COLOR = theme.bgGradient.to;
  const BG_RECT_RX = 14;
  const BG_RECT_OPACITY = 0.12;

  // Silueta / paths
  const PATH_GROUP_OUTER_TX = 17;
  const PATH_GROUP_OUTER_TY = 35;
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

  // Anillo externo animado — OFF
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

  // Flecha del tooltip
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
    () => HOTSPOTS_FISH.find((h) => h.id === active) ?? null,
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
      setSvgOffset({ left: s.left - c.left, top: s.top - c.top });
    };

    update();
    const ro = new ResizeObserver(update);
    if (svgRef.current) ro.observe(svgRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
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
          <filter id={DOT_GLOW_SOFT_ID} x="-50%" y="-50%" width="200%" height="200%">
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
        <g transform={`translate(${PATH_GROUP_OUTER_TX},${PATH_GROUP_OUTER_TY}) scale(${PATH_GROUP_OUTER_SCALE})`}>
          <g
            transform={`translate(${PATH_GROUP_INNER_TX},${PATH_GROUP_INNER_TY}) scale(${PATH_GROUP_INNER_SCALE_X},${PATH_GROUP_INNER_SCALE_Y})`}
            fill={PATH_FILL}
            stroke={PATH_STROKE_COLOR}
            strokeWidth={PATH_STROKE_WIDTH}
          >
            <path
            d="M3148 2924 c-113 -34 -234 -125 -269 -199 -24 -52 -25 -117 -1 -137
            73 -66 454 -159 647 -159 116 0 130 3 360 80 50 17 103 33 119 36 l29 6 -28
            29 c-41 42 -126 83 -259 125 -158 49 -211 73 -325 150 -124 83 -181 98 -273
            69z"
            />
            <path
            d="M6680 2654 c-149 -40 -280 -131 -529 -368 -163 -156 -238 -215 -337
            -265 -71 -36 -122 -39 -269 -17 -49 8 -93 12 -97 10 -3 -2 0 -28 8 -57 21 -77
            29 -314 14 -422 -21 -150 -24 -139 42 -136 198 9 381 -72 608 -268 257 -223
            378 -282 545 -268 75 7 145 25 145 39 0 4 -22 41 -49 81 -48 71 -383 631 -415
            694 -9 18 -16 40 -16 49 0 21 61 149 110 229 91 149 380 686 380 705 0 14 -75
            11 -140 -6z"
            />
            <path
            d="M2535 2573 c-146 -4 -397 -31 -456 -49 -16 -4 -28 -29 -68 -134 -44
            -118 -101 -376 -101 -458 l0 -35 65 7 c126 13 793 26 1035 21 868 -19 1392
            -59 2170 -165 112 -16 209 -26 213 -23 19 11 -22 267 -46 289 -7 7 -77 24
            -157 38 -202 38 -661 152 -985 246 -38 11 -133 37 -211 57 l-141 37 -69 -21
            c-144 -44 -257 -54 -394 -33 -307 46 -551 125 -588 189 -19 33 -47 42 -131 39
            -31 -1 -92 -3 -136 -5z"
            />
            <path
            d="M1895 2493 c-82 -18 -336 -91 -460 -132 -206 -68 -225 -77 -225 -103
            0 -33 52 -118 157 -256 109 -143 137 -198 153 -294 10 -69 1 -175 -21 -248
            -47 -147 -205 -329 -362 -415 -10 -5 -18 -14 -18 -20 1 -5 65 -32 144 -58 138
            -47 495 -157 509 -157 4 0 -15 42 -42 93 -61 113 -65 154 -21 198 26 26 36 29
            91 29 l61 0 -6 33 c-45 268 -52 683 -16 887 34 192 52 259 119 438 4 12 -21
            14 -63 5z"
            />
            <path
            d="M905 2141 c-323 -160 -514 -280 -563 -351 -20 -29 -23 -43 -19 -88 3
            -29 16 -69 28 -88 18 -30 20 -40 11 -55 -19 -30 -14 -48 23 -99 65 -88 179
            -177 345 -267 94 -52 255 -123 278 -123 28 0 164 93 240 164 129 123 192 251
            192 395 0 128 -22 173 -199 403 -35 46 -77 111 -93 146 -15 34 -32 62 -36 62
            -4 0 -97 -45 -207 -99z"
            />
            <path
            d="M2095 1828 c-104 -5 -192 -12 -195 -15 -13 -13 0 -342 20 -493 28
            -217 25 -209 75 -231 74 -33 166 -108 300 -245 72 -73 143 -138 159 -144 36
            -13 279 -30 447 -30 134 0 141 2 152 51 16 64 94 118 174 119 22 0 74 -12 115
            -26 40 -14 94 -32 120 -40 25 -8 59 -21 75 -29 15 -8 39 -15 53 -15 31 0 260
            46 268 54 3 3 -9 48 -26 98 -40 120 -58 197 -78 338 -19 130 -22 393 -5 505 8
            53 7 73 -2 81 -31 29 -1197 44 -1652 22z"
            />
            <path
            d="M3852 1798 c-32 -40 -43 -396 -17 -558 27 -168 90 -408 114 -432 8
            -9 314 91 432 141 73 30 77 34 84 69 9 49 41 106 74 129 14 11 61 32 105 47
            43 15 122 48 175 73 243 115 300 133 436 141 l109 7 8 35 c16 69 25 175 17
            186 -13 16 -123 32 -649 95 -142 17 -827 79 -870 79 -4 0 -12 -6 -18 -12z"
            />
            <path
            d="M5153 1310 c-78 -22 -116 -38 -293 -123 -63 -30 -146 -66 -183 -79
            -37 -12 -80 -33 -95 -45 -25 -20 -27 -27 -27 -95 0 -68 4 -82 44 -163 50 -101
            83 -140 106 -127 9 4 133 107 277 228 144 120 289 242 322 270 34 28 68 62 76
            77 14 25 13 28 -7 49 -32 31 -124 34 -220 8z"
            />
            <path
            d="M1767 1036 c-10 -26 97 -208 167 -284 52 -57 148 -125 219 -156 94
            -42 269 -68 321 -47 17 7 12 13 -40 48 -32 22 -124 107 -204 187 -80 81 -173
            165 -207 187 -96 63 -243 100 -256 65z"
            />
            <path
            d="M3175 738 c-51 -28 -57 -65 -21 -137 35 -69 105 -126 242 -200 65
            -36 136 -75 156 -88 51 -32 78 -31 78 3 0 52 -33 220 -51 264 -25 59 -59 80
            -201 130 -121 41 -168 48 -203 28z"
            />
          </g>
        </g>

        {/* Hotspots */}
        {HOTSPOTS_FISH.map((h) => {
          const isActive = active === h.id;
          const isHover = hover === h.id;
          const rDot = isActive ? DOT_RADIUS_ACTIVE : isHover ? DOT_RADIUS_HOVER : DOT_RADIUS;
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
                fill={isActive ? `url(#${DOT_ACTIVE_GRADIENT_ID})` : DOT_FILL_INACTIVE}
                filter={`url(#${DOT_GLOW_SOFT_ID})`}
                style={{
                  fontSize: 'clamp(8px, 1.5vw, 10px)',
                  fontWeight: 'bold',
                  textShadow: isActive ? '0 0 1px rgba(0,0,0,0.6)' : '0 0 0.5px rgba(255,255,255,0.9)'
                }}
              >
                {HOTSPOTS_FISH.findIndex(spot => spot.id === h.id) + 1}
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

        // Decidir lado (derecha si cabe)
        const placeRight = (anchorSvgX + ARROW_W + BOX_W + MARGIN) <= svgSize.width;

        // Posición base de la caja respecto al ancla
        let boxLeft = placeRight ? anchorLeft + ARROW_W : anchorLeft - ARROW_W - BOX_W;
        let boxTop  = anchorTop - BOX_H / 2;

        // Clamp para mantener la caja dentro del área del SVG dibujado
        boxLeft = Math.max(clampLeft, Math.min(boxLeft, clampRight));
        boxTop  = Math.max(clampTop,  Math.min(boxTop,  clampBottom));

        // Flecha: PUNTA exactamente en el hotspot
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