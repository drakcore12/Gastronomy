import { useState, useEffect } from 'react';
import { PageKey } from '../types';

export function useHeaderState(currentPage: PageKey) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [previousPage, setPreviousPage] = useState<PageKey>(currentPage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Efecto para detectar scroll y cambiar el header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejar transiciones de página
  useEffect(() => {
    if (currentPage !== previousPage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setPreviousPage(currentPage);
        setIsTransitioning(false);
      }, 300);
    }
    setIsMobileMenuOpen(false);
  }, [currentPage, previousPage]);

  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isScrolled,
    isTransitioning
  };
}
