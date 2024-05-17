// GlowingLink.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const GlowingLink = ({ href, children }) => {
  const linkRef = useRef(null);

  useEffect(() => {
    const link = linkRef.current;
    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(link, {
      textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.8)',
      duration: 0.3,
      ease: 'power2.inOut'
    });

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a href={href} ref={linkRef} target="_blank" rel="noopener noreferrer" className="glow-hover">
      {children}
    </a>
  );
};

export default GlowingLink;
