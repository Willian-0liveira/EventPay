
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Calendar, MapPin, Clock, QrCode } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MOCK_EVENTS } from '../../data/mockData';

export const Tickets: React.FC = () => {
  const { tickets } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-purple-600 p-2 rounded-lg text-white">
          <Ticket size={24} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Meus Ingressos</h1>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Ticket size={64} className="text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 font-medium mb-2">Você ainda não possui ingressos.</p>
          <p className="text-gray-400 mb-6">Explore os eventos e garanta seu lugar!</p>
          <Link 
            to="/client/home" 
            className="px-6 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors"
          >
            Ver Eventos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tickets.map((ticket) => {
            // Find full event details for display (Date, Location, etc.)
            const eventDetails = MOCK_EVENTS.find(e => e.id === ticket.eventId);
            // Generate a unique QR code based on the Ticket ID
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketId}`;
            
            return (
              <div key={ticket.ticketId} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                {/* Left Side - Image & Event Info */}
                <div className="sm:w-1/3 relative min-h-[150px]">
                  <img 
                    src={ticket.eventImage} 
                    alt={ticket.eventTitle} 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent sm:hidden"></div>
                  <div className="absolute bottom-3 left-3 text-white sm:hidden font-bold">
                    {ticket.eventTitle}
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="flex-1 p-5 flex flex-col justify-between relative">
                    {/* Perforation Style Effect */}
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-gray-50 rounded-full hidden sm:block"></div>
                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-transparent border-r border-gray-200 rounded-full hidden sm:block"></div>

                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="mb-4 flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 hidden sm:block line-clamp-1">{ticket.eventTitle}</h3>
                                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider whitespace-nowrap">
                                    {ticket.type}
                                </span>
                            </div>
                            
                            {eventDetails && (
                                <div className="space-y-1 mt-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar size={16} />
                                        <span>{new Date(eventDetails.date).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock size={16} />
                                        <span>{eventDetails.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin size={16} />
                                        <span className="truncate max-w-[200px]">{eventDetails.location}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Active QR Code Display */}
                        <div className="flex flex-col items-center justify-center min-w-[100px]">
                           <img src={qrCodeUrl} alt="Ticket QR" className="w-24 h-24 border-4 border-white shadow-sm" />
                           <span className="text-[10px] text-gray-400 mt-1">Validar na entrada</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end border-t pt-4 border-dashed border-gray-300 mt-auto">
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold">ID do Ingresso</p>
                            <p className="text-sm font-mono text-gray-700 font-bold">#{ticket.ticketId}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Status</p>
                            <p className="text-sm font-bold text-green-600">VÁLIDO</p>
                        </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
