
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Music, Drama, CircleDollarSign, Bus, Medal, GraduationCap, MapPin, ArrowRight } from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export const ClientHome: React.FC = () => {
  const { events } = useEvents();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
      setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { icon: <Music size={20} />, label: 'Shows' },
    { icon: <Drama size={20} />, label: 'Teatros' },
    { icon: <Medal size={20} />, label: 'Esportes' },
    { icon: <GraduationCap size={20} />, label: 'Cursos' },
    { icon: <Bus size={20} />, label: 'Excursões' },
    { icon: <CircleDollarSign size={20} />, label: 'Gratuitos' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
         <div>
             <h1 className="text-2xl font-bold text-gray-800 mb-2">Explorar Eventos</h1>
             <p className="text-gray-500">Encontre os melhores eventos perto de você.</p>
         </div>
         <div className="relative w-full md:w-96">
            <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
         </div>
      </div>

      {/* Categories Chips */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
         <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-full border text-sm font-bold whitespace-nowrap transition-colors ${!selectedCategory ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
         >
            Todos
         </button>
         {categories.map((cat) => (
             <button 
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label === selectedCategory ? null : cat.label)}
                className={`px-5 py-2 rounded-full border text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-colors ${selectedCategory === cat.label ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
             >
                {cat.icon} {cat.label}
             </button>
         ))}
      </div>

      {/* Events Grid - Standard Layout */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
         {searchTerm ? `Resultados para "${searchTerm}"` : 'Próximos Eventos'} <ArrowRight size={18} className="text-gray-400"/>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEvents.map(event => {
           const eventDate = new Date(event.date);
           const month = eventDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
           const day = eventDate.getDate();

           return (
             <Link key={event.id} to={`/client/event/${event.id}`} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                <div className="h-48 overflow-hidden relative">
                   <img 
                     src={event.image} 
                     alt={event.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                   />
                   <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded font-bold text-xs text-gray-900 shadow-sm">
                      {event.category}
                   </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                   <div className="flex gap-4 mb-3">
                      <div className="flex flex-col items-center text-purple-600 font-bold leading-none">
                          <span className="text-xs">{month}</span>
                          <span className="text-xl">{day}</span>
                      </div>
                      <div className="flex-1">
                          <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">
                             {event.title}
                          </h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1 line-clamp-1">
                             <MapPin size={12}/> {event.location}
                          </p>
                      </div>
                   </div>
                   
                   <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                       <div className="text-xs text-gray-500">A partir de</div>
                       <div className="font-bold text-purple-700">R$ {event.priceMeia.toFixed(2)}</div>
                   </div>
                </div>
             </Link>
           );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
           <Search size={48} className="mx-auto text-gray-300 mb-4" />
           <p className="text-lg text-gray-500 font-medium">Nenhum evento encontrado.</p>
           <p className="text-gray-400">Tente buscar por outro termo ou categoria.</p>
        </div>
      )}
    </div>
  );
};
