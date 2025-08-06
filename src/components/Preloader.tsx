import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tone from "tone";

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
  
  const texts = [
    "Con la creatividad como materia prima",
    "construyo contenido que impacta\nconecta y emociona",
    "Felipe Hincapié Murillo\ncomunicador audiovisual",
    "Un creador de posibilidades"
  ];

  const notes = ["C4", "E4", "G4"]; // Solo 3 notas para el acorde

  const setupAudio = async () => {
    try {
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
      const filter = new Tone.Filter(800, "lowpass"); // Filtro para suavizar
      const chorus = new Tone.Chorus(4, 2.5, 0.5); // Chorus para efecto bloom
      
      synths.forEach(synth => {
        synth.connect(gain);
      });
      
      // Cadena de efectos para bloom ambiental
      gain.connect(filter);
      filter.connect(chorus);
      chorus.connect(delay);
      delay.connect(reverb);
      reverb.toDestination();
      
      audioRef.current = { synths, reverb, gain };
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
      // Precargar imágenes críticas
      const imagePromises = [
        "/lovable-uploads/8535bbb6-e6a8-4ec6-b0d3-aeee6c93c655.png",
        "/favicon.ico"
      ].map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if some images fail
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      
      // Simular carga de componentes React
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPagePreloaded(true);
      console.log("Page assets preloaded");
    } catch (error) {
      console.log("Some assets failed to load, continuing anyway");
      setPagePreloaded(true);
    }
  };

  const handleStartClick = async () => {
    // Inicializar audio cuando el usuario hace click
    if (!audioInitialized) {
      await setupAudio();
    }
    // Iniciar precarga de la página
    preloadPageAssets();
    setPhase('dropping');
  };

  useEffect(() => {
    if (phase === 'dropping') {
      // Después de la animación de gota (más tiempo para la nueva animación)
      setTimeout(() => {
        setPhase('expanding');
      }, 1200);
    }
    
    if (phase === 'expanding') {
      // Después de expandir (más tiempo para la nueva animación)
      setTimeout(() => {
        setPhase('texts');
        setCurrentText(1);
      }, 1000);
    }
    
    if (phase === 'texts') {
      const beatDuration = 3000; // 40 BPM - 3 segundos por texto
      const noteDuration = 2.5; // Duración de cada nota individual
      const chordDuration = 3.5; // Duración del acorde final (más largo)
      
      // Texto 1 + Golpe 1: Solo C4 (tun)
      setTimeout(() => {
        if (audioInitialized) playNoteWithFadeOut(0, noteDuration); // C4
      }, 500);

      // Texto 2 + Golpe 2: Solo E4 (tun)
      setTimeout(() => {
        setCurrentText(2);
        if (audioInitialized) playNoteWithFadeOut(1, noteDuration); // E4
      }, 500 + beatDuration);

      // Texto 3 + Golpe 3: Solo G4 (tun)
      setTimeout(() => {
        setCurrentText(3);
        if (audioInitialized) playNoteWithFadeOut(2, noteDuration); // G4
      }, 500 + (beatDuration * 2));

      // Texto 4 + Golpe 4: ACORDE COMPLETO (C4 + E4 + G4) - ¡ESPACIAL!
      setTimeout(() => {
        setCurrentText(4);
        if (audioInitialized) {
          // Tocar las 3 notas juntas para el acorde final espacial
          playNoteWithFadeOut(0, chordDuration); // C4
          playNoteWithFadeOut(1, chordDuration); // E4
          playNoteWithFadeOut(2, chordDuration); // G4
        }
      }, 500 + (beatDuration * 3));

      // Fade out - esperar a que la página esté precargada
      setTimeout(() => {
        setPhase('fading');
        
        // Esperar a que la página esté lista antes de completar
        const waitForPageLoad = () => {
          if (pagePreloaded) {
            setTimeout(() => {
              onComplete();
            }, 800); // Reducido de 1500 a 800 para transición más fluida
          } else {
            setTimeout(waitForPageLoad, 100); // Revisar cada 100ms
          }
        };
        
        waitForPageLoad();
      }, 500 + (beatDuration * 4));
    }
  }, [phase, onComplete, audioInitialized]);

  if (phase === 'waiting') {
  return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-pointer" onClick={handleStartClick}>
    <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} // Custom easing más fluido
          className="text-center"
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
          initial={{ y: -200, scale: 0.1, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.34, 1.56, 0.64, 1], // Bounce easing más natural
            opacity: { duration: 0.3 }
          }}
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
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }} // Easing más suave
      >
          <motion.div
          initial={{ scale: 0.1 }}
          animate={{ scale: 100 }}
            transition={{
            duration: 1, 
            ease: [0.23, 1, 0.32, 1] // Easing exponencial suave
            }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }} // Solo fade, sin movimiento
              className="text-black font-montserrat"
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