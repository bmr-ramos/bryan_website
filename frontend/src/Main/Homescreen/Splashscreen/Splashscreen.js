import React, { useState, useEffect } from 'react';

function SplashScreen({ onContinue }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleContinue = () => {
    setFadeOut(true); // Starts the visual fade-out
    setTimeout(() => {
      onContinue(); // Called after fade-out completes
    }, 500); // This should match the transition-opacity duration
  };

  return (
    <div 
      className={`splash-container fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-lg flex justify-center items-center z-1000 transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      onClick={handleContinue}
    >
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to The Experience</h1>
        <button 
          onClick={handleContinue}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Let's Begin!
        </button>
      </div>
    </div>
  );
}

export default SplashScreen;
