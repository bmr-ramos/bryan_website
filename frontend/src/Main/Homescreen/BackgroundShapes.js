import React, { useEffect, useRef } from 'react';

function BackgroundShapes() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Handle High DPI displays by scaling canvas
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width * dpr;
    const height = rect.height * dpr;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    ctx.scale(dpr, dpr);  // Scale the context to counter the canvas size increase

    let animationFrameId;

    // Function to generate random colors
    function getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.8)`;  // Semi-transparent color
    }

    class Circle {
      constructor(x, y, radius, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 25;  // Adjust blur radius for the bubble effect
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.radius > rect.width || this.x - this.radius < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y + this.radius > rect.height || this.y - this.radius < 0) {
          this.speedY = -this.speedY;
        }

        this.draw();
      }
    }

    const circles = [];
    for (let i = 0; i < 50; i++) { 
      const radius = Math.random() * 30 + 5; 
      const x = Math.random() * (rect.width - radius * 2) + radius;
      const y = Math.random() * (rect.height - radius * 2) + radius;
      const color = getRandomColor();  // Get a random color for each circle
      const speedMultiplier = 0.5;  // Adjust this value to control the speed of the circles
      const speedX = (Math.random() - 0.5) * 1.0 * speedMultiplier;
      const speedY = (Math.random() - 0.5) * 1.0 * speedMultiplier;

      circles.push(new Circle(x, y, radius, speedX, speedY, color));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowOffsetX = 0;  // Reset shadow offsets to prevent undesired effects
      ctx.shadowOffsetY = 0;
      circles.forEach(circle => circle.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
}

export default BackgroundShapes;
