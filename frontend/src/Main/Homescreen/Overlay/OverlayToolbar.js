import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './OutlineToolbar.css'; // Import the new CSS file

const OverlayToolbar = forwardRef(({ buttonData }, ref) => {
  const buttonCount = buttonData.length;
  const buttonHeight = 52; // Height for each button including spacing
  const toolbarHeight = buttonCount * buttonHeight;
  const [isHovered, setIsHovered] = useState(false);
  const titlesRef = useRef([]);

  useEffect(() => {
    if (isHovered) {
      gsap.to(titlesRef.current, {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    } else {
      gsap.to(titlesRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.2,
        ease: 'power2.inOut'
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={ref}
      className={`overlay-toolbar-outline absolute left-2 top-1/2 transform -translate-y-1/2 ${
        isHovered ? 'w-40' : 'w-14'
      } bg-white bg-opacity-20 backdrop-blur-3xl flex flex-col justify-center items-start p-2 z-40 transition-all duration-300 shadow-lg`} // Added shadow class
      style={{ height: `${toolbarHeight}px`, borderRadius: '32px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {buttonData.map((button, index) => (
        <div className="flex items-center w-full mb-2" key={index}>
          <button className="flex items-center justify-center w-10 h-10">
            <ion-icon name={button.icon} style={{ fontSize: '24px', color: 'white' }}></ion-icon>
          </button>
          <span
            className="ml-2 text-white"
            ref={el => (titlesRef.current[index] = el)}
            style={{ opacity: 0, transform: 'translateX(-10px)', position: 'absolute', left: '40px' }} // Ensure the text does not affect icon positioning
          >
            {button.title}
          </span>
        </div>
      ))}
    </div>
  );
});

export default OverlayToolbar;
