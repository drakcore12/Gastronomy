import React, { useEffect, useMemo, useState, useId, useRef } from 'react';
import type { CSSProperties } from 'react';
import { HOTSPOTS_CHICKEN, type Hotspot } from '../hotspots/hotspots';
import { DIAGRAM_THEMES } from './theme-colors';

export default function ChickenDiagram() {
  /** =========================
   *  🎛️ CONFIGURACIÓN EDITABLE
   *  ========================= */

  // Tema de colores
  const theme = DIAGRAM_THEMES.chicken;

  // ViewBox y contenedor
  const VIEWBOX_WIDTH = 320;
  const VIEWBOX_HEIGHT = 180;
  const CONTAINER_CLASS =
    `relative mx-auto w-full max-w-md rounded-3xl border ${theme.containerBorder} ${theme.containerBg} p-5 ${theme.textColor} shadow-inner`;
  const SVG_ARIA_LABEL = 'Diagrama de cortes de pollo';

  // Fondo degradado del SVG
  const BG_GRADIENT_ID = useId(); // evita colisiones si hay varios SVG en la página
  const BG_FROM_COLOR = theme.bgGradient.from;
  const BG_TO_COLOR = theme.bgGradient.to;
  const BG_RECT_RX = 14;
  const BG_RECT_OPACITY = 0.12;

  // Silueta / paths
  const PATH_GROUP_OUTER_TX = 7;
  const PATH_GROUP_OUTER_TY = 60;
  const PATH_GROUP_OUTER_SCALE = 0.58;
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
  const TOOLTIP_BORDER_COLOR = 'none'; // (no usado, pero lo dejo por si luego agregas borde)
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
    () => HOTSPOTS_CHICKEN.find((h) => h.id === active) ?? null,
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
            d="M1597 3799 c-3 -11 -11 -19 -19 -18 -36 4 -48 -2 -48 -26 0 -27 -18
            -33 -39 -12 -10 10 -11 9 -6 -4 6 -17 -27 -86 -50 -105 -8 -6 -18 -30 -24 -53
            -5 -24 -20 -55 -34 -70 -13 -14 -30 -37 -37 -49 -12 -24 -12 -24 46 -20 52 3
            59 1 62 -17 8 -40 35 -85 51 -85 9 0 33 -5 53 -10 52 -15 55 -44 28 -244 -13
            -91 -20 -172 -16 -182 11 -28 179 -14 281 23 125 46 271 156 262 198 -8 35
            -175 378 -216 442 -45 70 -91 104 -177 129 -76 21 -75 21 -63 47 14 31 -4 77
            -30 77 -10 0 -21 -9 -24 -21z"
            />
            <path
            d="M3764 3091 c-33 -9 -94 -35 -135 -57 -67 -35 -81 -39 -149 -39 -41
            -1 -111 -9 -155 -18 -44 -9 -111 -17 -149 -17 l-69 0 6 -47 c7 -57 47 -163 82
            -215 21 -32 31 -38 60 -38 27 0 35 -4 35 -18 0 -10 -5 -23 -11 -29 -7 -7 5
            -20 40 -42 69 -45 170 -154 209 -228 31 -59 34 -62 57 -51 14 6 27 18 30 27 3
            9 18 24 33 33 16 10 40 38 53 63 l24 46 -25 19 c-22 17 -23 21 -10 34 9 9 38
            20 65 25 35 7 56 18 75 39 14 17 35 33 47 36 31 10 49 34 35 48 -18 18 -14 38
            6 38 27 0 32 9 20 36 -8 17 -8 27 1 38 16 19 6 36 -22 36 -32 0 -50 15 -45 36
            2 15 15 20 53 24 70 7 80 16 60 46 -9 14 -14 32 -13 41 2 11 -12 27 -34 42
            -46 30 -48 43 -5 59 l32 13 -24 19 c-29 25 -93 25 -177 1z"
            />
            <path
            d="M2090 3041 c-25 -26 -59 -58 -77 -71 l-32 -23 73 -78 c40 -43 89
            -102 109 -132 l36 -54 48 46 c91 88 180 110 333 85 102 -17 115 -20 230 -57
            130 -43 253 -76 306 -83 l52 -6 -28 56 c-31 65 -57 143 -65 199 l-6 38 -137
            -2 c-129 -2 -142 0 -227 29 -125 43 -193 52 -291 40 -87 -11 -137 -1 -226 43
            -21 11 -41 19 -45 19 -4 -1 -28 -22 -53 -49z"
            />
            <path
            d="M1840 2889 c-60 -21 -113 -31 -181 -35 l-97 -6 -6 -30 c-11 -55 -6
            -114 15 -194 12 -43 25 -101 31 -129 5 -27 32 -91 59 -142 27 -50 49 -97 49
            -104 0 -26 56 -84 129 -131 42 -27 85 -58 96 -68 11 -10 54 -39 95 -64 l75
            -47 21 26 c60 75 124 256 124 352 0 34 -7 53 -29 81 -37 47 -51 98 -51 187 0
            65 -3 75 -40 132 -53 80 -168 203 -189 202 -9 -1 -54 -14 -101 -30z"
            />
            <path
            d="M2395 2776 c-121 -38 -185 -115 -185 -225 0 -59 21 -108 70 -159 57
            -60 129 -87 265 -100 214 -20 381 22 527 134 56 44 135 130 157 171 10 20 8
            23 -26 32 -21 6 -57 11 -81 11 -44 0 -146 26 -312 80 -207 67 -328 84 -415 56z"
            />
            <path
            d="M3214 2523 c-65 -83 -178 -175 -249 -205 -22 -9 -65 -26 -95 -39 -46
            -19 -78 -24 -195 -27 -156 -5 -254 8 -328 43 -26 12 -49 19 -51 16 -3 -3 -9
            -35 -16 -71 -19 -110 -47 -177 -109 -270 -17 -25 -31 -51 -31 -59 0 -41 128
            -198 189 -230 20 -11 21 -10 14 16 -4 15 -8 73 -8 128 1 92 3 105 30 155 38
            69 127 133 212 150 71 15 184 5 234 -21 86 -43 129 -149 129 -316 l0 -106 39
            7 c54 8 121 39 149 67 13 13 46 47 74 74 28 28 57 64 64 82 8 17 26 38 41 45
            23 11 29 21 31 54 2 28 -2 45 -13 54 -24 20 -18 40 18 55 17 7 38 23 45 34 7
            12 23 21 36 21 31 0 70 32 86 69 10 26 9 36 -12 77 -27 56 -133 173 -194 214
            -23 17 -45 30 -47 30 -3 0 -22 -21 -43 -47z"
            />
            <path
            d="M2555 2084 c-66 -21 -117 -59 -152 -114 -27 -43 -28 -50 -28 -165 0
            -112 2 -124 29 -174 l28 -54 -42 -96 c-22 -53 -54 -111 -70 -130 l-29 -34
            -108 -1 c-110 -2 -165 -15 -127 -31 11 -4 40 -9 66 -11 65 -4 73 -11 40 -40
            l-27 -25 37 6 c21 3 75 6 122 6 63 1 86 5 90 15 7 18 56 17 80 -1 27 -20 77
            -20 70 0 -4 8 -11 15 -18 15 -6 0 -29 12 -50 26 -36 25 -38 28 -32 67 9 55 23
            70 60 64 17 -3 50 -9 74 -12 42 -8 57 -30 28 -41 -8 -3 -17 -11 -20 -19 -5
            -14 22 -14 134 4 36 6 77 8 92 5 14 -3 29 0 33 5 10 18 36 13 54 -11 31 -37
            31 -3 0 43 -27 41 -29 50 -29 144 0 83 4 106 21 134 42 70 35 230 -17 338 -20
            42 -34 56 -71 74 -60 29 -169 35 -238 13z m226 -455 c13 -18 4 -162 -12 -190
            -10 -20 -16 -20 -107 -15 -152 10 -182 15 -182 32 0 20 25 67 44 83 8 7 24 32
            36 56 24 50 29 52 133 50 55 -1 82 -6 88 -16z"
            />
          </g>
        </g>

        {/* Hotspots */}
        {HOTSPOTS_CHICKEN.map((h) => {
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

              {/* Punto visible */}
              <circle
                cx={h.x}
                cy={h.y}
                r={rDot}
                className={DOT_CLASS_TRANSITION}
                fill={
                  isActive
                    ? `url(#${DOT_ACTIVE_GRADIENT_ID})`
                    : DOT_FILL_INACTIVE
                }
                filter={`url(#${DOT_GLOW_SOFT_ID})`}
              />

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
              <path d={TOOLTIP_ARROW_PATH} fill={TOOLTIP_ARROW_FILL} opacity={TOOLTIP_BG_OPACITY} />
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
