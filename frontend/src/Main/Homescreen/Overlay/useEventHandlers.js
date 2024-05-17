import { useEffect } from 'react';

const useEventHandlers = (setIsMobile, setIsMenuOpen) => {
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);

      if (!mobileView) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsMobile, setIsMenuOpen]);
};

export default useEventHandlers;
