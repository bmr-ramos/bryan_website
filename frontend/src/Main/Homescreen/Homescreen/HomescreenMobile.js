import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import OverlayWindowMobile from '../Overlay/OverlayWindowMobile';

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

function HomescreenMobile({ showSplash, isSplashScreenGone, toggleFooterVisibility, closeFooter }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [buttonData, setButtonData] = useState([]);
  const contentRef = useRef(null);
  const iconsRef = useRef([]);

  // Ensure iconsRef is an array of correct length
  if (!iconsRef.current) {
    iconsRef.current = [];
  }

  useEffect(() => {
    if (isSplashScreenGone && contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0 }, 
        { duration: 0.5, opacity: 1, ease: 'power2.inOut' }
      );

      if (iconsRef.current.every(ref => ref)) {
        gsap.fromTo(
          iconsRef.current,
          { opacity: 0, y: 1 },
          { 
            duration: 0.5, 
            opacity: 1, 
            y: 1, 
            ease: 'power2.inOut', 
            stagger: 0.1 // Stagger animation by 0.1 seconds for each icon
          }
        );
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

  const icons = [
    { title: "About Me", iconName: "happy", iconType: "ionicon" },
    { title: "Experience", iconName: "briefcase", iconType: "ionicon" },
    { title: "Projects", iconName: "brush", iconType: "ionicon" },
    { title: "Contact", iconName: "chatbubbles", iconType: "ionicon" },
    { title: "Spotify Web Player", iconName: "musical-note", iconType: "ionicon" },
    { title: "Settings", iconName: "cog", iconType: "ionicon" },
  ];

  useEffect(() => {
    iconsRef.current.forEach((icon) => {
      if (icon) {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, { scale: 1.05, duration: 0.3, ease: 'power2.inOut' });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, { scale: 1, duration: 0.3, ease: 'power2.inOut' });
        });
      }
    });
  }, [iconsRef.current]);

  return (
    <div ref={contentRef} className="pt-16 mx-auto flex flex-col items-center justify-start min-h-screen px-4 opacity-0">
      <div className="w-full space-y-4 mt-4"> {/* Adjust mt-4 for spacing from header */}
        {icons.map((icon, index) => (
          <div
            key={index}
            ref={el => iconsRef.current[index] = el}
            className="group flex items-center p-4 backdrop-blur-2xl bg-black bg-opacity-20 rounded-lg transform transition-transform duration-300 ease-in-out"
            onClick={() => handleIconClick(icon.title)}
          >
            <ion-icon name={icon.iconName} style={{ fontSize: '40px', color: 'white' }}></ion-icon>
            <span className="ml-4 text-lg text-white">{icon.title}</span>
          </div>
        ))}
      </div>

      {selectedIcon && (
        <OverlayWindowMobile
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

export default HomescreenMobile;
