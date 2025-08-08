// hooks/useScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Handle anchor links
      const element = document.querySelector(hash);
      if (element) {
        const headerHeight = 80; // Adjust to your header height
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Scroll to top for regular navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
};