
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Heart, Share2, ShoppingCart, Minus, Plus, Calendar, Clock, Info, ShieldCheck } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ShareModal } from '../../components/ShareModal';

export const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById } = useEvents();
  const event = id ? getEventById(id) : undefined;
  const { addItem } = useCart();
  const { user, toggleFavorite } = useAuth();

  const [qtyInteira, setQtyInteira] = useState(0);
  const [qtyMeia, setQtyMeia] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!event) return <div className="p-10 text-center">Evento não encontrado</div>;

  const isFavorite = user?.favorites?.includes(event.id) || false;

  const handleAddToCart = (type: 'Inteira' | 'Meia', quantity: number) => {
    if (quantity > 0) {
      addItem({
        eventId: event.id,
        eventTitle: event.title,
        eventImage: event.image,
        type,
        price: type === 'Inteira' ? event.priceInteira : event.priceMeia,
        quantity
      });
      alert(`${quantity} ingresso(s) adicionado(s) ao carrinho!`);
    }
  };

  const handleToggleFavorite = () => {
      if (!user) {
          alert('Faça login para favoritar eventos!');
          navigate('/login');
          return;
      }
      toggleFavorite(event.id);
  };

  return (
    <div className="bg-white min-h-screen">
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        title={event.title}
        url={window.location.href}
      />

      {/* Hero Image Blur Background */}
      <div className="relative h-96 overflow-hidden">
         <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-10"></div>
         <img src={event.image} alt={event.title} className="w-full h-full object-cover absolute inset-0 blur-sm" />
         
         {/* Content on Hero */}
         <div className="container mx-auto px-4 h-full relative z-20 flex items-end pb-10">
             <div className="max-w-4xl text-white">
                 <span className="bg-purple-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-lg">{event.category}</span>
                 <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight shadow-sm">{event.title}</h1>
                 <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-lg font-medium text-white/90">
                     <span className="flex items-center gap-2"><Calendar size={20} className="text-purple-400"/> {new Date(event.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                     <span className="flex items-center gap-2"><MapPin size={20} className="text-purple-400"/> {event.location}</span>
                 </div>
             </div>
         </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">Sobre o Evento</h2>
                <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed whitespace-pre-line">
                    {event.description}
                </div>
            </div>

            {/* Organizer & Info */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Info size={20} className="text-purple-600"/> Informações</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex justify-between"><span>Abertura dos portões:</span> <span className="font-medium text-gray-900">1 hora antes</span></li>
                        <li className="flex justify-between"><span>Classificação:</span> <span className="font-medium text-gray-900">16 anos</span></li>
                        <li className="flex justify-between"><span>Estacionamento:</span> <span className="font-medium text-gray-900">No local (Pago)</span></li>
                    </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck size={20} className="text-purple-600"/> Política</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Cancelamentos podem ser solicitados até 7 dias após a compra, desde que 48h antes do evento. É obrigatória a apresentação de documento na entrada.
                    </p>
                </div>
            </div>

            {/* Map */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-purple-600 pl-4">Localização</h2>
                <div className="w-full h-80 bg-gray-200 rounded-2xl overflow-hidden relative shadow-inner border border-gray-300 group">
                    <div className="w-full h-full bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000")'}}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-white p-4 rounded-full shadow-xl animate-bounce">
                                <MapPin size={32} className="text-red-600" fill="currentColor" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-lg flex justify-between items-center">
                        <div className="truncate pr-4">
                             <p className="font-bold text-gray-900">{event.location}</p>
                             <p className="text-xs text-gray-500">São Paulo, SP</p>
                        </div>
                        <a href={`https://maps.google.com/?q=${event.location}`} target="_blank" rel="noreferrer" className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-xs font-bold text-gray-700 transition-colors whitespace-nowrap">
                            Ver Mapa
                        </a>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column - Sticky Tickets */}
          <div className="relative">
            <div className="sticky top-24 space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-purple-600 p-4 text-white text-center">
                        <p className="text-sm font-medium opacity-90">Data do Evento</p>
                        <p className="text-xl font-bold">{new Date(event.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                            <ShoppingCart size={20} className="text-purple-600" /> Ingressos
                        </h3>

                        {/* Ticket Rows */}
                        <div className="space-y-4">
                            <div className="border rounded-xl p-4 hover:border-purple-400 transition-colors">
                                <div className="flex justify-between mb-3">
                                    <span className="font-bold text-gray-800">Inteira</span>
                                    <span className="font-bold text-purple-700">R$ {event.priceInteira.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1">
                                    <button onClick={() => setQtyInteira(Math.max(0, qtyInteira - 1))} disabled={qtyInteira===0} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 disabled:opacity-50 hover:bg-gray-100"><Minus size={16}/></button>
                                    <span className="font-bold text-gray-900 w-8 text-center">{qtyInteira}</span>
                                    <button onClick={() => setQtyInteira(qtyInteira + 1)} className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded shadow-sm hover:bg-purple-700"><Plus size={16}/></button>
                                </div>
                            </div>

                            <div className="border rounded-xl p-4 hover:border-purple-400 transition-colors">
                                <div className="flex justify-between mb-3">
                                    <span className="font-bold text-gray-800">Meia-Entrada</span>
                                    <span className="font-bold text-purple-700">R$ {event.priceMeia.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1">
                                    <button onClick={() => setQtyMeia(Math.max(0, qtyMeia - 1))} disabled={qtyMeia===0} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 disabled:opacity-50 hover:bg-gray-100"><Minus size={16}/></button>
                                    <span className="font-bold text-gray-900 w-8 text-center">{qtyMeia}</span>
                                    <button onClick={() => setQtyMeia(qtyMeia + 1)} className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded shadow-sm hover:bg-purple-700"><Plus size={16}/></button>
                                </div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center py-4 border-t border-gray-100">
                            <span className="text-gray-500 font-medium">Total</span>
                            <span className="text-2xl font-bold text-gray-900">
                                R$ {((qtyInteira * event.priceInteira) + (qtyMeia * event.priceMeia)).toFixed(2).replace('.', ',')}
                            </span>
                        </div>

                        <button 
                            onClick={() => {
                                handleAddToCart('Inteira', qtyInteira);
                                handleAddToCart('Meia', qtyMeia);
                                setQtyInteira(0);
                                setQtyMeia(0);
                            }}
                            disabled={qtyInteira === 0 && qtyMeia === 0}
                            className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-lg"
                        >
                            Comprar Ingressos
                        </button>

                        <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                            <ShieldCheck size={12} /> Compra 100% Segura
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={handleToggleFavorite}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold border-2 transition-colors ${isFavorite ? 'bg-red-50 border-red-100 text-red-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
                    >
                        <Heart size={20} fill={isFavorite ? "currentColor" : "none"} /> {isFavorite ? 'Favorito' : 'Favoritar'}
                    </button>
                    <button 
                        onClick={() => setIsShareModalOpen(true)}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                        <Share2 size={20} /> Compartilhar
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
