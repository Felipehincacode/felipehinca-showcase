import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Tone from "tone";

interface DropLoaderProps {
  onComplete: () => void;
}

// Easing arrays (evita error de tipos con "ease" string)
const easeInOut: [number, number, number, number] = [0.4, 0, 0.2, 1];

const DropLoader: React.FC<DropLoaderProps> = ({ onComplete }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(-1);
  const [isFading, setIsFading] = useState(false);

  // Ripples/ondas
  const [ripples, setRipples] = useState<number[]>([]);
  const rippleIdRef = useRef(0);
  const triggerRipple = useCallback(() => {
    const id = rippleIdRef.current++;
    setRipples((prev) => [...prev, id]);
    // Remover ripple después de animación
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== id));
    }, 1600);
  }, []);

  const audioRef = useRef<{
    synths: Tone.Synth[];
    gain: Tone.Gain;
    filter: Tone.Filter;
    vibrato: Tone.Vibrato;
    reverb: Tone.Reverb;
    compressor: Tone.Compressor;
  } | null>(null);

  const texts = useMemo(
    () => [
      ["Felipe Hincapié Murillo,", "Comunicador Audiovisual."],
      ["Con la creatividad como materia prima,", "construyo contenido que impacta y conecta."],
      ["Felipe Hincapié Murillo"],
      ["un creador de posibilidades"],
    ],
    []
  );

  const notes = useMemo(() => ["C4", "E4", "G4", "D5"], []); // Cmaj9 moderno

  const initAudio = useCallback(async () => {
    if (audioRef.current) return;
    await Tone.start();

    const makeSynth = () =>
      new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.015, decay: 0.12, sustain: 0.9, release: 3.2 },
      });

    const synths = [makeSynth(), makeSynth(), makeSynth(), makeSynth()];
    // micro detune para riqueza estéreo sutil
    const detunes = [-4, +3, -2, +5];
    synths.forEach((s, i) => (s.detune.value = detunes[i]));

    const gain = new Tone.Gain(0.35);
    const vibrato = new Tone.Vibrato(0.35, 0.1);
    const filter = new Tone.Filter(8000, "lowpass", -12);
    const reverb = new Tone.Reverb({ decay: 4.8, preDelay: 0.02, wet: 0.55 });
    const compressor = new Tone.Compressor({ threshold: -20, ratio: 2, attack: 0.01, release: 0.2 });

    synths.forEach((s) => s.chain(gain, vibrato, filter, reverb, compressor, Tone.getDestination()));

    audioRef.current = { synths, gain, filter, vibrato, reverb, compressor };
    setAudioReady(true);
  }, []);

  const startTimeline = useCallback(async () => {
    // Visuales empiezan siempre
    const startTs = performance.now();
    setStartedAt(startTs);

    // Audio: intentar iniciar; si falla, seguimos con visuales y se activará al primer gesto
    try {
      if (!audioRef.current) await initAudio();
      // programar notas acumulativas (una blanca ~ 3s a 80BPM)
      const t0 = Tone.now() + 0.1;
      const offsetsSec = [0, 3, 6, 9];
      notes.forEach((note, i) => {
        audioRef.current!.synths[i].triggerAttack(note, t0 + offsetsSec[i]);
      });
      // Fade out global y liberación
      audioRef.current!.gain.gain.setValueAtTime(audioRef.current!.gain.gain.value, t0 + 12);
      audioRef.current!.gain.gain.linearRampToValueAtTime(0, t0 + 14);
      // stop after fade
      setTimeout(() => {
        audioRef.current?.synths.forEach((s) => s.triggerRelease());
      }, 14000);
    } catch {
      // silencioso: navegadores podrían bloquear; se activará con el primer gesto
    }

    // Secuencia de textos y ondas sincronizadas con cada nota
    setTimeout(() => { setCurrentTextIndex(0); triggerRipple(); }, 200);
    setTimeout(() => { setCurrentTextIndex(1); triggerRipple(); }, 3200);
    setTimeout(() => { setCurrentTextIndex(2); triggerRipple(); }, 6200);
    setTimeout(() => { setCurrentTextIndex(3); triggerRipple(); }, 9200);

    // Fade a blanco y fin
    setTimeout(() => setIsFading(true), 12000);
    setTimeout(() => onComplete(), 14500);
  }, [initAudio, notes, onComplete, triggerRipple]);

  // Arranque por interacción sutil (sin botón visible)
  useEffect(() => {
    if (hasInteracted) return;

    const kick = async () => {
      setHasInteracted(true);
      if (!audioRef.current) await initAudio();
      startTimeline();
    };

    // Iniciar visual y audio al primer gesto natural
    const types = ["pointerdown", "keydown", "wheel", "touchstart"]; 
    const offs = types.map((t) => {
      const h = () => kick();
      window.addEventListener(t, h, { once: true, passive: true });
      return () => window.removeEventListener(t, h);
    });

    // Además, intenta arrancar a los 500ms por si el navegador permite autoplay
    const auto = setTimeout(() => {
      if (!hasInteracted) kick();
    }, 500);

    return () => {
      offs.forEach((off) => off());
      clearTimeout(auto);
    };
  }, [hasInteracted, initAudio, startTimeline]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "#000" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 2, ease: easeInOut }}
    >
      {/* Círculo blanco que cae y se expande */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
        style={{ backgroundColor: "#fff" }}
        initial={{ y: -40, scale: 0, opacity: 0 }}
        animate={{ y: "50vh", scale: 1200, opacity: 1 }}
        transition={{
          y: { duration: 1, ease: easeInOut },
          scale: { duration: 1.8, ease: easeInOut, delay: 0.2 },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Ondas en el blanco, sincronizadas con cada nota */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {ripples.map((id) => (
          <motion.div
            key={id}
            className="absolute rounded-full"
            style={{
              width: 24,
              height: 24,
              // Radial ripple suave visible sobre blanco
              background: "radial-gradient(closest-side, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.06) 40%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0) 80%)",
              filter: "blur(0.3px)",
            }}
            initial={{ scale: 0.1, opacity: 0.5 }}
            animate={{ scale: 120, opacity: 0 }}
            transition={{ duration: 1.6, ease: easeInOut }}
          />
        ))}
      </div>

      {/* Textos centrados (uno a la vez) */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentTextIndex >= 0 && (
            <motion.div
              key={currentTextIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: easeInOut }}
              className="space-y-3"
            >
              {texts[currentTextIndex].map((line, i) => (
                <div
                  key={i}
                  className="font-typewriter"
                  style={{ color: "#fff", fontSize: "clamp(22px, 4.2vw, 56px)", fontWeight: i === 0 ? 700 : 400 }}
                >
                  {line}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay de inicio sutil (solo si no ha habido interacción aún) */}
      {!hasInteracted && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easeInOut, delay: 0.2 }}
        >
          <div className="text-center" style={{ color: "#ffffffAA" }}>
            <div className="font-typewriter" style={{ fontSize: "clamp(13px, 2.2vw, 16px)" }}>
              toca/clic en cualquier parte para comenzar
            </div>
            <div className="mt-2 mx-auto w-2 h-2 rounded-full" style={{ backgroundColor: "#ffffffAA" }} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DropLoader;
