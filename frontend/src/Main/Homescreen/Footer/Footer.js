import React from 'react';
import './Footer.css';
import GlowingLink from './GlowingLink';

function Footer({ unsplashData }) {
  return (
    <div
      id="footer"
      className="fixed bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-xl text-white z-40"
      style={{ height: '100vh' }}
    >
      <div
        className="absolute bottom-0 left-0 w-full p-6 flex justify-center items-center"
        style={{ height: '200px' }}
      >
        <div className="text-center space-y-4">
          <p className="text-md font-semibold footer-title">Built from scratch, made with passion, powered with love.</p>
          <p className="text-sm footer-text">
            Designed in <GlowingLink href="https://www.figma.com/">Figma</GlowingLink> and brought to life in <GlowingLink href="https://code.visualstudio.com/">Visual Studio Code</GlowingLink>. Powered by <GlowingLink href="https://reactjs.org/">React.js</GlowingLink>, <GlowingLink href="https://tailwindcss.com/">Tailwind CSS</GlowingLink>, <GlowingLink href="https://greensock.com/gsap/">GSAP</GlowingLink>, and deployed using <GlowingLink href="https://www.vercel.com/">Vercel</GlowingLink>.
          </p>
          {unsplashData ? (
            <p className="text-sm footer-text">
              Photo by <GlowingLink href={`${unsplashData.user.links.html}?utm_source=your_app_name&utm_medium=referral`}>{unsplashData.user.name}</GlowingLink> on <GlowingLink href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">Unsplash</GlowingLink>
            </p>
          ) : (
            <p className="text-sm footer-text">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
