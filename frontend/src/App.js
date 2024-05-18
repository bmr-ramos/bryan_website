import React, { useState, useRef, useEffect } from 'react';
import SplashScreen from './Main/Homescreen/Splashscreen/Splashscreen';
import HomeScreen from './Main/Homescreen/Homescreen/Homescreen';
import HomeScreenMobile from './Main/Homescreen/Homescreen/HomescreenMobile';
import Header from './Main/Homescreen/Header/Header';
import HeaderMobile from './Main/Homescreen/Header/HeaderMobile';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
      gsap.to(backgroundRef.current, { y: 0, duration: 0.5, ease: 'power2.inOut' });
      setTimeout(() => {
        setIsFooterVisible(false);
      }, 700);
    }
  };

  const closeFooter = () => {
    if (isContentMoved) {
      setIsContentMoved(false);
      gsap.to(backgroundRef.current, { y: 0, duration: 0.7, ease: 'bounce.out' });
      setTimeout(() => {
        setIsFooterVisible(false);
      }, 700);
    }
  };

  return (
    <>
      <div id="background-container" ref={backgroundRef}>
        {isSplashScreenGone && (isMobile 
          ? <HeaderMobile 
              isSplashScreenGone={isSplashScreenGone} 
            /> 
          : <Header 
            isSplashScreenGone={isSplashScreenGone} 
            />
        )}
        
        {isMobile
          ? <HomeScreenMobile
              showSplash={showSplash} 
              isSplashScreenGone={isSplashScreenGone} 
              toggleFooterVisibility={toggleFooterVisibility}
              closeFooter={closeFooter}
            />
          : <HomeScreen
              showSplash={showSplash} 
              isSplashScreenGone={isSplashScreenGone} 
              toggleFooterVisibility={toggleFooterVisibility}
              closeFooter={closeFooter}
            />
        }
        {showSplash && <SplashScreen onContinue={handleContinue} />}
      </div>

      <div id="blurred-background">
        {isFooterVisible && <Footer unsplashData={unsplashData} />}
      </div>
    </>
  );
}

export default App;
