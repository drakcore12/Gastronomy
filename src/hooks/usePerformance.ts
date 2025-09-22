import { useEffect, useCallback, useState } from 'react';

// Hook para optimizar el rendimiento y Core Web Vitals
export function usePerformance() {
  // Lazy loading para imágenes
  const observeImages = useCallback(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observar todas las imágenes con data-src
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }, []);

  // Preload crítico de recursos
  const preloadCriticalResources = useCallback(() => {
    // Preload de fuentes críticas
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
  }, []);

  // Optimización de scroll
  const optimizeScroll = useCallback(() => {
    let ticking = false;
    
    const updateScrollPosition = () => {
      // Aquí puedes agregar lógica de scroll si es necesaria
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, []);

  // Medición de Core Web Vitals
  const measureWebVitals = useCallback(() => {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  useEffect(() => {
    // Inicializar optimizaciones
    observeImages();
    preloadCriticalResources();
    const cleanupScroll = optimizeScroll();
    measureWebVitals();

    return () => {
      cleanupScroll();
    };
  }, [observeImages, preloadCriticalResources, optimizeScroll, measureWebVitals]);
}

// Hook para lazy loading de componentes
export function useLazyComponent(importFunc: () => Promise<any>) {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    importFunc()
      .then((module) => {
        setComponent(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [importFunc]);

  return { Component, loading, error };
}
