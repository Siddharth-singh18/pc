import React, { useEffect, useRef } from "react";

function Particle({ variant = "default" }) {
  const particlesContainer = useRef(null);
  const instanceId = `particles-js-${Math.random().toString(36).substring(2, 9)}`;

  useEffect(() => {
    // Check if particles.js is loaded from CDN
    if (typeof window.particlesJS === "undefined") {
      // Create a script element to load particles.js
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
      script.async = true;
      
      // Once the script is loaded, initialize particles
      script.onload = () => initializeParticles();
      
      document.body.appendChild(script);
    } else {
      // If particles.js is already loaded, initialize particles
      setTimeout(initializeParticles, 100); // Small delay to ensure DOM is ready
    }

    function initializeParticles() {
      if (typeof window.particlesJS !== "undefined" && particlesContainer.current) {
        console.log(`Initializing particles with ID: ${instanceId}, variant: ${variant}`);
        
        // Define different configurations based on variant
        let config;
        
        switch(variant) {
          case "members":
            config = {
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 800
                  }
                },
                color: {
                  value: ["#EF334C", "#d63031", "#ff7675"]
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000"
                  }
                },
                opacity: {
                  value: 0.5,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                  }
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.2,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "bubble"
                  },
                  onclick: {
                    enable: true,
                    mode: "push"
                  },
                  resize: true
                },
                modes: {
                  bubble: {
                    distance: 150,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                  },
                  push: {
                    particles_nb: 4
                  }
                }
              },
              retina_detect: true
            };
            break;
          
          case "about":
            config = {
              particles: {
                number: {
                  value: 60,
                  density: {
                    enable: true,
                    value_area: 900
                  }
                },
                color: {
                  value: ["#0984e3", "#74b9ff", "#a29bfe", "#EF334C"]
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000"
                  }
                },
                opacity: {
                  value: 0.6,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 5,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                  }
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.2,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 3,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "repulse"
                  },
                  onclick: {
                    enable: true,
                    mode: "push"
                  },
                  resize: true
                },
                modes: {
                  repulse: {
                    distance: 100,
                    duration: 0.4
                  },
                  push: {
                    particles_nb: 4
                  }
                }
              },
              retina_detect: true
            };
            break;
            
          default:
            config = {
              particles: {
                number: {
                  value: 100,
                  density: {
                    enable: true,
                    value_area: 1000
                  }
                },
                color: {
                  value: ["#EF334C", "#ff7979", "#f9ca24", "#f0932b"]
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000"
                  }
                },
                opacity: {
                  value: 0.6,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 4,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                  }
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.3,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 3,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                  }
                }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab"
                  },
                  onclick: {
                    enable: true,
                    mode: "push"
                  },
                  resize: true
                },
                modes: {
                  grab: {
                    distance: 180,
                    line_linked: {
                      opacity: 0.8
                    }
                  },
                  push: {
                    particles_nb: 6
                  }
                }
              },
              retina_detect: true
            };
        }
        
        try {
          window.particlesJS(instanceId, config);
          console.log(`Particles initialized successfully for ${instanceId}`);
        } catch (error) {
          console.error(`Error initializing particles for ${instanceId}:`, error);
        }
      }
    }

    // Cleanup function
    return () => {
      if (window.pJSDom && window.pJSDom.length > 0) {
        // Check if we have a particles instance to destroy
        try {
          // Find and destroy the correct instance
          for (let i = 0; i < window.pJSDom.length; i++) {
            if (window.pJSDom[i].pJS.canvas.el.id === instanceId) {
              console.log(`Destroying particles instance: ${instanceId}`);
              window.pJSDom[i].pJS.fn.vendors.destroypJS();
              window.pJSDom.splice(i, 1);
              break;
            }
          }
        } catch (error) {
          console.error("Error destroying particles:", error);
        }
      }
    };
  }, [variant, instanceId]);

  return (
    <div
      id={instanceId}
      ref={particlesContainer}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none" // Allow interaction with elements below
      }}
      className="particle-element"
    />
  );
}

export default Particle;

