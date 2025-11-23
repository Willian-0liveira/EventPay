
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';

export const CompanyEvents: React.FC = () => {
  const { events, deleteEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter events for the logged-in company
  const myEvents = events.filter(e => e.organizerId === user?.id);

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
        deleteEvent(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-purple-700">Meus Eventos</h1>
         <Link to="/company/create-event" className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700">
             <Plus size={20} /> Criar Novo
         </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
         {myEvents.map(event => (
            <div key={event.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
               <div className="relative h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                     <button 
                        onClick={() => navigate(`/company/edit-event/${event.id}`)}
                        className="bg-white p-1.5 rounded-full text-gray-700 hover:text-purple-600 shadow-sm transition-colors"
                        title="Editar"
                     >
                        <Edit size={16} />
                     </button>
                     <button 
                        onClick={() => handleDelete(event.id)}
                        className="bg-white p-1.5 rounded-full text-gray-700 hover:text-red-600 shadow-sm transition-colors"
                        title="Excluir"
                     >
                        <Trash2 size={16} />
                     </button>
                  </div>
               </div>
               <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
                  <div className="space-y-2 text-gray-600 text-sm">
                     <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-purple-500" />
                        <span>{new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-purple-500" />
                        <span className="truncate">{event.location}</span>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                     <span className="font-bold text-purple-700">R$ {event.priceInteira.toFixed(2)}</span>
                     <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">Ativo</span>
                  </div>
               </div>
            </div>
         ))}
         
         {/* Card to Add New */}
         <Link to="/company/create-event" className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50 transition-colors min-h-[300px]">
             <Plus size={48} className="mb-2" />
             <span className="font-bold">Adicionar Evento</span>
         </Link>
      </div>
    </div>
  );
};
