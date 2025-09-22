import React from 'react';
import { 
  ChefHat, 
  Clock, 
  Thermometer, 
  Droplets, 
  Leaf, 
  Zap,
  BookOpen,
  Star
} from 'lucide-react';

export default function MethodsSection() {
  const tecnicas = [
    {
      id: 'cortes',
      titulo: 'Cortes',
      icono: ChefHat,
      color: 'from-blue-500 to-blue-600',
      items: [
        { nombre: 'Brunoise', descripcion: 'Cubos de 2-3mm, ideal para salsas' },
        { nombre: 'Supremas', descripcion: 'Gajos sin piel ni semillas' },
        { nombre: 'Juliana', descripcion: 'Tiras finas para decoración' },
        { nombre: 'Concassé', descripcion: 'Tomate pelado y sin semillas' }
      ]
    },
    {
      id: 'transformaciones',
      titulo: 'Transformaciones',
      icono: Zap,
      color: 'from-purple-500 to-purple-600',
      items: [
        { nombre: 'Compota', descripcion: 'Cocción lenta con azúcar' },
        { nombre: 'Coulis', descripcion: 'Puré fino colado' },
        { nombre: 'Macerado', descripcion: 'Remojo en líquido aromático' },
        { nombre: 'Confitura', descripcion: 'Conserva con alto contenido de azúcar' }
      ]
    },
    {
      id: 'texturas',
      titulo: 'Texturas',
      icono: Leaf,
      color: 'from-green-500 to-green-600',
      items: [
        { nombre: 'Gelificación', descripcion: 'Usando pectina o agar' },
        { nombre: 'Espumas', descripcion: 'Con sifón o batido' },
        { nombre: 'Deshidratado', descripcion: 'Eliminación de humedad' },
        { nombre: 'Fermentación', descripcion: 'Transformación por microorganismos' }
      ]
    },
    {
      id: 'calor',
      titulo: 'Calor',
      icono: Thermometer,
      color: 'from-red-500 to-red-600',
      items: [
        { nombre: 'Asado', descripcion: 'Cocción en horno seco' },
        { nombre: 'Caramelizado', descripcion: 'Azúcar caramelizada' },
        { nombre: 'Frito', descripcion: 'Inmersión en aceite caliente' },
        { nombre: 'Escaldado', descripcion: 'Cocción rápida en agua hirviendo' }
      ]
    }
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Técnicas Culinarias con Frutas
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Domina las técnicas esenciales para transformar frutas en ingredientes extraordinarios. 
            Desde cortes precisos hasta métodos de conservación.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {tecnicas.map((categoria) => {
            const IconComponent = categoria.icono;
            return (
              <div
                key={categoria.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:shadow-lg"
              >
                {/* Header */}
                <div className={`h-24 bg-gradient-to-br ${categoria.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-8" />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {categoria.titulo}
                  </h3>
                  
                  <div className="space-y-3">
                    {categoria.items.map((item, index) => (
                      <div key={index} className="group/item">
                        <h4 className="text-sm font-medium text-slate-800 mb-1">
                          {item.nombre}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors">
              Ver Técnicas Detalladas
            </button>
            <button className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
              Preparaciones Paso a Paso
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
