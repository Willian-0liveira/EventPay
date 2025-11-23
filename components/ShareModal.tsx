
import React from 'react';
import { X, Link as LinkIcon, Facebook, Twitter, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-gray-900">Compartilhar Evento</h3>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
            <div className="mb-6 bg-gray-50 p-3 rounded-lg flex items-center gap-3 border">
                <div className="bg-white p-2 rounded shadow-sm">
                    <LinkIcon size={20} className="text-purple-600" />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-xs text-gray-500 font-medium">Link do evento</p>
                    <p className="text-sm text-gray-900 truncate">{url}</p>
                </div>
                <button onClick={handleCopy} className="text-purple-600 font-bold text-sm hover:underline">
                    Copiar
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <a 
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-green-50 text-gray-600 hover:text-green-600 transition-colors border border-gray-100"
                >
                    <MessageCircle size={32} />
                    <span className="text-xs font-bold">WhatsApp</span>
                </a>

                <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors border border-gray-100"
                >
                    <Facebook size={32} />
                    <span className="text-xs font-bold">Facebook</span>
                </a>

                <a 
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-sky-50 text-gray-600 hover:text-sky-500 transition-colors border border-gray-100"
                >
                    <Twitter size={32} />
                    <span className="text-xs font-bold">Twitter</span>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};
