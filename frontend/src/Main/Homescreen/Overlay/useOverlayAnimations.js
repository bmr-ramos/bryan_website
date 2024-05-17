import { useEffect } from 'react';
import { gsap } from 'gsap';

const useOverlayAnimations = (
  backgroundRef,
  overlayRef,
  toolbarRef,
  hamburgerButtonRef,
  isMobile,
  onClose
) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      backgroundRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      overlayRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    if (toolbarRef.current) {
      gsap.fromTo(
        toolbarRef.current,
        { opacity: 0, filter: 'blur(20px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
      );
    }

    if (isMobile) {
      gsap.fromTo(
        hamburgerButtonRef.current,
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.5, ease: 'power2.out' }
      );
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobile, backgroundRef, overlayRef, toolbarRef, hamburgerButtonRef]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: onClose,
    });
    gsap.to(backgroundRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    });

    if (toolbarRef.current) {
      gsap.to(toolbarRef.current, {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.5,
        ease: 'power2.in',
      });
    }

    if (isMobile) {
      gsap.to(hamburgerButtonRef.current, {
        opacity: 0,
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  };

  const handleMaximize = (isMaximized, setIsMaximized, buttonRef) => {
    const newMaximizedState = !isMaximized;
    gsap.to(overlayRef.current, {
      width: newMaximizedState ? '100%' : '92%',
      height: newMaximizedState ? '100%' : '83.333%',
      borderRadius: newMaximizedState ? '0px' : '8px',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => setIsMaximized(newMaximizedState),
    });

    gsap.to(buttonRef.current, {
      backgroundColor: newMaximizedState ? '#f59e0b' : '#10b981', // yellow for maximized, green for minimized
      duration: 0.5,
      ease: 'power2.inOut',
    });
  };

  return { handleClose, handleMaximize };
};

export default useOverlayAnimations;
