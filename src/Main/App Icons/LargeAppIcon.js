import React from 'react';

function LargeAppIcon({ title, link }) {
  return (
    <div className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105">
      <div 
        className="bg-black bg-opacity-30 mb-2 backdrop-blur-2xl"
        style={{ 
          width: '100%',
          height: '300px',
          borderRadius: '26px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }} 
      >
        {/* Icon Image Here */}
      </div>
      <div className="text-sm text-white font-bold">{title}</div>
    </div>
  );
}

export default LargeAppIcon;