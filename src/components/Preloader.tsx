
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";

// Declarar VANTA como global
declare global {
  interface Window {
    VANTA: any;
  }
}

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'waiting' | 'dropping' | 'expanding' | 'texts' | 'fading'>('waiting');
  const [currentText, setCurrentText] = useState(0);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [pagePreloaded, setPagePreloaded] = useState(false);
  
  const audioRef = useRef<{
    synths: Tone.Synth[];
    reverb: Tone.Reverb | null;
    gain: Tone.Gain | null;
  }>({ synths: [], reverb: null, gain: null });
  
  const timeoutRefs = useRef<Set<NodeJS.Timeout>>(new Set());
  const vantaRef = useRef<any>(null);
  const vantaContainerRef = useRef<HTMLDivElement>(null);
  
  // Detectar si es dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Helper function para manejar timeouts de forma segura
  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(() => {
      timeoutRefs.current.delete(timeoutId);
      callback();
    }, delay);
    timeoutRefs.current.add(timeoutId);
    return timeoutId;
  };
  
  // Inicializar Vanta Halo
  const initVantaHalo = () => {
    if (window.VANTA && vantaContainerRef.current && !vantaRef.current) {
      try {
        vantaRef.current = window.VANTA.HALO({
          el: vantaContainerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          baseColor: 0xe61b1b,
          backgroundColor: 0x0
        });
        console.log("Vanta Halo initialized");
      } catch (error) {
        console.error("Error initializing Vanta Halo:", error);
      }
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Limpiar todos los timeouts pendientes
      timeoutRefs.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      timeoutRefs.current.clear();
      
      // Limpiar audio
      if (audioRef.current.synths) {
        audioRef.current.synths.forEach(synth => {
          try {
            synth.dispose();
          } catch (error) {
            console.error("Error disposing synth:", error);
          }
        });
      }
      
      // Limpiar Vanta
      if (vantaRef.current) {
        try {
          vantaRef.current.destroy();
          vantaRef.current = null;
        } catch (error) {
          console.error("Error destroying Vanta:", error);
        }
      }
    };
  }, []);
  
  // Inicializar Vanta cuando el componente se monte
  useEffect(() => {
    const timer = setTimeout(() => {
      initVantaHalo();
    }, 100); // Pequeño delay para asegurar que el DOM esté listo
    
    return () => clearTimeout(timer);
  }, []);
  
  const texts = [
    "Felipe Hincapié Murillo,\nComunicador Audiovisual.",
    "Con la creatividad como materia prima,\nconstruyo contenido que impacta y conecta.",
    "Felipe Hincapié Murillo",
    "un creador de posibilidades"
  ];

  const notes = ["C4", "E4", "G4"]; // Solo 3 notas para el acorde
  
  const textFonts = [
    "font-['Courier_Prime']", // Fuente 1: Monospace clásica
    "font-['Inter']", // Fuente 2: Sans-serif limpia
    "font-['Playfair_Display']", // Fuente 3: Serif elegante
    "font-['Space_Grotesk']" // Fuente 4: Modern sans-serif
  ];

  const setupAudio = async () => {
    try {
      // Timeout de seguridad para audio en móviles
      const audioTimeout = setTimeout(() => {
        console.log("Audio initialization timeout, continuing without audio");
        setAudioInitialized(true);
      }, isMobile ? 2000 : 3000); // Menos tiempo en móviles

      await Tone.start();
      
      // 3 synths para marimba + efectos espaciales
      const synths = notes.map(() => 
        new Tone.Synth({ 
          oscillator: { 
            type: "triangle"
          }, 
          envelope: { 
            attack: 0.001, 
            decay: 1.5, 
            sustain: 0.1, 
            release: 2.5 
          } 
        })
      );

      const gain = new Tone.Gain(1.0); // Subir volumen de 4 a 10 (0.4 a 1.0)
      const reverb = new Tone.Reverb({ decay: 8, wet: 0.8 }); // Más reverb espacial
      const delay = new Tone.PingPongDelay("8n", 0.2); // Delay para efecto espacial
      
      synths.forEach(synth => {
        synth.connect(gain);
      });
      
      gain.connect(delay);
      delay.connect(reverb);
      reverb.toDestination();
      
      audioRef.current = { synths, reverb, gain };
      clearTimeout(audioTimeout);
      setAudioInitialized(true);
      console.log("Audio initialized successfully");
    } catch (error) {
      console.error("Error initializing audio:", error);
      setAudioInitialized(true); // Continue even if audio fails
    }
  };

  const playNoteWithFadeOut = (noteIndex: number, duration: number) => {
    if (audioRef.current.synths[noteIndex] && audioInitialized) {
      try {
        // Tocar la nota con duración específica y fade out
        audioRef.current.synths[noteIndex].triggerAttackRelease(notes[noteIndex], duration);
        console.log(`Playing note: ${notes[noteIndex]} for ${duration}`);
      } catch (error) {
        console.error("Error playing note:", error);
      }
    }
  };

  const stopAllNotes = () => {
    if (audioRef.current.synths && audioInitialized) {
      try {
        audioRef.current.synths.forEach(synth => {
          synth.triggerRelease();
        });
        console.log("All notes stopped");
      } catch (error) {
        console.error("Error stopping notes:", error);
      }
    }
  };

  const preloadPageAssets = async () => {
    try {
      // Timeout de seguridad para precarga
      const preloadTimeout = setTimeout(() => {
        console.log("Preload timeout reached, continuing anyway");
        setPagePreloaded(true);
      }, isMobile ? 3000 : 4000); // Menos tiempo en móviles

      // Precargar imágenes críticas
      const imagePromises = [
        "/lovable-uploads/8535bbb6-e6a8-4ec6-b0d3-aeee6c93c655.png",
        "/favicon.ico"
      ].map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if some images fail
          img.src = src;
          // Timeout individual para cada imagen
          setTimeout(resolve, 2000);
        });
      });

      await Promise.all(imagePromises);
      
      // Simular carga de componentes React
      await new Promise(resolve => setTimeout(resolve, 500));
      
      clearTimeout(preloadTimeout);
      setPagePreloaded(true);
      console.log("Page assets preloaded");
    } catch (error) {
      console.log("Some assets failed to load, continuing anyway");
      setPagePreloaded(true);
    }
  };

  const handleStartClick = async () => {
    console.log("Preloader started");
    
    // En móviles, intentar inicializar audio pero continuar sin él si falla
    if (!audioInitialized) {
      if (isMobile) {
        // En móviles, dar menos tiempo para el audio
        const mobileAudioTimeout = setTimeout(() => {
          console.log("Mobile audio timeout, continuing without audio");
          setAudioInitialized(true);
        }, 1500);
        
        try {
          await setupAudio();
          clearTimeout(mobileAudioTimeout);
        } catch (error) {
          console.log("Mobile audio failed, continuing without audio");
          clearTimeout(mobileAudioTimeout);
          setAudioInitialized(true);
        }
      } else {
        // En desktop, dar más tiempo pero con timeout de seguridad
        const desktopAudioTimeout = setTimeout(() => {
          console.log("Desktop audio timeout, continuing without audio");
          setAudioInitialized(true);
        }, 4000);
        
        try {
          await setupAudio();
          clearTimeout(desktopAudioTimeout);
        } catch (error) {
          console.log("Desktop audio failed, continuing without audio");
          clearTimeout(desktopAudioTimeout);
          setAudioInitialized(true);
        }
      }
    }
    
    // Iniciar precarga de la página
    preloadPageAssets();
    setPhase('dropping');
  };

  useEffect(() => {
    if (phase === 'dropping') {
      // Después de la animación de gota, expandir a blanco
      safeSetTimeout(() => {
        setPhase('expanding');
      }, 1000);
    }
    
    if (phase === 'expanding') {
      // Después de expandir, empezar los textos
      safeSetTimeout(() => {
        setPhase('texts');
        setCurrentText(1);
      }, 800);
    }
    
    if (phase === 'texts') {
      const beatDuration = 3000; // 40 BPM - 3 segundos por texto
      const noteDuration = 2.5; // Duración de cada nota individual
      const chordDuration = 3.5; // Duración del acorde final (más largo)
      
      // Texto 1 + Golpe 1: Solo C4 (tun)
      safeSetTimeout(() => {
        if (audioInitialized) playNoteWithFadeOut(0, noteDuration); // C4
      }, 500);

      // Texto 2 + Golpe 2: Solo E4 (tun)
      safeSetTimeout(() => {
        setCurrentText(2);
        if (audioInitialized) playNoteWithFadeOut(1, noteDuration); // E4
      }, 500 + beatDuration);

      // Texto 3 + Golpe 3: Solo G4 (tun)
      safeSetTimeout(() => {
        setCurrentText(3);
        if (audioInitialized) playNoteWithFadeOut(2, noteDuration); // G4
      }, 500 + (beatDuration * 2));

      // Texto 4 + Golpe 4: ACORDE COMPLETO (C4 + E4 + G4) - ¡ESPACIAL!
      safeSetTimeout(() => {
        setCurrentText(4);
        if (audioInitialized) {
          // Tocar las 3 notas juntas para el acorde final espacial
          playNoteWithFadeOut(0, chordDuration); // C4
          playNoteWithFadeOut(1, chordDuration); // E4
          playNoteWithFadeOut(2, chordDuration); // G4
        }
      }, 500 + (beatDuration * 3));

      // Fade out - esperar a que la página esté precargada
      safeSetTimeout(() => {
        setPhase('fading');
        
        // Timeout de seguridad para evitar bucles infinitos
        const safetyTimeout = safeSetTimeout(() => {
          console.log("Safety timeout reached, completing preloader");
          onComplete();
        }, isMobile ? 3000 : 5000); // Menos tiempo en móviles
        
        // Esperar a que la página esté lista antes de completar
        const waitForPageLoad = () => {
          if (pagePreloaded) {
            clearTimeout(safetyTimeout);
            safeSetTimeout(() => {
              onComplete();
            }, 800); // Reducido de 1500 a 800 para transición más fluida
          } else {
            safeSetTimeout(waitForPageLoad, 100); // Revisar cada 100ms
          }
        };
        
        waitForPageLoad();
      }, 500 + (beatDuration * 4));
    }
  }, [phase, audioInitialized, pagePreloaded]);

  if (phase === 'waiting') {
  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer" onClick={handleStartClick}>
        {/* Contenedor para Vanta Halo */}
        <div 
          ref={vantaContainerRef}
          className="absolute inset-0"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center relative z-10"
        >
          <h1 className="text-white text-lg md:text-2xl font-montserrat font-light mb-4">
            Clickéame para empezar la experiencia
          </h1>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-4 bg-white rounded-full mx-auto"
          />
        </motion.div>
      </div>
    );
  }

  if (phase === 'dropping') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <motion.div
          initial={{ y: -100, scale: 0.1, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-8 h-8 bg-white rounded-full"
        />
      </div>
    );
  }

  if (phase === 'expanding') {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ backgroundColor: "rgb(0, 0, 0)" }}
        animate={{ backgroundColor: "rgb(255, 255, 255)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
          <motion.div
          initial={{ scale: 0.1 }}
          animate={{ scale: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-8 h-8 bg-white rounded-full"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: phase === 'fading' ? 0.8 : 0, ease: "easeInOut" }} // Más rápido: 1.5s → 0.8s
    >
      <div className="text-center max-w-4xl px-8">
        <AnimatePresence mode="wait">
          {currentText > 0 && currentText <= texts.length && (
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }} // Más rápido: 0.6s → 0.3s
              className={`text-black ${textFonts[currentText - 1]}`}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {texts[currentText - 1].split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < texts[currentText - 1].split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Preloader; 