import React from 'react';

function SmallAppIcon({ title, iconSrc, iconName, iconType, iconClassName, onClick }) {

  const iconStyle = {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    filter: 'drop-shadow(0 0 24px rgba(255, 255, 255, 1))',
  };

  return (
    <div className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105" onClick={onClick}>
      <div className={`icon-container ${iconClassName}`} style={iconStyle}>
        {iconType === 'ionicon' ? (
          <ion-icon name={iconName} style={{ fontSize: '60px', color: 'white' }}></ion-icon>
        ) : (
          <img src={iconSrc} alt={title} style={{ width: '100%', height: '100%' }} />
        )}
      </div>
      <div className="text-sm text-white font-bold">{title}</div>
    </div>
  );
}

export default SmallAppIcon;
