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
  
  const audioRef = useRef<{
    synths: Tone.Synth[];
    reverb: Tone.Reverb | null;
    gain: Tone.Gain | null;
  }>({ synths: [], reverb: null, gain: null });

  const texts = [
    "Felipe Hincapié Murillo,\nComunicador Audiovisual.",
    "Con la creatividad como materia prima,\nconstruyo contenido que impacta y conecta.",
    "Felipe Hincapié Murillo",
    "un creador de posibilidades"
  ];

  const notes = ["C4", "E4", "G4"]; // Solo 3 notas para el acorde

  const setupAudio = async () => {
    try {
      await Tone.start();
      
      // 4 synths for 4 notes - configuración que funcionaba antes
      const synths = [
        new Tone.Synth({ 
          oscillator: { type: "sine" }, 
          envelope: { attack: 0.01, decay: 0.3, sustain: 0.7, release: 1.5 } 
        }),
        new Tone.Synth({ 
          oscillator: { type: "sine" }, 
          envelope: { attack: 0.01, decay: 0.3, sustain: 0.7, release: 1.5 } 
        }),
        new Tone.Synth({ 
          oscillator: { type: "sine" }, 
          envelope: { attack: 0.01, decay: 0.3, sustain: 0.7, release: 1.5 } 
        }),
        new Tone.Synth({ 
          oscillator: { type: "sine" }, 
          envelope: { attack: 0.01, decay: 0.3, sustain: 0.7, release: 1.5 } 
        })
      ];

      const gain = new Tone.Gain(0.3);
      const reverb = new Tone.Reverb({ decay: 4, wet: 0.6 });
      
      synths.forEach(synth => {
        synth.connect(gain);
      });
      
      gain.connect(reverb);
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

  const handleStartClick = async () => {
    // Inicializar audio cuando el usuario hace click
    if (!audioInitialized) {
      await setupAudio();
    }
    setPhase('dropping');
  };

  useEffect(() => {
    if (phase === 'dropping') {
      // Después de la animación de gota, expandir a blanco
      setTimeout(() => {
        setPhase('expanding');
      }, 1000);
    }
    
    if (phase === 'expanding') {
      // Después de expandir, empezar los textos
      setTimeout(() => {
        setPhase('texts');
        setCurrentText(1);
      }, 800);
    }
    
    if (phase === 'texts') {
      const beatDuration = 3000; // 40 BPM - 3 segundos por texto
      const noteDuration = 2.5; // Duración de cada nota (2.5 segundos)
      
      // Texto 1 ya está visible + Nota C3
      setTimeout(() => {
        if (audioInitialized) playNoteWithFadeOut(0, noteDuration); // C3
      }, 500);

      // Texto 2 + Nota G3
      setTimeout(() => {
        setCurrentText(2);
        if (audioInitialized) playNoteWithFadeOut(1, noteDuration); // G3
      }, 500 + beatDuration);

      // Texto 3 + Nota B4
      setTimeout(() => {
        setCurrentText(3);
        if (audioInitialized) playNoteWithFadeOut(2, noteDuration); // B4
      }, 500 + (beatDuration * 2));

      // Texto 4 + Acorde final (todas las notas juntas)
      setTimeout(() => {
        setCurrentText(4);
        if (audioInitialized) {
          // Tocar todas las notas juntas para el acorde final
          playNoteWithFadeOut(0, 2); // C3
          playNoteWithFadeOut(1, 2); // G3
          playNoteWithFadeOut(2, 2); // B4
          playNoteWithFadeOut(3, 2); // E5
        }
      }, 500 + (beatDuration * 3));

      // Fade out
      setTimeout(() => {
        setPhase('fading');
      }, 500 + (beatDuration * 4));

      // Complete - más rápido
      setTimeout(() => {
        onComplete();
      }, 500 + (beatDuration * 4) + 1500);
    }
  }, [phase, onComplete, audioInitialized]);

  if (phase === 'waiting') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-pointer" onClick={handleStartClick}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
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
      transition={{ duration: phase === 'fading' ? 1.5 : 0, ease: "easeInOut" }}
    >
      <div className="text-center max-w-4xl px-8">
        <AnimatePresence mode="wait">
          {currentText > 0 && currentText <= texts.length && (
            <motion.div
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
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