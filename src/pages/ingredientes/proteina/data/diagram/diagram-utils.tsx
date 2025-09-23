import React, { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

// Hook para manejar el tamaño y posición del SVG
export function useSvgDimensions(viewBoxWidth: number, viewBoxHeight: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgSize, setSvgSize] = useState({ width: viewBoxWidth, height: viewBoxHeight });
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

  return { containerRef, svgRef, svgSize, svgOffset };
}

// Hook para manejar el estado de hotspots (activo/hover)
export function useHotspotState() {
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const handleHotspotClick = (hotspotId: string) => {
    setActive(active === hotspotId ? null : hotspotId);
  };

  const handleHotspotHover = (hotspotId: string | null) => {
    setHover(hotspotId);
  };

  return {
    active,
    hover,
    setActive,
    setHover,
    handleHotspotClick,
    handleHotspotHover
  };
}

// Hook para manejar eventos de teclado
export function useKeyboardEvents(onClose: () => void, closeKey: string = 'Escape') {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === closeKey) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, closeKey]);
}

// Función para generar gradientes radiales
export function createRadialGradient(
  id: string,
  centerColor: string,
  centerOpacity: number,
  edgeColor: string,
  edgeOpacity: number
) {
  return (
    <radialGradient id={id} cx="50%" cy="50%" r="60%">
      <stop
        offset="0%"
        stopColor={centerColor}
        stopOpacity={centerOpacity}
      />
      <stop
        offset="100%"
        stopColor={edgeColor}
        stopOpacity={edgeOpacity}
      />
    </radialGradient>
  );
}

// Función para generar gradientes lineales
export function createLinearGradient(
  id: string,
  fromColor: string,
  toColor: string,
  x1: string = "0",
  x2: string = "1",
  y1: string = "0",
  y2: string = "1"
) {
  return (
    <linearGradient id={id} x1={x1} x2={x2} y1={y1} y2={y2}>
      <stop offset="0%" stopColor={fromColor} />
      <stop offset="100%" stopColor={toColor} />
    </linearGradient>
  );
}

