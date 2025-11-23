
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { Mail, Phone, MapPin, Settings, Bookmark, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CompanyProfile: React.FC = () => {
  const { user } = useAuth();
  const { events } = useEvents();

  if (!user) return null;

  // Filter real events from context instead of mock data
  const myEvents = events.filter(e => e.organizerId === user.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Enhanced Banner */}
      <div className="relative h-64 bg-gray-900 overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop" 
            alt="Banner" 
            className="w-full h-full object-cover opacity-40"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
         
         <div className="absolute top-4 right-4 z-10">
             <Link to="/company/settings" className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-all text-sm font-medium">
                <Settings size={16} /> Editar Perfil
             </Link>
         </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-24 relative z-10 pb-12">
         <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Profile Card */}
            <div className="w-full md:w-80 flex-shrink-0">
               <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 text-center border-b">
                     <div className="w-32 h-32 mx-auto bg-white rounded-full p-1 shadow-lg -mt-16 mb-4 relative z-10">
                        <img src={user.avatar} alt="Logo" className="w-full h-full rounded-full object-cover border border-gray-100" />
                     </div>
                     <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                     <p className="text-gray-500 text-sm mb-4">Organizadora de Eventos</p>
                     <div className="flex justify-center gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Verificada</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Ativa</span>
                     </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3 text-gray-600">
                         <Bookmark size={18} className="text-purple-500" />
                         <span className="text-sm">{user.cnpj}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                         <Mail size={18} className="text-purple-500" />
                         <span className="text-sm truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                         <Phone size={18} className="text-purple-500" />
                         <span className="text-sm">{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                         <MapPin size={18} className="text-purple-500" />
                         <span className="text-sm">{user.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                         <Globe size={18} className="text-purple-500" />
                         <span className="text-sm text-purple-600 hover:underline cursor-pointer">website.com</span>
                      </div>
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
               <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre a Empresa</h2>
                  <p className="text-gray-600 leading-relaxed">
                     Somos uma produtora dedicada a criar experiências inesquecíveis. Com mais de 10 anos de mercado, 
                     já realizamos centenas de shows, festivais e eventos corporativos. Nossa missão é conectar pessoas 
                     através da arte e do entretenimento.
                  </p>
               </div>

               <h2 className="text-2xl font-bold text-gray-800 mb-6">Eventos em Destaque</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {myEvents.length > 0 ? (
                    myEvents.map(event => (
                        <Link key={event.id} to={`/client/event/${event.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    {new Date(event.date).toLocaleDateString('pt-BR')}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors truncate">{event.title}</h3>
                                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                                    <MapPin size={14} /> {event.location}
                                </p>
                            </div>
                        </Link>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10 bg-gray-50 rounded-xl border border-dashed">
                        <p className="text-gray-500">Nenhum evento publicado ainda.</p>
                    </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
