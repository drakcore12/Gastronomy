import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      className={`
        group flex items-center gap-2 px-4 py-2 
        text-slate-600 hover:text-orange-600 hover:bg-orange-50 
        rounded-lg transition-all duration-300 ease-out 
        transform hover:scale-105 hover:-translate-x-1
      `}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">Volver</span>
    </button>
  );
}
