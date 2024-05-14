import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SmallAppIcon from '../App Icons/SmallAppIcon';
import LargeAppIcon from '../App Icons/LargeAppIcon';

import AboutMe from './Categories/AboutMe';
import Experience from './Categories/Experience';
import Projects from './Categories/Projects';
import Contact from './Categories/Contact';
import GlassyWindow from './OverlayWindow';


function Homescreen({ showSplash, isSplashScreenGone }) {
  const contentRef = useRef(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    if (isSplashScreenGone) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0 }, 
        { duration: 0.5, opacity: 1, ease: 'power2.inOut' }
      );
    }
  }, [isSplashScreenGone]);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleClose = () => {
    setSelectedIcon(null);
  };

  return (
    <div ref={contentRef} className="pt-16 mx-auto opacity-0">
      <div className="home-content p-4 max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        <SmallAppIcon title="About Me" iconName="happy" iconType="ionicon" onClick={() => handleIconClick('About Me')} />
        <SmallAppIcon title="Experience" iconName="briefcase" iconType="ionicon" onClick={() => handleIconClick('Experience')} />
        <SmallAppIcon title="Projects" iconName="brush" iconType="ionicon" onClick={() => handleIconClick('Projects')} />
        <SmallAppIcon title="Contact" iconName="chatbubbles" iconType="ionicon" onClick={() => handleIconClick('Contact')} />
      </div>

      {/* Sections for each category */}
      <div className="mt-1">
        <AboutMe />
        <Experience />
        <Projects />
        <Contact />
      </div>

      {/* <div className="mt-10">
        <div className="px-4 sm:px-6 md:px-8">
          <MediumAppIcon title="Gallery" link="/gallery" />
        </div>
      </div> */}
      <div className="mt-10">
        <div className="px-4 sm:px-6 md:px-8">
          <LargeAppIcon title="Countdown" />
        </div>
      </div>

      {selectedIcon && (
        <GlassyWindow
          title={selectedIcon}
          content={`Content for ${selectedIcon}`}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default Homescreen;
