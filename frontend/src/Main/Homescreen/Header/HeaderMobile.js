import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

const HeaderMobile = forwardRef(({ isSplashScreenGone }, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sheetRef = useRef(null);

  const toggleMenu = () => {
    if (isMenuOpen) {
      gsap.to(sheetRef.current, {
        y: '-100%',
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsMenuOpen(false);
          gsap.set(sheetRef.current, { visibility: 'hidden' });
        }
      });
    } else {
      gsap.set(sheetRef.current, { visibility: 'visible' });
      gsap.to(sheetRef.current, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.inOut',
        onStart: () => {
          setIsMenuOpen(true);
        }
      });
    }
  };

  // Check if ref.current is not null before accessing it
  useEffect(() => {
    if (isSplashScreenGone && ref && ref.current) {
      gsap.fromTo(ref.current, 
        { opacity: 0, y: -20 }, 
        { duration: 0.5, opacity: 1, y: 0, ease: 'power2.inOut' }
      );
    //   gsap.set(sheetRef.current, { y: '-100%', visibility: 'hidden' });
    }
  }, [isSplashScreenGone, ref]);

  useEffect(() => {
    gsap.set(sheetRef.current, { y: '-100%', visibility: 'hidden' });
  }, []);

  if (!isSplashScreenGone) {
    return null;
  }

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center p-2.5 bg-white bg-opacity-50 backdrop-blur-3xl fixed w-full z-50 border-b border-custom-gray">
        <div className="text-xl md:text-2xl font-bold text-white mx-2 whitespace-nowrap">The Experience ♛</div>
        <button 
          className="text-white text-xl md:text-2xl flex items-center justify-center"
          style={{ height: '30px', width: '30px' }}
          onClick={toggleMenu}
        >
          {isMenuOpen
            ? <ion-icon name="close" style={{ fontSize: '24px' }}></ion-icon>
            : <ion-icon name="menu" style={{ fontSize: '24px' }}></ion-icon>
          }
        </button>
      </div>
      <div 
        ref={sheetRef}
        className="fixed top-0 left-0 w-full h-screen bg-custom-gray bg-opacity-50 backdrop-blur-3xl z-60"
        style={{ transform: 'translateY(-100%)', visibility: 'hidden', zIndex: 1 }} // Increase z-index here
        >
        <div className="pt-16 flex flex-col items-start space-y-6 pl-8">
          <a href="#about" className="text-white text-4xl hover:text-gray-300">About Me</a>
          <a href="#experience" className="text-white text-4xl hover:text-gray-300">Experience</a>
          <a href="#projects" className="text-white text-4xl hover:text-gray-300">Projects</a>
          <a href="#contact" className="text-white text-4xl hover:text-gray-300">Contact Me</a>
        </div>
      </div>
    </div>
  );
});

export default HeaderMobile;
