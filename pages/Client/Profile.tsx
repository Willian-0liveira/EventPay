
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Mail, Phone, Calendar, Settings, Ticket, MapPin, Bookmark } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ClientProfile: React.FC = () => {
  const { user } = useAuth();
  const { tickets } = useCart();
  const navigate = useNavigate();

  if (!user) return null;

  // Get unique events purchased for the "Eventos" gallery
  const purchasedEventIds = Array.from(new Set(tickets.map(t => t.eventId)));
  const purchasedEvents = tickets.filter(t => purchasedEventIds.includes(t.eventId))
    .filter((v,i,a)=>a.findIndex(t=>(t.eventId===v.eventId))===i); // Unique by eventId

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 h-60 relative">
         <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'}}></div>
      </div>
      
      <div className="container mx-auto px-4 -mt-20 relative z-10">
         <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-gray-200 shadow-md overflow-hidden flex-shrink-0">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 mb-2">
               <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
               <p className="text-gray-500 font-medium flex items-center gap-2">
                  <Mail size={16} /> {user.email}
               </p>
            </div>
            <div className="w-full md:w-auto mb-2">
               <Link to="/client/settings" className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-md">
                  <Settings size={20} /> Configurações
               </Link>
            </div>
         </div>

         <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Sidebar Info */}
            <div className="space-y-6">
               <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Sobre Mim</h2>
                  <div className="space-y-4 text-gray-600">
                     <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded text-purple-600"><Phone size={18} /></div>
                        <div>
                           <p className="text-xs text-gray-400">Telefone</p>
                           <p className="font-medium text-sm">{user.phone || 'Não informado'}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded text-purple-600"><MapPin size={18} /></div>
                        <div>
                           <p className="text-xs text-gray-400">Endereço</p>
                           <p className="font-medium text-sm">{user.address || 'Não informado'}</p>
                        </div>
                     </div>
                     {user.cpf && (
                       <div className="flex items-center gap-3">
                          <div className="bg-purple-100 p-2 rounded text-purple-600"><Bookmark size={18} /></div>
                          <div>
                             <p className="text-xs text-gray-400">CPF</p>
                             <p className="font-medium text-sm">{user.cpf}</p>
                          </div>
                       </div>
                     )}
                     {user.birthDate && (
                       <div className="flex items-center gap-3">
                          <div className="bg-purple-100 p-2 rounded text-purple-600"><Calendar size={18} /></div>
                          <div>
                             <p className="text-xs text-gray-400">Nascimento</p>
                             <p className="font-medium text-sm">{new Date(user.birthDate).toLocaleDateString('pt-BR')}</p>
                          </div>
                       </div>
                     )}
                  </div>
               </div>

               <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                     <h2 className="text-lg font-bold text-gray-800">Favoritos</h2>
                     <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">{user.favorites?.length || 0}</span>
                  </div>
                  <p className="text-gray-500 text-sm">Eventos que você marcou como favoritos aparecerão aqui.</p>
                  {/* Future implementation: List favorite events here */}
               </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
                {/* Meus Ingressos / Event Images */}
                <div>
                   <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                         <Ticket className="text-purple-600" /> Meus Eventos
                      </h2>
                      <Link to="/client/tickets" className="text-purple-600 font-medium hover:underline text-sm">Ver todos os ingressos</Link>
                   </div>

                   {purchasedEvents.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {purchasedEvents.map((item) => (
                            <div key={item.eventId} className="group relative rounded-xl overflow-hidden aspect-video shadow-md cursor-pointer" onClick={() => navigate('/client/tickets')}>
                               <img src={item.eventImage} alt={item.eventTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                  <h3 className="text-white font-bold text-lg leading-tight">{item.eventTitle}</h3>
                                  <p className="text-white/80 text-xs mt-1">Ingresso adquirido</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   ) : (
                      <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                         <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-300">
                            <Ticket size={32} />
                         </div>
                         <h3 className="text-lg font-medium text-gray-900">Nenhum evento ainda</h3>
                         <p className="text-gray-500 mb-6">Explore os eventos disponíveis e garanta sua presença.</p>
                         <Link to="/client/home" className="text-purple-600 font-bold hover:underline">Explorar Eventos</Link>
                      </div>
                   )}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
