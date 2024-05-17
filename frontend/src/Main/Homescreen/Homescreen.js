import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SmallAppIcon from '../App Icons/SmallAppIcon';
import OverlayWindow from './Overlay/OverlayWindow';

const aboutMeButtons = [
  { title: "Info", icon: "information-circle-outline" },
  { title: "Contact", icon: "mail-outline" },
];

const experienceButtons = [
  { title: "Jobs", icon: "briefcase-outline" },
  { title: "Skills", icon: "build-outline" },
  { title: "Education", icon: "school-outline" }
];

const projectsButtons = [
  { title: "Project 1", icon: "code-outline" },
  { title: "Project 2", icon: "rocket-outline" },
  { title: "Project 3", icon: "bug-outline" }
];

function Homescreen({ showSplash, isSplashScreenGone, toggleFooterVisibility, closeFooter }) {
  const contentRef = useRef(null);
  const iconsRef = useRef([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [buttonData, setButtonData] = useState([]);
  const [unsplashData, setUnsplashData] = useState(null);

  useEffect(() => {
    if (isSplashScreenGone) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0 }, 
        { duration: 0.5, opacity: 1, ease: 'power2.inOut' }
      );

      gsap.fromTo(
        iconsRef.current,
        { opacity: 0, y: 20 },
        { 
          duration: 0.5, 
          opacity: 1, 
          y: 0, 
          ease: 'power2.inOut', 
          stagger: 0.1 // Stagger animation by 0.1 seconds for each icon
        }
      );

      if (window.unsplashData) {
        setUnsplashData(window.unsplashData);
      }
    }
  }, [isSplashScreenGone]);

  const handleIconClick = (icon) => {
    closeFooter(); // Close the footer if it's visible
    setSelectedIcon(icon);

    // Set button data based on the selected icon
    switch (icon) {
      case 'About Me':
        setButtonData(aboutMeButtons);
        break;
      case 'Experience':
        setButtonData(experienceButtons);
        break;
      case 'Projects':
        setButtonData(projectsButtons);
        break;
      default:
        setButtonData([]);
    }
  };

  const handleClose = () => {
    setSelectedIcon(null);
    setButtonData([]);
  };

  return (
    <div ref={contentRef} className="pt-16 mx-auto opacity-0 flex flex-col items-center justify-center min-h-screen">
      <div className="home-content grid grid-cols-2 md:grid-cols-4 gap-10">
        <div ref={(el) => (iconsRef.current[0] = el)}>
          <SmallAppIcon title="About Me" iconName="happy" iconType="ionicon" onClick={() => handleIconClick('About Me')} />
        </div>
        <div ref={(el) => (iconsRef.current[1] = el)}>
          <SmallAppIcon title="Experience" iconName="briefcase" iconType="ionicon" onClick={() => handleIconClick('Experience')} />
        </div>
        <div ref={(el) => (iconsRef.current[2] = el)}>
          <SmallAppIcon title="Projects" iconName="brush" iconType="ionicon" onClick={() => handleIconClick('Projects')} />
        </div>
        <div ref={(el) => (iconsRef.current[3] = el)}>
          <SmallAppIcon title="Contact" iconName="chatbubbles" iconType="ionicon" onClick={() => handleIconClick('Contact')} />
        </div>
        <div ref={(el) => (iconsRef.current[4] = el)}>
          <SmallAppIcon title="Spotify Web Player" iconName="musical-note" iconType="ionicon" onClick={() => handleIconClick('Contact')} />
        </div>
        <div ref={(el) => (iconsRef.current[5] = el)}>
          <SmallAppIcon title="Settings" iconName="cog" iconType="ionicon" onClick={() => handleIconClick('Settings')} />
        </div>
      </div>

      {selectedIcon && (
        <OverlayWindow
          title={selectedIcon}
          buttonData={buttonData}
          onClose={handleClose}
        />
      )}

      <button 
        className="fixed bottom-4 right-4 w-12 h-12 text-white rounded-full flex items-center justify-center bg-custom-gray bg-opacity-50 backdrop-blur-3xl z-2"
        onClick={toggleFooterVisibility}
      >
        <ion-icon name="diamond-outline" style={{ fontSize: '24px', color: 'white' }}></ion-icon>
      </button>
    </div>
  );
}

export default Homescreen;