// Función para generar filtros de glow
export function createGlowFilter(
  id: string,
  stdDeviation: number = 1.5
) {
  return (
    <filter
      id={id}
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
    >
      <feGaussianBlur stdDeviation={stdDeviation} result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

// Función para generar filtros de sombra
export function createShadowFilter(
  id: string,
  dx: number = 0,
  dy: number = 2,
  stdDeviation: number = 3,
  floodOpacity: number = 0.35
) {
  return (
    <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow 
        dx={dx} 
        dy={dy} 
        stdDeviation={stdDeviation} 
        floodOpacity={floodOpacity} 
      />
    </filter>
  );
}

// Función para renderizar números de hotspots
export function renderHotspotNumber(
  hotspotId: string,
  hotspots: any[],
  x: number,
  y: number,
  isActive: boolean,
  isHover: boolean,
  dotClassTransition: string,
  dotFillInactive: string,
  dotActiveGradientId: string,
  dotGlowSoftId: string
) {
  const number = hotspots.findIndex(spot => spot.id === hotspotId) + 1;
  
  return (
    <text
      x={x}
      y={y + 0.5}
      textAnchor="middle"
      dominantBaseline="middle"
      className={dotClassTransition}
      fill={
        isActive
          ? `url(#${dotActiveGradientId})`
          : dotFillInactive
      }
      filter={`url(#${dotGlowSoftId})`}
      style={{
        fontSize: 'clamp(8px, 1.5vw, 10px)',
        fontWeight: 'bold',
        textShadow: isActive ? '0 0 1px rgba(0,0,0,0.6)' : '0 0 0.5px rgba(255,255,255,0.9)'
      }}
    >
      {number}
    </text>
  );
}

// Función para renderizar área clickeable invisible
export function renderHitArea(
  x: number,
  y: number,
  radius: number,
  fill: string = '#ffffff',
  opacity: number = 0.0,
  pointerEvents: CSSProperties['pointerEvents'] = 'all'
) {
  return (
    <circle
      cx={x}
      cy={y}
      r={radius}
      fill={fill}
      opacity={opacity}
      style={{ pointerEvents }}
    />
  );
}

// Función para renderizar anillo base
export function renderBaseRing(
  x: number,
  y: number,
  radius: number,
  isActive: boolean,
  ringRadiusActive: number,
  ringClassBase: string,
  ringStrokeBaseColor: string,
  ringStrokeBaseWidth: number,
  ringOpacityBase: number,
  ringOpacityActive: number
) {
  const rRing = isActive ? ringRadiusActive : radius;
  
  return (
    <circle
      cx={x}
      cy={y}
      r={rRing}
      className={ringClassBase}
      fill="none"
      stroke={ringStrokeBaseColor}
      strokeWidth={ringStrokeBaseWidth}
      opacity={isActive ? ringOpacityActive : ringOpacityBase}
    />
  );
}

// Función para renderizar tooltip
export function renderTooltip(
  selectedHotspot: any,
  svgSize: { width: number; height: number },
  svgOffset: { left: number; top: number },
  viewBoxWidth: number,
  viewBoxHeight: number,
  tooltipWidth: number,
  tooltipHeight: number,
  tooltipPaddingX: number,
  tooltipPaddingY: number,
  tooltipRx: number,
  tooltipBgColor: string,
  tooltipBgOpacity: number,
  tooltipText1Fill: string,
  tooltipText1FontSize: number,
  tooltipText1FontWeight: number,
  tooltipText2Fill: string,
  tooltipText2FontSize: number,
  tooltipArrowFill: string,
  closeKey: string
) {
  if (!selectedHotspot) return null;

  // Escalas del SVG renderizado vs viewBox
  const scaleX = svgSize.width / viewBoxWidth;
  const scaleY = svgSize.height / viewBoxHeight;

  // Hotspot en px dentro del SVG renderizado
  const anchorSvgX = selectedHotspot.x * scaleX;
  const anchorSvgY = selectedHotspot.y * scaleY;

  // Convertimos a coords del CONTENEDOR sumando el offset del SVG
  const anchorLeft = svgOffset.left + anchorSvgX;
  const anchorTop = svgOffset.top + anchorSvgY;

  // Geometría/constantes en px
  const ARROW_W = 10;
  const ARROW_H = 12;
  const BOX_W = tooltipWidth;
  const BOX_H = tooltipHeight;
  const MARGIN = 8;

  // Área útil para clamping = rectángulo del SVG dentro del contenedor
  const clampLeft = svgOffset.left + MARGIN;
  const clampRight = svgOffset.left + svgSize.width - BOX_W - MARGIN;
  const clampTop = svgOffset.top + MARGIN;
  const clampBottom = svgOffset.top + svgSize.height - BOX_H - MARGIN;

  // Decidir lado (derecha si cabe dentro del propio ancho del SVG)
  const placeRight = (anchorSvgX + ARROW_W + BOX_W + MARGIN) <= svgSize.width;

  // Posición base de la caja respecto al ancla (en coords del contenedor)
  let boxLeft = placeRight
    ? anchorLeft + ARROW_W
    : anchorLeft - ARROW_W - BOX_W;

  let boxTop = anchorTop - BOX_H / 2;

  // Clamp para mantener la caja dentro del área del SVG dibujado
  boxLeft = Math.max(clampLeft, Math.min(boxLeft, clampRight));
  boxTop = Math.max(clampTop, Math.min(boxTop, clampBottom));

  // Flecha: PUNTA exactamente en el hotspot (coords del contenedor)
  const arrowLeft = placeRight ? anchorLeft : anchorLeft - ARROW_W;
  const arrowTop = anchorTop - ARROW_H / 2;

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
            rx={tooltipRx}
            width={BOX_W}
            height={BOX_H}
            fill={tooltipBgColor}
            opacity={tooltipBgOpacity}
          />
          <text
            x={tooltipPaddingX}
            y={18}
            fill={tooltipText1Fill}
            fontSize={tooltipText1FontSize}
            fontWeight={tooltipText1FontWeight}
          >
            {selectedHotspot.en} / {selectedHotspot.es}
          </text>
          <text
            x={tooltipPaddingX}
            y={34}
            fill={tooltipText2Fill}
            fontSize={tooltipText2FontSize}
          >
            Click para fijar • {closeKey} para cerrar
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
        <path d="M 0 6 L 10 12 L 10 0 Z" fill={tooltipArrowFill} opacity={tooltipBgOpacity} />
      </svg>
    </>
  );
}

// Función para generar CSS de animaciones
export function createRingSpinCSS(
  dashArray: string,
  durationSec: number,
  dashOffsetTo: number
) {
  return `
    .ring-spin {
      stroke-dasharray: ${dashArray};
      animation: dash ${durationSec}s linear infinite;
    }
    @keyframes dash { to { stroke-dashoffset: ${dashOffsetTo}; } }
  `;
}

// Función para renderizar anillo externo giratorio
export function renderOuterSpinRing(
  x: number,
  y: number,
  isActive: boolean,
  showOuterSpinRing: boolean,
  ringRadiusActive: number,
  outerSpinStrokeWidth: number,
  outerSpinOpacity: number
) {
  if (!showOuterSpinRing || !isActive) return null;

  return (
    <circle
      cx={x}
      cy={y}
      r={ringRadiusActive + 6}
      fill="none"
      stroke="url(#ringGrad)"
      strokeWidth={outerSpinStrokeWidth}
      className="ring-spin"
      opacity={outerSpinOpacity}
    />
  );
}
