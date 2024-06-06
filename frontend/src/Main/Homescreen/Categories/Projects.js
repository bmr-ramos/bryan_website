// Projects.js
import React from 'react';

export const projectsButtons = [
  { title: "Project 1", icon: "code-outline" },
  { title: "Project 2", icon: "rocket-outline" },
  { title: "Project 3", icon: "bug-outline" }
];

function Projects() {
  return (
    <div className="projects-content p-8 bg-transparent">
      <h2 className="text-4xl font-bold text-white">Projects</h2>
      {/* Add your projects content here */}
    </div>
  );
}

export default Projects;
