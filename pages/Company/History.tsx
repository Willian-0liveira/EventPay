
import React, { useState } from 'react';
import { MOCK_EVENTS, MOCK_FEEDBACKS } from '../../data/mockData';
import { Calendar, MessageSquare, Star } from 'lucide-react';

export const History: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'realized' | 'future'>('realized');

  // Mock filtering for the logged in company
  const events = MOCK_EVENTS.filter(e => e.organizerId === 'comp1');
  const realizedEvents = events.filter(e => e.status === 'REALIZED' || new Date(e.date) < new Date());
  const futureEvents = events.filter(e => e.status !== 'REALIZED' && new Date(e.date) >= new Date());

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
       <h1 className="text-3xl font-bold text-purple-700 mb-8">Histórico</h1>

       {/* Tabs */}
       <div className="flex border-b mb-8">
          <button 
             className={`pb-4 px-6 font-bold ${activeTab === 'realized' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
             onClick={() => setActiveTab('realized')}
          >
             Eventos Realizados
          </button>
          <button 
             className={`pb-4 px-6 font-bold ${activeTab === 'future' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
             onClick={() => setActiveTab('future')}
          >
             Eventos Futuros
          </button>
       </div>

       <div className="space-y-6">
          {(activeTab === 'realized' ? realizedEvents : futureEvents).map(event => (
             <div key={event.id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
                <div className="flex flex-col md:flex-row">
                   <div className="md:w-48 h-32 bg-gray-200">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                         <div>
                            <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                               <Calendar size={14} /> {event.date} • {event.time}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                         </div>
                         <div className="text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${activeTab === 'realized' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-600'}`}>
                               {activeTab === 'realized' ? 'Concluído' : 'Agendado'}
                            </span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Feedbacks Section (Only for realized events) */}
                {activeTab === 'realized' && (
                   <div className="bg-gray-50 p-4 border-t">
                      <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                         <MessageSquare size={16} /> Feedbacks
                      </h4>
                      <div className="space-y-3 pl-4 border-l-2 border-purple-200">
                         {MOCK_FEEDBACKS.filter(f => f.eventId === event.id).length > 0 ? (
                            MOCK_FEEDBACKS.filter(f => f.eventId === event.id).map(feedback => (
                               <div key={feedback.id} className="bg-white p-3 rounded border">
                                  <div className="flex justify-between mb-1">
                                     <span className="font-bold text-sm">{feedback.user}</span>
                                     <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                           <Star key={i} size={12} fill={i < feedback.rating ? "currentColor" : "none"} />
                                        ))}
                                     </div>
                                  </div>
                                  <p className="text-gray-600 text-sm italic">"{feedback.comment}"</p>
                               </div>
                            ))
                         ) : (
                            <p className="text-sm text-gray-400 italic">Nenhum feedback registrado ainda.</p>
                         )}
                      </div>
                   </div>
                )}
             </div>
          ))}

          {(activeTab === 'realized' ? realizedEvents : futureEvents).length === 0 && (
             <div className="text-center py-12 text-gray-500">
                Nenhum evento encontrado nesta categoria.
             </div>
          )}
       </div>
    </div>
  );
};
