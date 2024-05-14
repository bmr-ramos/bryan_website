import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function OverlayWindow({ title, onClose }) {
  const overlayRef = useRef(null);
  const backgroundRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Prevent background scrolling when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    gsap.fromTo(
      backgroundRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      overlayRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: onClose,
    });
    gsap.to(backgroundRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    });
  };

  const handleMaximize = () => {
    const newMaximizedState = !isMaximized;
    gsap.to(overlayRef.current, {
      width: newMaximizedState ? '100%' : '92%',
      height: newMaximizedState ? '100%' : '83.333%',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => setIsMaximized(newMaximizedState),
    });
  };

  const containerClassNames = `bg-custom-gray bg-opacity-50 backdrop-blur-3xl rounded-lg shadow-lg ${
    isMaximized ? 'w-full h-full' : 'w-11/12 h-5/6'
  } flex flex-col overflow-auto relative p-8`;

  return (
    <div>
      <div ref={backgroundRef} className="fixed inset-0 bg-black bg-opacity-100 z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div ref={overlayRef} className={containerClassNames}>
          <div className="absolute top-4 left-4 flex space-x-2">
            <button
              onClick={handleClose}
              className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered && <ion-icon name="close" className="text-white text-xs"></ion-icon>}
            </button>
            <button
              onClick={handleMaximize}
              className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered && <ion-icon name="add" className="text-white text-xs"></ion-icon>}
            </button>
          </div>
          <h2 className="text-4xl font-bold mb-8 text-white text-center">{title}</h2>
          <div className="overflow-y-auto p-4 flex-grow">
            {/* Add your scrollable content here */}
            <p className="text-white">Your content goes here...</p>
            {/* Example content to demonstrate scrolling */}
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum,
              nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
              congue eget, auctor vitae massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
              Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum
              lacinia arcu eget nulla.
            </p>
            <p className="text-white">
              Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
              sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In
              scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas
              porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula
              lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.
              Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
              per inceptos himenaeos.
            </p>
            {/* Add more content to test scrolling */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverlayWindow;
