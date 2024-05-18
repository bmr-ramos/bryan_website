import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Header({ isSplashScreenGone }) {
  const headerRef = useRef(null);

  useEffect(() => {
    if (isSplashScreenGone) {
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: -20 }, 
        { duration: 0.5, opacity: 1, y: 0, ease: 'power2.inOut' }
      );
    }
  }, [isSplashScreenGone]);

  if (!isSplashScreenGone) {
    return null; // Don't render the header if the splash screen is not gone
  }

  return (
    <div ref={headerRef} className="fixed w-full z-50 flex justify-center items-center opacity-0">
      <div className="flex flex-col sm:flex-row justify-between items-center p-3 bg-custom-gray bg-opacity-50 backdrop-blur-xl rounded-full shadow-lg max-w-screen-lg w-full mx-4 mt-4">
        <div className="text-xl md:text-2xl font-bold text-white mx-2 whitespace-nowrap">The Experience ♛</div>
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
