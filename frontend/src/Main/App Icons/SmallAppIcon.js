import React from 'react';
import './AppOutline.css';

function SmallAppIcon({ title, iconSrc, iconName, iconType, iconClassName, onClick }) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className={`icon-gradient-border ${iconClassName} shadow-2xl`}>
        <div className="bg-white bg-opacity-20 backdrop-blur-3xl rounded-full p-5 flex justify-center items-center">
          {iconType === 'ionicon' ? (
            <ion-icon name={iconName} style={{ fontSize: '60px', color: 'white' }}></ion-icon>
          ) : (
            <img src={iconSrc} alt={title} className="w-full h-full rounded-full" />
          )}
        </div>
      </div>
      <div className="text-sm text-white font-bold mt-2">{title}</div>
    </div>
  );
}

export default SmallAppIcon;
