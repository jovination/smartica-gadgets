class ParticleSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.config = {
        particleCount: 100,
        colors: ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"],
        particleSize: 2,
        lineColor: "#ffffff",
        lineOpacity: 0.4,
        lineWidth: 1,
        linkDistance: 120,
        mouseRadius: 140,
        particleOpacity: 0.6
      };
      
      this.mouse = {
        x: null,
        y: null,
        radius: this.config.mouseRadius
      };
      
      this.init();
      this.animate();
      this.setupEventListeners();
    }
    
    init() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      
      // Create particles
      for(let i = 0; i < this.config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * this.config.particleSize + 1,
          color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2
        });
      }
    }
    
    setupEventListeners() {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });
      
      window.addEventListener('resize', () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init();
      });
      
      window.addEventListener('mouseout', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
    
    drawParticle(particle) {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = this.config.particleOpacity;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
    
    drawLines(particle1, particle2) {
      const dx = particle1.x - particle2.x;
      const dy = particle1.y - particle2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.config.linkDistance) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.config.lineColor;
        this.ctx.globalAlpha = this.config.lineOpacity;
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.moveTo(particle1.x, particle1.y);
        this.ctx.lineTo(particle2.x, particle2.y);
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
      }
    }
    
    update() {
      for(let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        
        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;
        
        // Bounce off walls
        if(particle.x < 0 || particle.x > this.canvas.width) particle.dx = -particle.dx;
        if(particle.y < 0 || particle.y > this.canvas.height) particle.dy = -particle.dy;
        
        // Draw connections
        for(let j = i + 1; j < this.particles.length; j++) {
          this.drawLines(particle, this.particles[j]);
        }
        
        // Mouse interaction
        if(this.mouse.x !== null) {
          const dx = particle.x - this.mouse.x;
          const dy = particle.y - this.mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if(distance < this.mouse.radius) {
            const angle = Math.atan2(dy, dx);
            particle.x = this.mouse.x + Math.cos(angle) * this.mouse.radius;
            particle.y = this.mouse.y + Math.sin(angle) * this.mouse.radius;
          }
        }
        
        this.drawParticle(particle);
      }
    }
    
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.update();
      requestAnimationFrame(this.animate.bind(this));
    }
  }
  
  // Usage
  window.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particles-js');
  });