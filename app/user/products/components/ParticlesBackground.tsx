"use client";

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    particlesJS: any;
    pJSDom: any[];
  }
}

interface ParticlesBackgroundProps {
  containerId?: string;
}

export default function ParticlesBackground({ containerId = 'particles-js' }: ParticlesBackgroundProps) {
  useEffect(() => {
    // Initialize particles if script is already loaded
    if (window.particlesJS) {
      const timer = setTimeout(initParticles, 100);
      return () => clearTimeout(timer);
    }

    // Cleanup function to destroy particles when component unmounts
    return () => {
      if (window.pJSDom && window.pJSDom.length > 0) {
        const existingIndex = window.pJSDom.findIndex(pjs => pjs?.pJS?.canvas?.el?.id === containerId);
        if (existingIndex !== -1) {
          window.pJSDom[existingIndex].pJS.fn.vendors.destroypJS();
          window.pJSDom.splice(existingIndex, 1);
        }
      }
    };
  }, [containerId]);

  const initParticles = () => {
    if (window.particlesJS) {
      // Clear any existing particles for this specific container
      if (window.pJSDom && window.pJSDom.length > 0) {
        const existingIndex = window.pJSDom.findIndex(pjs => pjs.pJS.canvas.el.id === containerId);
        if (existingIndex !== -1) {
          window.pJSDom[existingIndex].pJS.fn.vendors.destroypJS();
          window.pJSDom.splice(existingIndex, 1);
        }
      }
      
      window.particlesJS(containerId, {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      });
    }
  };

  return (
    <>
      <Script 
        src="/particles.min.js" 
        onLoad={initParticles}
        strategy="afterInteractive"
      />
      <div 
        id={containerId}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 1 }}
      />
    </>
  );
}