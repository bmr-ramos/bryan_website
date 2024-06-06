import React from 'react';
import './Outline.css';

function SmallAppIcon({ title, iconSrc, iconName, iconType, iconClassName, onClick }) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className={`icon-gradient-border ${iconClassName}`}>
        <div className="icon-content">
          {iconType === 'ionicon' ? (
            <ion-icon name={iconName} style={{ fontSize: '60px', color: 'white' }}></ion-icon>
          ) : (
            <img src={iconSrc} alt={title} className="w-full h-full rounded-full" />
          )}
        </div>
      </div>
      <div className="text-sm text-white font-bold">{title}</div>
    </div>
  );
}

export default SmallAppIcon;
