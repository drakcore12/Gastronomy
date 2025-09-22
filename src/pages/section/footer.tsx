import { Github, MapPin, GraduationCap, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Información principal */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Identidad */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Identidad</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-medium text-slate-900">Miguel Ángel Noreña Cano</p>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-3 w-3" aria-hidden="true" />
                <span>Ing. Software - Pascual Bravo</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-3 w-3" aria-hidden="true" />
                <span>Tec. Gestión de Redes - SENA</span>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Contacto</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                <span>Medellín, Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-3 w-3" aria-hidden="true" />
                <a 
                  href="https://github.com/drakcore12" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                  aria-label="Perfil de GitHub de Miguel Ángel Noreña Cano"
                >
                  github.com/drakcore12
                </a>
              </div>
            </div>
          </div>

          {/* Sobre el sitio */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Sobre el sitio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proyecto personal, educativo e interactivo de gastronomía, creado para aprender sobre cortes de carne, técnicas culinarias y cultura gastronómica.
            </p>
          </div>

          {/* Tecnologías */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Tecnologías</h3>
            <div className="flex flex-wrap gap-1">
              {['React', 'TypeScript', 'Vite', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="my-8 border-t border-slate-200"></div>

        {/* Copyright y créditos */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Miguel Ángel Noreña Cano – Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-400">
            Proyecto educativo • Desarrollado en Medellín
          </p>
        </div>
      </div>
    </footer>
  );
}
