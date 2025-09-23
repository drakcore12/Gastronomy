import React, { useMemo, useId } from 'react';
import type { CSSProperties } from 'react';
import { HOTSPOTS_LAMB, type Hotspot } from '../hotspots/hotspots';
import { DIAGRAM_THEMES } from './theme-colors';
import { 
  useSvgDimensions, 
  useHotspotState, 
  useKeyboardEvents,
  createRadialGradient,
  createLinearGradient,
  createGlowFilter,
  createShadowFilter,
  renderHotspotNumber,
  renderHitArea,
  renderBaseRing,
  renderTooltip,
  createRingSpinCSS,
  renderOuterSpinRing
} from './diagram-utils';

export default function LambDiagram() {
  /** =========================
   *  🎛️ CONFIGURACIÓN EDITABLE
   *  ========================= */

  // Tema de colores
  const theme = DIAGRAM_THEMES.lamb;

  // ViewBox y contenedor
  const VIEWBOX_WIDTH = 320;
  const VIEWBOX_HEIGHT = 180;
  const CONTAINER_CLASS =
    `relative mx-auto w-full max-w-md rounded-3xl border ${theme.containerBorder} ${theme.containerBg} p-5 ${theme.textColor} shadow-inner`;
  const SVG_ARIA_LABEL = 'Diagrama de cortes de cordero';

  // Fondo degradado del SVG
  const BG_GRADIENT_ID = useId(); // evita colisiones si hay varios SVG en la página
  const BG_FROM_COLOR = theme.bgGradient.from;
  const BG_TO_COLOR = theme.bgGradient.to;
  const BG_RECT_RX = 14;
  const BG_RECT_OPACITY = 0.12;

  // Silueta / paths
  const PATH_GROUP_OUTER_TX = -3;
  const PATH_GROUP_OUTER_TY = 60;
  const PATH_GROUP_OUTER_SCALE = 0.6;
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
  const TOOLTIP_BORDER_COLOR = 'none'; // reservado por si agregas borde luego
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

  /** =========================
   *  🔢 ESTADO + MEMOS
   *  ========================= */
  const { containerRef, svgRef, svgSize, svgOffset } = useSvgDimensions(VIEWBOX_WIDTH, VIEWBOX_HEIGHT);
  const { active, hover, handleHotspotClick, handleHotspotHover } = useHotspotState();
  const sel = useMemo<Hotspot | null>(
    () => HOTSPOTS_LAMB.find((h) => h.id === active) ?? null,
    [active]
  );

  useKeyboardEvents(() => {}, KEY_CLOSE);

  // CSS embebido (para el anillo que gira si lo activas)
  const ringSpinCSS = createRingSpinCSS(OUTER_SPIN_DASHARRAY, OUTER_SPIN_DURATION_SEC, OUTER_SPIN_DASHOFFSET_TO);

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
          {createLinearGradient(BG_GRADIENT_ID, BG_FROM_COLOR, BG_TO_COLOR)}

          {/* Punto activo (radial) */}
          {createRadialGradient(
            DOT_ACTIVE_GRADIENT_ID,
            DOT_ACTIVE_CENTER_COLOR,
            DOT_ACTIVE_CENTER_OPACITY,
            DOT_ACTIVE_EDGE_COLOR,
            DOT_ACTIVE_EDGE_OPACITY
          )}

          {/* Gradiente del anillo activo (opcional) */}
          {createLinearGradient("ringGrad", "#f59e0b", "#ef4444")}

          {/* Glow suave del punto */}
          {createGlowFilter(DOT_GLOW_SOFT_ID, DOT_GLOW_SOFT_STDDEV)}

          {/* Sombra tooltip */}
          {createShadowFilter("shadowLg")}

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
            d="M1730 3601 c-8 -3 -28 -15 -43 -25 -25 -17 -33 -18 -61 -8 -40 15
            -115 16 -151 2 -14 -5 -42 -28 -63 -50 -20 -22 -80 -68 -132 -103 -140 -92
            -168 -149 -112 -228 33 -47 55 -56 154 -62 42 -3 87 -11 100 -18 12 -7 38 -12
            56 -10 54 3 188 50 255 88 98 56 251 227 267 297 10 44 -8 73 -36 62 -28 -11
            -178 -35 -186 -29 -5 2 -8 19 -8 37 0 37 -17 57 -40 47z"
            />
            <path
            d="M1990 3400 c0 -10 -68 -92 -133 -158 -76 -78 -193 -138 -339 -172
            l-57 -13 16 -31 c8 -17 35 -51 58 -76 32 -32 45 -55 47 -80 4 -50 38 -51 134
            -4 135 68 354 276 354 336 0 8 3 18 7 22 4 3 12 22 18 40 11 33 10 36 -37 90
            -47 53 -68 68 -68 46z"
            />
            <path
            d="M3059 3376 c-2 -2 -48 -7 -102 -10 -98 -7 -147 -18 -147 -35 0 -5 14
            -41 30 -80 56 -130 64 -179 65 -379 l0 -183 40 -10 c51 -13 104 -29 133 -40
            13 -5 27 -9 32 -9 18 0 34 129 60 500 5 69 12 153 16 188 l7 62 -65 0 c-36 0
            -67 -2 -69 -4z"
            />
            <path
            d="M3232 3367 c-6 -6 -15 -86 -21 -177 -11 -159 -23 -301 -41 -479 -8
            -86 -6 -111 12 -111 8 0 179 -80 208 -97 3 -2 5 52 5 120 1 67 7 154 14 192
            27 153 93 411 126 498 6 14 2 17 -23 17 -16 0 -54 11 -84 25 -60 28 -177 35
            -196 12z"
            />
            <path
            d="M3569 3305 c-11 -24 -26 -73 -34 -107 -9 -35 -29 -121 -46 -193 -63
            -270 -75 -437 -38 -573 27 -103 55 -155 106 -203 77 -71 111 -75 173 -18 69
            62 121 83 210 84 41 0 78 4 82 10 4 5 8 27 8 48 0 25 9 50 25 71 15 20 25 46
            25 67 0 19 10 50 23 69 34 53 61 176 54 248 -5 48 -3 61 8 66 47 18 -30 172
            -146 293 -49 52 -151 113 -188 113 -7 0 -42 16 -78 35 -49 27 -77 35 -114 35
            -50 0 -50 0 -70 -45z"
            />
            <path
            d="M2173 3317 c-19 -6 -36 -20 -39 -32 -21 -69 -98 -207 -141 -251 -110
            -112 -278 -224 -338 -224 -32 0 -36 -10 -16 -39 10 -14 21 -42 25 -61 4 -23
            26 -57 64 -98 l57 -63 70 49 c110 77 326 152 437 152 l29 0 -4 198 c-3 118
            -11 233 -20 287 -9 50 -16 91 -17 93 -1 6 -79 -2 -107 -11z"
            />
            <path
            d="M2310 3323 c0 -4 12 -62 25 -128 20 -98 25 -149 25 -281 l0 -161 108
            -7 c102 -6 306 -29 364 -42 38 -8 41 14 35 204 -4 139 -9 168 -35 254 -17 54
            -39 114 -48 134 l-17 36 -106 -7 c-164 -10 -221 -11 -288 -2 -35 5 -63 5 -63
            0z"
            />
            <path
            d="M2220 2711 c-107 -15 -313 -98 -384 -154 -24 -20 -27 -28 -22 -54 4
            -17 31 -62 61 -100 44 -57 65 -75 113 -96 33 -15 70 -27 83 -27 12 0 51 18 85
            40 96 63 155 82 259 83 109 0 164 -20 228 -86 32 -34 51 -45 84 -49 26 -4 45
            -2 51 6 19 25 65 244 66 315 l1 75 -45 8 c-202 36 -471 54 -580 39z"
            />
            <path
            d="M2885 2583 c-6 -67 -14 -106 -53 -252 l-19 -73 31 -13 c20 -8 112
            -14 261 -18 l230 -6 55 30 c30 16 61 29 68 29 16 0 16 3 -12 63 -13 29 -27 63
            -31 77 -12 39 -21 47 -117 95 -91 47 -342 135 -383 135 -22 0 -24 -5 -30 -67z"
            />
            <path
            d="M2355 2373 c-54 -10 -155 -48 -155 -58 0 -6 24 -20 53 -30 34 -12 69
            -36 102 -69 43 -43 53 -61 64 -111 8 -33 20 -85 27 -116 8 -31 14 -85 14 -118
            l0 -62 48 3 47 3 6 92 c4 50 11 106 17 125 6 18 13 54 16 81 3 26 15 65 26 87
            11 21 20 48 20 58 0 23 -41 66 -83 87 -40 20 -157 36 -202 28z"
            />
            <path
            d="M2232 2243 c14 -16 29 -37 33 -48 14 -36 39 -219 39 -289 l1 -68 38
            -15 c21 -9 41 -12 45 -8 11 11 18 164 10 242 -9 83 -33 130 -86 166 -34 24
            -84 47 -100 47 -3 0 6 -12 20 -27z"
            />
            <path
            d="M3820 2240 c-19 -10 -55 -36 -79 -57 l-44 -39 37 -57 c26 -41 42 -82
            56 -149 11 -51 26 -115 34 -143 13 -49 14 -50 61 -59 43 -9 49 -8 65 11 18 23
            85 249 95 324 7 48 -10 155 -27 177 -17 20 -156 15 -198 -8z"
            />
            <path
            d="M3560 2160 c11 -37 16 -45 62 -100 33 -40 39 -56 49 -125 6 -44 8
            -92 5 -107 -4 -20 0 -33 16 -48 31 -29 45 -25 59 18 20 60 13 165 -16 225 -39
            82 -63 117 -81 117 -10 0 -32 11 -50 25 -44 33 -55 32 -44 -5z"
            />
            <path
            d="M2297 1802 c-3 -4 -8 -25 -12 -47 -10 -60 -25 -93 -72 -165 -24 -36
            -42 -74 -41 -85 3 -17 12 -20 73 -23 78 -3 95 8 95 62 0 16 7 37 15 46 16 18
            35 109 35 168 0 28 -3 32 -26 32 -14 0 -34 5 -44 10 -10 6 -21 7 -23 2z"
            />
            <path
            d="M2455 1743 c-10 -71 -22 -109 -67 -201 -22 -46 -37 -86 -34 -89 9
            -10 112 -16 140 -9 25 6 46 48 46 94 0 14 7 33 15 43 17 17 21 55 17 152 l-2
            57 -54 0 -55 0 -6 -47z"
            />
            <path
            d="M3599 1657 c-73 -102 -99 -151 -86 -163 9 -9 69 -13 101 -7 18 4 29
            15 36 39 7 19 20 39 31 44 10 6 25 33 34 63 25 87 24 97 -12 112 l-32 13 -72
            -101z"
            />
            <path
            d="M3774 1627 c-25 -50 -64 -111 -85 -134 -43 -47 -47 -58 -23 -67 22
            -9 137 -7 151 2 6 4 17 29 24 55 6 27 20 52 30 58 25 13 48 58 58 115 10 51
            11 49 -61 58 l-48 6 -46 -93z"
            />
          </g>
        </g>

        {/* Hotspots */}
        {HOTSPOTS_LAMB.map((h) => {
          const isActive = active === h.id;
          const isHover = hover === h.id;

          return (
            <g
              key={h.id}
              role="button"
              tabIndex={-1}
              aria-label={`${h.en} / ${h.es}`}
              onMouseEnter={() => handleHotspotHover(h.id)}
              onMouseLeave={() => handleHotspotHover(null)}
              onClick={() => handleHotspotClick(h.id)}
            >
              {/* Área clickeable invisible */}
              {renderHitArea(h.x, h.y, HIT_RADIUS, HIT_FILL, HIT_OPACITY, HIT_POINTER_EVENTS)}

              {/* Número del hotspot con estilo del punto */}
              {renderHotspotNumber(
                h.id,
                HOTSPOTS_LAMB,
                h.x,
                h.y,
                isActive,
                isHover,
                DOT_CLASS_TRANSITION,
                DOT_FILL_INACTIVE,
                DOT_ACTIVE_GRADIENT_ID,
                DOT_GLOW_SOFT_ID
              )}

              {/* Anillo base */}
              {renderBaseRing(
                h.x,
                h.y,
                RING_RADIUS,
                isActive,
                RING_RADIUS_ACTIVE,
                RING_CLASS_BASE,
                RING_STROKE_BASE_COLOR,
                RING_STROKE_BASE_WIDTH,
                RING_OPACITY_BASE,
                RING_OPACITY_ACTIVE
              )}

              {/* (Opcional) Anillo externo giratorio */}
              {renderOuterSpinRing(
                h.x,
                h.y,
                isActive,
                SHOW_OUTER_SPIN_RING,
                RING_RADIUS_ACTIVE,
                OUTER_SPIN_STROKE_WIDTH,
                OUTER_SPIN_OPACITY
              )}
            </g>
          );
        })}
      </svg>

      {/* === Overlay HTML: tooltip fuera del SVG y apuntando EXACTO al hotspot === */}
      {sel && renderTooltip(
        sel,
        svgSize,
        svgOffset,
        VIEWBOX_WIDTH,
        VIEWBOX_HEIGHT,
        TOOLTIP_WIDTH,
        TOOLTIP_HEIGHT,
        TOOLTIP_PADDING_X,
        TOOLTIP_PADDING_Y,
        TOOLTIP_RX,
        TOOLTIP_BG_COLOR,
        TOOLTIP_BG_OPACITY,
        TOOLTIP_TEXT1_FILL,
        TOOLTIP_TEXT1_FONTSIZE,
        TOOLTIP_TEXT1_FONTWEIGHT,
        TOOLTIP_TEXT2_FILL,
        TOOLTIP_TEXT2_FONTSIZE,
        TOOLTIP_ARROW_FILL,
        KEY_CLOSE
      )}

      <p className="mt-3 text-center text-xs text-white/80">
        Esquema ilustrativo. Toca un punto para ver el corte.
      </p>
    </div>
  );
}