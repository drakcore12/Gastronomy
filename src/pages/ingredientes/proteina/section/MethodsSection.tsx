import React from 'react';
import { Flame } from 'lucide-react';
import MethodCard from './methodcard';

export default function MethodsSection() {
  return (
    <section className="relative bg-amber-50 py-12" aria-labelledby="metodos-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center gap-2">
          <Flame className="h-5 w-5 text-amber-700" aria-hidden="true" />
          <h2 id="metodos-heading" className="text-xl font-bold text-amber-900">Métodos de Cocción Clave</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Técnicas de cocción recomendadas">
          <MethodCard
            title="Sellado y reposo"
            body="Alta temperatura para Maillard; reposo 5–8 min."
          />
          <MethodCard
            title="Low & slow"
            body="120–160 °C por horas para cortes colagenosos."
          />
          <MethodCard
            title="Corte contra la fibra"
            body="Láminas finas perpendiculares para máxima terneza."
          />
        </div>
      </div>
    </section>
  );
}
