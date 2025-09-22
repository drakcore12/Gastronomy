import { useCallback } from 'react';
import { useNavigation as useNavigationContext } from '../../../../contexts/NavigationContext';
import { PageKey } from '../types';
import { getPageRoute } from '../routes';

/**
 * Hook personalizado para centralizar la lógica de navegación del header
 */
export function useHeaderNavigation() {
  const { currentPage, navigateTo, goBack, canGoBack } = useNavigationContext();

  // Función para manejar la navegación con href
  const handleNavigation = useCallback((page: PageKey) => {
    console.log('Header navigation to:', page);
    navigateTo(page);
  }, [navigateTo]);

  // Función para manejar clics en enlaces con href
  const handleLinkClick = useCallback((page: PageKey, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleNavigation(page);
  }, [handleNavigation]);

  // Función para obtener la ruta de una página
  const getPageHref = useCallback((page: PageKey) => {
    return getPageRoute(page);
  }, []);

  // Función para verificar si una página está activa
  const isPageActive = useCallback((page: PageKey) => {
    return currentPage === page;
  }, [currentPage]);

  return {
    currentPage,
    navigateTo: handleNavigation,
    handleLinkClick,
    getPageHref,
    isPageActive,
    goBack,
    canGoBack
  };
}
