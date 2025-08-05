import { useEffect } from 'react';

const ParticleBackground = () => {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position across screen width
      particle.style.left = Math.random() * 100 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 8 + 's';
      
      // Random size variation
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random opacity
      particle.style.opacity = (Math.random() * 0.1 + 0.05).toString();
      
      const container = document.querySelector('.particles');
      if (container) {
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 8000);
      }
    };

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createParticle(), i * 100);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="particles"></div>;
};

export default ParticleBackground;