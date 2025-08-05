import { useState, useEffect, useRef } from "react";
import { X, Loader2, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const Modal = ({ isOpen, onClose, title, url }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dominantColor, setDominantColor] = useState("#22c55e");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Simular detección de color dominante del video
  useEffect(() => {
    if (isOpen) {
      const colors = ["#22c55e", "#10b981", "#059669", "#16a34a", "#15803d"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setDominantColor(randomColor);
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Backdrop con efecto de profundidad */}
        <motion.div 
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          initial={{ backdropFilter: "blur(0px)" }}
          animate={{ backdropFilter: "blur(20px)" }}
          exit={{ backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
        />
        
        {/* Formas difusas que reaccionan al color del video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Forma principal */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ 
              background: `radial-gradient(circle, ${dominantColor}40, transparent 70%)`,
              filter: "blur(60px)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Forma secundaria */}
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15"
            style={{ 
              background: `radial-gradient(circle, ${dominantColor}30, transparent 60%)`,
              filter: "blur(40px)"
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -15, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Formas pequeñas flotantes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-30"
              style={{ 
                background: dominantColor,
                filter: "blur(1px)",
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
          
          {/* Líneas de energía sutiles */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px opacity-20"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${dominantColor}, transparent)`,
                width: `${200 + i * 50}px`,
                left: `${10 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
            />
          ))}
        </div>

        {/* Modal principal */}
        <motion.div 
          className="relative bg-background/95 backdrop-blur-md rounded-2xl shadow-2xl border border-border/20 max-w-[95vw] max-h-[95vh] w-full h-full flex flex-col overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Header elegante */}
          <motion.div 
            className="flex-shrink-0 flex items-center justify-between p-6 border-b border-border/20 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ background: dominantColor }}
              />
              <h2 className="font-montserrat font-bold text-xl text-foreground">
                {title}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Controles del video */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5 text-foreground" /> : <Play className="h-5 w-5 text-foreground" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5 text-foreground" /> : <Volume2 className="h-5 w-5 text-foreground" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5 text-foreground" /> : <Maximize2 className="h-5 w-5 text-foreground" />}
              </motion.button>
              
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-destructive/20 hover:text-destructive rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Contenido del video */}
          <motion.div 
            className="flex-1 min-h-0 relative bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {isLoading && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-12 w-12 text-mint-green mx-auto mb-6" />
                  </motion.div>
                  <p className="font-roboto text-muted-foreground text-lg">
                    {t('modal.loading')}
                  </p>
                  <motion.div
                    className="mt-4 w-32 h-1 bg-muted rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="h-full bg-mint-green rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            <iframe
              ref={iframeRef}
              src={url}
              className="w-full h-full rounded-b-2xl"
              onLoad={() => setIsLoading(false)}
              title={title}
              allowFullScreen
              style={{ 
                border: `1px solid ${dominantColor}20`,
                boxShadow: `0 0 40px ${dominantColor}10`
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;