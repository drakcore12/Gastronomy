import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PageKey = 
  | 'home'
  | 'ingredientes'
  | 'proteina'
  | 'verduras'
  | 'frutas'
  | 'especias'
  | 'harinas'
  | 'aceites'
  | 'legumbres'
  | 'recetas'
  | 'arroces'
  | 'bebidas'
  | 'ensaladas'
  | 'estofados'
  | 'pastas'
  | 'postres'
  | 'proteinas'
  | 'salsas'
  | 'sopas'
  | 'tapas'
  | 'tecnicas'
  | 'herramientas'
  | 'examen';

interface NavigationContextType {
  currentPage: PageKey;
  navigateTo: (page: PageKey) => void;
  goBack: () => void;
  canGoBack: boolean;
  setCanGoBack: (canGoBack: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [canGoBack, setCanGoBack] = useState(false);
  const [pageHistory, setPageHistory] = useState<PageKey[]>(['home']);

  const navigateTo = (page: PageKey) => {
    console.log('Navegación global:', page);
    setPageHistory(prev => [...prev, currentPage]);
    setCurrentPage(page);
    setCanGoBack(true);
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const previousPage = pageHistory[pageHistory.length - 1];
      setPageHistory(prev => prev.slice(0, -1));
      setCurrentPage(previousPage);
      setCanGoBack(pageHistory.length > 2);
    } else {
      setCurrentPage('home');
      setCanGoBack(false);
    }
  };

  return (
    <NavigationContext.Provider value={{
      currentPage,
      navigateTo,
      goBack,
      canGoBack,
      setCanGoBack
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
