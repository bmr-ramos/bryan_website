import React from 'react';

export const experienceButtons = [
  { title: "Jobs", icon: "briefcase-outline" },
  { title: "Skills", icon: "build-outline" },
  { title: "Education", icon: "school-outline" }
];

function Experience() {
  return (
    <div className="experience-content p-8 bg-transparent">
      <h2 className="text-4xl font-bold text-white">Experience</h2>
      {/* Add your experience content here */}
    </div>
  );
}

export default Experience;
