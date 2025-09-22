import React from 'react';
import { ALL_CUTS, type Cut } from '../pages/ingredientes/proteina/data/cuts';

interface StructuredDataProps {
  cuts: Cut[];
  currentSpecies: string;
}

export default function StructuredData({ cuts, currentSpecies }: StructuredDataProps) {
  // Crear datos estructurados para la colección de cortes
  const cutsStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Cortes de ${currentSpecies} - Guía Gastronómica`,
    "description": `Colección completa de cortes de ${currentSpecies} con métodos de cocción, descripciones y técnicas profesionales`,
    "url": `https://gastronomia-profesional.com/#cortes-${currentSpecies}`,
    "mainEntity": {
      "@type": "ItemList",
      "name": `Cortes de ${currentSpecies}`,
      "description": `Lista de todos los cortes de ${currentSpecies} disponibles`,
      "numberOfItems": cuts.length,
      "itemListElement": cuts.map((cut, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Food",
          "name": cut.nombre,
          "description": cut.descripcion || `Corte de ${cut.especie || 'res'}`,
          "category": cut.especie || 'res',
          "additionalProperty": [
            ...(cut.alias ? cut.alias.map(alias => ({
              "@type": "PropertyValue",
              "name": "Alias",
              "value": alias
            })) : []),
            ...(cut.primal ? [{
              "@type": "PropertyValue",
              "name": "Primal",
              "value": cut.primal.es
            }] : []),
            ...(cut.metodos ? cut.metodos.map(metodo => ({
              "@type": "PropertyValue",
              "name": "Método de Cocción",
              "value": metodo
            })) : [])
          ]
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://gastronomia-profesional.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cortes de Carne",
          "item": "https://gastronomia-profesional.com/#cortes"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `Cortes de ${currentSpecies}`,
          "item": `https://gastronomia-profesional.com/#cortes-${currentSpecies}`
        }
      ]
    }
  };

  // Datos estructurados para la organización
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Miguel Ángel Noreña Cano",
    "description": "Desarrollador de software e ingeniero especializado en proyectos educativos de gastronomía",
    "url": "https://gastronomia-profesional.com/",
    "image": "https://gastronomia-profesional.com/author-photo.jpg",
    "jobTitle": "Ingeniero de Software",
    "worksFor": {
      "@type": "Organization",
      "name": "Proyecto Educativo Gastronomía"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Institución Universitaria Pascual Bravo",
        "description": "Ingeniería de Software"
      },
      {
        "@type": "EducationalOrganization", 
        "name": "SENA",
        "description": "Tecnología en Gestión de Redes de Datos"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Medellín",
      "addressCountry": "Colombia"
    },
    "sameAs": [
      "https://github.com/drakcore12"
    ],
    "knowsAbout": [
      "Desarrollo de Software",
      "React",
      "TypeScript", 
      "Gastronomía",
      "Técnicas Culinarias",
      "Cortes de Carne"
    ]
  };

  // Datos estructurados para FAQ
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué tipos de cortes de carne incluye esta guía?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nuestra guía incluye cortes de res, cerdo, pollo, cordero, pavo, cabra y pescado, con información detallada sobre métodos de cocción y técnicas profesionales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo puedo encontrar el corte de carne perfecto para mi receta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utiliza nuestro buscador para filtrar por nombre, alias o descripción, y los filtros por métodos de cocción para encontrar el corte ideal según la técnica que planeas usar."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué métodos de cocción son los más recomendados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los métodos clave incluyen sellado y reposo para cortes tiernos, low & slow para cortes colagenosos, y corte contra la fibra para máxima terneza."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cutsStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
