import React from 'react';
import { PageKey } from '../types';

interface PageIndicatorProps {
  pageInfo: { 
    name: string; 
    icon: React.ComponentType<{ className?: string }>; 
    color: string; 
  };
  isTransitioning: boolean;
}

export function PageIndicator({ pageInfo, isTransitioning }: PageIndicatorProps) {
  const PageIcon = pageInfo.icon;

  return (
    <div className={`
      flex items-center space-x-2 
      transition-all duration-500 transform
      ${isTransitioning ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
    `}>
      <div
        className={`
          flex h-8 w-8 items-center justify-center rounded-lg 
          ${pageInfo.color} text-white 
          transition-all duration-300 ease-out 
          transform hover:scale-125
          shadow-lg hover:shadow-xl
        `}
      >
        <PageIcon className="h-4 w-4" />
      </div>
      <div className="hidden sm:block">
        <div className="text-sm font-medium text-slate-900">
          {pageInfo.name}
        </div>
        <div className="text-xs text-slate-500">Página actual</div>
      </div>
    </div>
  );
}
