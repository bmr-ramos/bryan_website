import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function OverlayWindowMobile({ title, onClose, buttonData }) {
  const overlayRef = useRef(null);
  const backgroundRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      if (!mobileView) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose]);

  useEffect(() => {
    if (overlayRef.current && backgroundRef.current && menuButtonRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.inOut' }
      );

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.inOut' }
      );

      gsap.fromTo(
        menuButtonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.inOut', delay: 0.2 }
      );
    }
  }, []);

  const handleClose = () => {
    if (overlayRef.current && backgroundRef.current && menuButtonRef.current) {
      gsap.to(menuButtonRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(40px)',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: onClose
      });

      gsap.to(backgroundRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  };

  const containerClassNames = `fixed inset-0 bg-custom-gray bg-opacity-50 backdrop-blur-3xl w-full h-full flex flex-col overflow-auto relative p-8`;

  return (
    <div>
      <div ref={backgroundRef} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-3xl z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div ref={overlayRef} className={containerClassNames}>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleClose}
              className="w-12 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <ion-icon name="close" className="text-white text-xs"></ion-icon>
            </button>
          </div>
          <div style={{ height: '50px' }}></div>
          <h2 className="text-4xl font-bold mb-8 text-white text-left">{title}</h2>
          <div className="overflow-y-auto p-4 flex-grow">
            {/* Add your scrollable content here */}
          </div>
          <button
            ref={menuButtonRef}
            className="fixed bottom-4 right-4 w-12 h-12 bg-custom-gray bg-opacity-50 backdrop-blur-3xl rounded-full flex items-center justify-center"
          >
            <ion-icon name="menu" className="text-white text-xl"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverlayWindowMobile;
