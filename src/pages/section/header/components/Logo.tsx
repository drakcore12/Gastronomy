import React from 'react';
import { Beef } from 'lucide-react';
import { PageKey } from '../types';
import { useHeaderNavigation } from '../hooks';

interface LogoProps {
  isScrolled: boolean;
  onNavigate?: (page: PageKey) => void;
}

export function Logo({ isScrolled, onNavigate }: LogoProps) {
  const { handleLinkClick, getPageHref } = useHeaderNavigation();

  return (
    <a
      href={getPageHref('home')}
      onClick={(e) => handleLinkClick('home', e)}
      className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
      aria-label="Ir al inicio"
    >
      <div
        className={`
          flex h-10 w-10 items-center justify-center rounded-xl 
          bg-gradient-to-br from-orange-500 to-orange-600 text-white
          transition-all duration-500 transform
          ${isScrolled ? 'scale-90' : 'scale-100'}
          group-hover:scale-110 group-hover:shadow-lg
        `}
        aria-hidden="true"
      >
        <Beef className="h-6 w-6" />
      </div>
      <div className={`transition-all duration-500 ${isScrolled ? 'opacity-80' : 'opacity-100'}`}>
        <h1 className="font-bold tracking-tight text-xl text-slate-900 group-hover:text-orange-600 transition-colors">
          Gastronomía Profesional
        </h1>
        <p className={`text-sm text-slate-500 transition-all duration-300 ${isScrolled ? 'opacity-0 h-0' : 'opacity-100 h-auto'}`}>
          Aprender cocinando
        </p>
      </div>
    </a>
  );
}
