
import React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

export const CompanyCalendar: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
             <h1 className="text-3xl font-bold text-purple-700 mb-8">Calendário da Empresa</h1>
             
             <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <button className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
                    <h2 className="text-2xl font-semibold">Novembro 2025</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight /></button>
                </div>

                <div className="flex gap-4 mb-6 text-sm">
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                      <span>Seus Eventos</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                      <span>Ocupado (Outros)</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border border-gray-300 rounded"></div>
                      <span>Livre</span>
                   </div>
                </div>

                <div className="grid grid-cols-7 gap-4 text-center font-bold text-gray-500 mb-4">
                    <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sab</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {/* RF35: Visualize free vs occupied days */}
                    {[...Array(30)].map((_, i) => {
                        const day = i + 1;
                        const myEvent = [5, 29].includes(day);
                        const otherEvent = [12, 15, 22].includes(day);
                        
                        let bgClass = 'bg-white hover:bg-gray-50';
                        let borderClass = 'border-gray-200';
                        let textClass = 'text-gray-700';

                        if (myEvent) {
                           bgClass = 'bg-purple-100';
                           borderClass = 'border-purple-300';
                           textClass = 'text-purple-800 font-bold';
                        } else if (otherEvent) {
                           bgClass = 'bg-gray-200';
                           borderClass = 'border-gray-300';
                           textClass = 'text-gray-500';
                        }

                        return (
                            <div key={day} className={`h-28 border rounded-lg p-2 flex flex-col justify-between ${bgClass} ${borderClass} cursor-pointer`}>
                                <span className={`text-sm ${textClass}`}>{day}</span>
                                {myEvent && (
                                    <div className="text-xs bg-purple-600 text-white rounded p-1 truncate shadow-sm">
                                        Meu Evento
                                    </div>
                                )}
                                {otherEvent && (
                                    <div className="text-xs bg-gray-400 text-white rounded p-1 truncate">
                                       Indisponível
                                    </div>
                                )}
                                {!myEvent && !otherEvent && (
                                   <div className="text-[10px] text-green-600 text-center opacity-0 hover:opacity-100">
                                      Livre
                                   </div>
                                )}
                            </div>
                        )
                    })}
                </div>
             </div>
        </div>
    )
}
