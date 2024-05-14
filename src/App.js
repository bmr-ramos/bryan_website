import React, { useState } from 'react';
import SplashScreen from './Main/Homescreen/Splashscreen';
// import BackgroundShapes from './Main/Homescreen/BackgroundShapes';
import HomeScreen from './Main/Homescreen/Homescreen';
import Header from './Main/Homescreen/Header';
import './App.css';
import './index.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashScreenGone, setIsSplashScreenGone] = useState(false);

  const handleContinue = () => {
    setShowSplash(false);
    setTimeout(() => {
      setIsSplashScreenGone(true);
    }, 500);
  };

  return (
    <div className="App">
      {/* <BackgroundShapes /> */}
      <Header />
      <HomeScreen showSplash={showSplash} isSplashScreenGone={isSplashScreenGone} />
      {showSplash && <SplashScreen onContinue={handleContinue} />}
    </div>
  );
}

export default App;
