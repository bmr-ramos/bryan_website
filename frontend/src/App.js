import React, { useState, useRef, useEffect } from 'react';
import SplashScreen from './Main/Homescreen/Splashscreen';
import HomeScreen from './Main/Homescreen/Homescreen';
import Header from './Main/Homescreen/Header';
import Footer from './Main/Homescreen/Footer/Footer';
import { gsap } from 'gsap';
import './App.css';
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashScreenGone, setIsSplashScreenGone] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isContentMoved, setIsContentMoved] = useState(false);
  const [unsplashData, setUnsplashData] = useState(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:3001/random-image')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.urls.full;
        document.getElementById('blurred-background').style.backgroundImage = `url(${imageUrl})`;
        document.getElementById('background-container').style.backgroundImage = `url(${imageUrl})`;
        setUnsplashData(data);
      })
      .catch(error => console.error('Error fetching Unsplash image:', error));
  }, []);

  const handleContinue = () => {
    setShowSplash(false);
    setTimeout(() => {
      setIsSplashScreenGone(true);
    }, 500);
  };

  const toggleFooterVisibility = () => {
    if (!isContentMoved) {
      setIsFooterVisible(true);
      setIsContentMoved(true);
      gsap.to(backgroundRef.current, { y: -200, duration: 0.5, ease: 'power2.inOut' });
    } else {
      setIsContentMoved(false);
      gsap.to(backgroundRef.current, { y: 0, duration: 0.7, ease: 'bounce.out' });
      // Delay hiding the footer to ensure the animation completes
      setTimeout(() => {
        setIsFooterVisible(false);
      }, 700);
    }
  };

  const closeFooter = () => {
    if (isContentMoved) {
      setIsContentMoved(false);
      gsap.to(backgroundRef.current, { y: 0, duration: 0.7, ease: 'bounce.out' });
      // Delay hiding the footer to ensure the animation completes
      setTimeout(() => {
        setIsFooterVisible(false);
      }, 700);
    }
  };

  return (
    <>
      <div id="background-container" ref={backgroundRef}>
        <Header />
        <HomeScreen 
          showSplash={showSplash} 
          isSplashScreenGone={isSplashScreenGone} 
          toggleFooterVisibility={toggleFooterVisibility}
          closeFooter={closeFooter}
        />
        {showSplash && <SplashScreen onContinue={handleContinue} />}
      </div>

      <div id="blurred-background">
        {isFooterVisible && <Footer unsplashData={unsplashData} />}
      </div>
    </>
  );
}

export default App;
