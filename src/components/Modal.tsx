import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const Modal = ({ isOpen, onClose, url, title }: ModalProps) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elegant max-w-5xl w-full max-h-[90vh] overflow-hidden animate-scale-in my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-montserrat font-semibold text-lg text-foreground">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
        
        {/* Content */}
        <div className="relative h-[70vh]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-purple-400 animate-pulse rounded-full"></div>
                </div>
                <p className="text-sm text-muted-foreground font-roboto">{t('modal.loading')}</p>
              </div>
            </div>
          )}
          <iframe
            src={url}
            className="w-full h-full border-0"
            allowFullScreen
            title={title}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;