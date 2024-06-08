import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SmallAppIcon from '../../App Icons/SmallAppIcon';
import OverlayWindow from '../Overlay/OverlayWindow';
import HomescreenMobile from './HomescreenMobile';
import { aboutMeButtons } from '../Categories/AboutMe';
import { experienceButtons } from '../Categories/Experience';
import { projectsButtons } from '../Categories/Projects';

function AppIconAnimation({ showSplash, isSplashScreenGone, toggleFooterVisibility, closeFooter }) {
  const contentRef = useRef(null);
  const iconsRef = useRef([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [buttonData, setButtonData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
    if (isSplashScreenGone && !isMobile) {
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
    }
  }, [isSplashScreenGone, isMobile]);

  const handleIconClick = (icon, index) => {
    closeFooter(); // Close the footer if it's visible

    // Animate nearby icons
    iconsRef.current.forEach((el, i) => {
      if (i !== index) {
        gsap.to(el, {
          opacity: 0,
          scale: 0.8,
          filter: 'blur(10px)',
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }
    });

    // Delay setting the selected icon to ensure the animation is visible
    setTimeout(() => {
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
    }, 500); // 500ms delay to match the duration of the icon animation
  };

  const handleClose = () => {
    setSelectedIcon(null);
    setButtonData([]);
    gsap.to(iconsRef.current, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power2.inOut',
    });
  };

  if (isMobile) {
    return <HomescreenMobile showSplash={showSplash} isSplashScreenGone={isSplashScreenGone} toggleFooterVisibility={toggleFooterVisibility} closeFooter={closeFooter} />;
  }

  return (
    <div ref={contentRef} className="pt-16 mx-auto opacity-0 flex flex-col items-center justify-center min-h-screen">
      <div className="home-content grid grid-cols-2 md:grid-cols-4 gap-10">
        {['About Me', 'Experience', 'Projects', 'Contact', 'Spotify Web Player', 'Settings'].map((title, index) => (
          <div key={index} ref={(el) => (iconsRef.current[index] = el)}>
            <SmallAppIcon
              title={title}
              iconName={title === 'About Me' ? 'happy' : title === 'Experience' ? 'briefcase' : title === 'Projects' ? 'brush' : title === 'Contact' ? 'chatbubbles' : title === 'Spotify Web Player' ? 'musical-note' : 'cog'}
              iconType="ionicon"
              onClick={() => handleIconClick(title, index)}
            />
          </div>
        ))}
      </div>

      {selectedIcon && (
        <OverlayWindow
          title={selectedIcon}
          buttonData={buttonData}
          onClose={handleClose}
        />
      )}

      <button 
        className="fixed bottom-4 right-4 w-12 h-12 text-white rounded-full flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-3xl z-2"
        onClick={toggleFooterVisibility}
      >
        <ion-icon name="diamond-outline" style={{ fontSize: '24px', color: 'white' }}></ion-icon>
      </button>
    </div>
  );
}

export default AppIconAnimation;
