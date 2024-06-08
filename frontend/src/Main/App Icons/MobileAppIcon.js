import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MobileAppIcon = ({ icon, index, handleIconClick }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    if (iconRef.current) {
      iconRef.current.addEventListener('mouseenter', () => {
        gsap.to(iconRef.current, { scale: 1.05, duration: 0.3, ease: 'power2.inOut' });
      });

      iconRef.current.addEventListener('mouseleave', () => {
        gsap.to(iconRef.current, { scale: 1, duration: 0.3, ease: 'power2.inOut' });
      });
    }
  }, []);

  return (
    <div
      ref={iconRef}
      className="group flex items-center p-4 bg-white bg-opacity-50 backdrop-blur-3xl rounded-lg transform transition-transform duration-300 ease-in-out"
      onClick={() => handleIconClick(icon.title)}
    >
      <ion-icon name={icon.iconName} style={{ fontSize: '40px', color: 'white' }}></ion-icon>
      <span className="ml-4 text-lg text-white">{icon.title}</span>
    </div>
  );
};

export default MobileAppIcon;
