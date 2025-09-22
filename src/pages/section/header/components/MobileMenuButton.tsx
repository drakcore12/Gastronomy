import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        md:hidden p-3 rounded-xl text-slate-600 
        hover:text-orange-600 hover:bg-orange-50 
        active:bg-orange-100 active:scale-95
        transition-all duration-300 transform
        ${isOpen ? 'bg-orange-100 text-orange-600 scale-105' : 'bg-slate-50 text-slate-600 scale-100'}
        border border-slate-200 hover:border-orange-200
      `}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-6">
        <Menu 
          className={`absolute inset-0 transition-all duration-300 ${
            isOpen 
              ? 'opacity-0 rotate-180 scale-75' 
              : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <X 
          className={`absolute inset-0 transition-all duration-300 ${
            isOpen 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-180 scale-75'
          }`} 
        />
      </div>
    </button>
  );
}
