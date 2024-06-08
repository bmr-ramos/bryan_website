import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeaderMobile from './HeaderMobile';
import './Header.css'; // Import the new CSS file

function Header({ isSplashScreenGone }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSplashScreenGone) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -20 }, 
        { duration: 0.5, opacity: 1, y: 0, ease: 'power2.inOut' }
      );
    }
  }, [isSplashScreenGone]);

  if (!isSplashScreenGone) {
    return null; // Don't render the header at all if the splash screen is not gone
  }

  if (isMobile) {
    return <HeaderMobile isSplashScreenGone={isSplashScreenGone} ref={headerRef} />;
  }

  return (
    <div ref={headerRef} className="fixed w-full z-50 flex justify-center items-center opacity-0">
      <div className="header-outline flex flex-col sm:flex-row justify-between items-center p-3 bg-white bg-opacity-20 backdrop-blur-3xl rounded-full shadow-2xl max-w-screen-lg w-full mx-4 mt-4">
        <div className="text-xl md:text-2xl font-bold text-white mx-2 whitespace-nowrap">The Experience ♛</div>
        
        {/* Navigation links */}
        <div className="flex flex-col sm:flex-row sm:space-x-5 items-center">
          <a href="#about" className="text-white text-lg hover:text-gray-300 my-2 sm:my-0">About Me</a>
          <a href="#experience" className="text-white text-lg hover:text-gray-300 my-2 sm:my-0">Experience</a>
          <a href="#projects" className="text-white text-lg hover:text-gray-300 my-2 sm:my-0">Projects</a>
          <a href="#contact" className="text-white text-lg hover:text-gray-300 my-2 sm:my-0 sm:pr-5">Contact Me</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
