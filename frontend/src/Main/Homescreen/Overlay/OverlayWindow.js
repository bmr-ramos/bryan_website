import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import OverlayToolbar from './OverlayToolbar';
import useOverlayAnimations from './useOverlayAnimations';

import AboutMe from '../Categories/AboutMe';
import Experience from '../Categories/Experience';
import Projects from '../Categories/Projects';

function OverlayWindow({ title, onClose, buttonData }) {
  const overlayRef = useRef(null);
  const backgroundRef = useRef(null);
  const toolbarRef = useRef(null);
  const buttonRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (overlayRef.current && backgroundRef.current && hamburgerButtonRef.current) {
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
        hamburgerButtonRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.inOut', delay: 0.2 }
      );
    }
  }, []);

  const { handleClose: handleOverlayClose, handleMaximize, iconRef } = useOverlayAnimations(
    backgroundRef,
    overlayRef,
    toolbarRef,
    hamburgerButtonRef,
    isMobile,
    onClose,
    setIsMaximized
  );

  const renderContent = () => {
    switch (title) {
      case 'About Me':
        return <AboutMe />;
      case 'Experience':
        return <Experience />;
      case 'Projects':
        return <Projects />;
      default:
        return <div>Content not found</div>;
    }
  };

  const containerClassNames = `bg-white bg-opacity-20 backdrop-blur-3xl shadow-lg ${
    isMaximized ? 'w-full h-full' : 'w-11/12 h-5/6 rounded-lg'
  } flex flex-col overflow-auto relative p-8`;

  return (
    <div>
      <div ref={backgroundRef} className="fixed inset-0 bg-black bg-opacity-60 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {!isMobile && (
          <OverlayToolbar ref={toolbarRef} buttonData={buttonData} />
        )}
        <div ref={overlayRef} className={containerClassNames}>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              ref={buttonRef}
              onClick={() => handleMaximize(isMaximized, setIsMaximized, buttonRef)}
              className="w-12 h-12 bg-white bg-opacity-15 backdrop-blur-md rounded-full flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ion-icon
                ref={iconRef}
                name={isMaximized ? 'remove' : 'add'}
                style={{ fontSize: '28px', color: 'white' }}
              ></ion-icon>
            </button>

            <button
              onClick={handleOverlayClose}
              className="w-12 h-12 bg-white bg-opacity-15 backdrop-blur-md rounded-full flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ion-icon
                name="close"
                style={{ fontSize: '28px', color: 'white' }}
              ></ion-icon>
            </button>

          </div>
          <div style={{ height: '50px' }}></div>
          <h2 className="text-4xl font-bold mb-8 text-white text-left">{title}</h2>
          <div className="overflow-y-auto p-4 flex-grow">{renderContent()}</div>
        </div>
      </div>
      {isMobile && (
        <button
          ref={hamburgerButtonRef}
          className="fixed bottom-4 right-4 w-10 h-10 bg-white bg-opacity-50 backdrop-blur-3xl rounded-full flex items-center justify-center text-white z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <ion-icon name="close" style={{ fontSize: '24px', color: 'white' }}></ion-icon>
          ) : (
            <ion-icon name="menu" style={{ fontSize: '24px', color: 'white' }}></ion-icon>
          )}
        </button>
      )}
    </div>
  );
}

export default OverlayWindow;
