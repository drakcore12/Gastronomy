import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slides, { type Slide } from '../data/slides';
import CowDiagram from '../data/diagram/cowdiagram';
import PigDiagram from '../data/diagram/pigdiagram';
import ChickenDiagram from '../data/diagram/chickendiagram';
import LambDiagram from '../data/diagram/lambdiagram';
import TurkeyDiagram from '../data/diagram/turkeydiagram';
import GoatDiagram from '../data/diagram/goatdiagram';
import FishDiagram from '../data/diagram/fishdiagram';

type Props = {
  // se dispara cuando cambia el slide o cuando el usuario toca el CTA
  onSelectGraphic?: (g: Slide['graphic']) => void;
};

function renderGraphic(id: Slide['graphic']) {
  switch (id) {
    case 'cow':
      return <CowDiagram />;
    case 'pig':
      return <PigDiagram />;
    case 'chicken':
      return <ChickenDiagram />;
    case 'lamb':
      return <LambDiagram />;
    case 'turkey':
      return <TurkeyDiagram />;
    case 'goat':
      return <GoatDiagram />;
    case 'fish':
      return <FishDiagram />;
    default:
      return null;
  }
}

export default function HeroSlider({ onSelectGraphic }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  // Evitar notificaciones repetidas del mismo graphic (durante smooth scroll)
  const lastNotified = React.useRef<Slide['graphic'] | null>(null);
  useEffect(() => {
    const g = slides[index].graphic;
    if (lastNotified.current !== g) {
      lastNotified.current = g;
      onSelectGraphic?.(g);
    }
  }, [index]); // <-- sin onSelectGraphic para evitar loops

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.clientWidth || 1;
        const i = Math.round(el.scrollLeft / w);
        setIndex(i);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
    // setIndex se actualizará por el listener de scroll
  };

  const atStart = index <= 0;
  const atEnd = index >= slides.length - 1;

  const handleCTA = (g: Slide['graphic']) => {
    onSelectGraphic?.(g);
    const target = document.getElementById('cortes');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Track */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Presentación de slides"
        className="hidebar flex w-screen min-h-[70svh] sm:min-h-[75svh] lg:min-h-[85svh] snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <style>{`.hidebar::-webkit-scrollbar{display:none}`}</style>

        {slides.map((s) => (
          <article
            key={s.key}
            role="article"
            aria-roledescription="slide"
            aria-label={`${s.titleA} ${s.titleB}`}
            className={`relative flex min-w-full snap-start items-center px-8 py-12 sm:px-16 lg:px-24 ${s.theme.bg}`}
            style={{ paddingTop: '100px', paddingBottom: '100px' }}
          >
            <div className="mx-auto grid w-full max-w-7xl gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Texto */}
              <div
                className={`flex flex-col justify-center text-center sm:text-left ${s.theme.text}`}
              >
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {s.titleA}
                  <span className={`block ${s.theme.accent}`}>{s.titleB}</span>
                </h1>

                <p
                  className={`mt-6 text-base sm:text-lg leading-relaxed ${s.theme.textMuted}`}
                >
                  {s.body}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                  {/* CTA principal: activa filtro + hace scroll */}
                  <a
                    href="#cortes"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCTA(s.graphic);
                    }}
                    className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl ${s.theme.btnSolid}`}
                  >
                    {s.cta1.label}
                  </a>

                  {/* CTA secundaria: igual, pero personalizable */}
                  <a
                    href="#cortes"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCTA(s.graphic);
                    }}
                    className={`inline-flex items-center rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all hover:scale-105 ${s.theme.btnOutline}`}
                  >
                    {s.cta2.label}
                  </a>
                </div>
              </div>

              {/* Gráfico */}
              <div className="relative flex items-center justify-center">
                <div
                  aria-hidden
                  className="absolute inset-0 -m-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-3xl"
                />
                <div className="relative z-10 w-full max-w-[22rem] sm:max-w-md lg:max-w-lg">
                  {renderGraphic(s.graphic)}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Controles */}
      <div className="absolute inset-x-0 bottom-6 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
          <div className="flex gap-3">
            <button
              onClick={() => go(index - 1)}
              disabled={atStart}
              className="group relative h-12 w-12 rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="mx-auto h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              disabled={atEnd}
              className="group relative h-12 w-12 rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Siguiente slide"
            >
              <ChevronRight className="mx-auto h-6 w-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ir al slide ${i + 1}`}
                aria-current={i === index ? 'true' : 'false'}
                className={`h-2 transition-all duration-300 ${
                  i === index
                    ? 'w-8 rounded-full bg-white shadow-lg'
                    : 'w-2 rounded-full bg-white/60 hover:scale-125 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
