import React from 'react';

export const aboutMeButtons = [
  { title: "Info", icon: "information-circle-outline" },
  { title: "Contact", icon: "mail-outline" },
];

function AboutMe() {
  return (
    <div className="about-me-content p-8 bg-transparent">
      <div className="profile-section mb-6">
        <img
          src=""
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h1 className="text-4xl font-bold text-center mt-4 text-white">Bryan Ramos</h1>
        <p className="text-center text-gray-300">Computer Engineer, Designer, Enterpreneur</p>
      </div>
      
      <div className="bio-section mb-8">
        <p className="text-gray-300">
          Ever since I was a kid, I was always fond of the design and principles of Windows icons, there was something about the attention to detail 
          and space that really intrigured me to have an interest on design languages.
        </p>
      </div>

      <div className="bio-section mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Areas of Strength</h2>
        <p className="text-gray-300">
          I strive on building and designing user interfaces that are both visually appealing and functional, but more importantly, create an experience where the user
          can leave wanting to come back for more. The meticulous attention to detail and the ability to create a seamless experience is what I strive for in every project.
          When it comes to development, I have a strong philosophy that you can have great, impressive, hardware, but if the software is not good, then the hardware lacks.
        </p>
      </div>

    </div>
  );
}

export default AboutMe;
