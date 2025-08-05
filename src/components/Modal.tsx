import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const Modal = ({ isOpen, onClose, title, url }: ModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-3 sm:p-4 border-b border-border">
          <h2 className="font-montserrat font-semibold text-base sm:text-lg text-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-h-0 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="text-center">
                <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-mint-green mx-auto mb-4" />
                <p className="font-roboto text-muted-foreground text-sm sm:text-base">
                  {t('modal.loading')}
                </p>
              </div>
            </div>
          )}
          
          <iframe
            src={url}
            className="w-full h-full rounded-b-lg"
            onLoad={() => setIsLoading(false)}
            title={title}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;