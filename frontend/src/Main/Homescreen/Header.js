import React, { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
  }, []);

  return (
    <div className="flex justify-between items-center p-2.5 bg-custom-gray bg-opacity-50 backdrop-blur-xl fixed w-full z-50 border-b border-custom-gray">
      <div className="text-2xl font-bold text-white mx-2 whitespace-nowrap">The Experience ♛</div>
      
      {/* Navigation links */}
      <div className={`${isMobile ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'} transition-opacity duration-300 ease-in-out md:flex flex-row hidden`}>
        <a href="#about" className="mx-5 text-white text-lg hover:text-gray-300">About Me</a>
        <a href="#experience" className="mx-5 text-white text-lg hover:text-gray-300">Experience</a>
        <a href="#projects" className="mx-5 text-white text-lg hover:text-gray-300">Projects</a>
        <a href="#contact" className="mx-5 text-white text-lg hover:text-gray-300 pr-5">Contact Me</a>
      </div>

      {/* Hamburger menu button */}
      <button 
        className={`${isMobile ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-opacity duration-300 ease-in-out md:hidden text-white text-2xl flex items-center justify-center`}
        style={{ height: '40px', width: '40px' }}  // Ensure the button has a fixed size
        onClick={toggleMenu}
      >
        {isMenuOpen
          ? <ion-icon name="close" style={{ fontSize: '30px' }}></ion-icon>
          : <ion-icon name="menu" style={{ fontSize: '30px' }}></ion-icon>
        }
      </button>

      {/* Dropdown menu */}
      <div className={`absolute top-full right-0 mt-2 py-2 w-48 rounded-lg shadow-lg bg-black bg-opacity-60 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} transition-all duration-300 ease-in-out`}>
        <div className="backdrop-blur-lg">
          <a href="#about" className="block px-4 py-2 text-md text-white hover:bg-gray-100">About Me</a>
          <a href="#experience" className="block px-4 py-2 text-md text-white hover:bg-gray-100">Experience</a>
          <a href="#projects" className="block px-4 py-2 text-md text-white hover:bg-gray-100">Projects</a>
          <a href="#contact" className="block px-4 py-2 text-md text-white hover:bg-gray-100">Contact Me</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
