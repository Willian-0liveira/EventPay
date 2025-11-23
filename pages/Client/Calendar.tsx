import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarView: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
             <h1 className="text-3xl font-bold text-purple-700 mb-8">Calendário de Eventos</h1>
             
             <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                    <button className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
                    <h2 className="text-2xl font-semibold">Novembro 2025</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight /></button>
                </div>

                <div className="grid grid-cols-7 gap-4 text-center font-bold text-gray-500 mb-4">
                    <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sab</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {/* Mock dates */}
                    {[...Array(30)].map((_, i) => {
                        const day = i + 1;
                        const hasEvent = [5, 12, 22].includes(day);
                        return (
                            <div key={day} className={`h-24 border rounded-lg p-2 flex flex-col justify-between ${hasEvent ? 'bg-purple-50 border-purple-200 cursor-pointer hover:bg-purple-100' : ''}`}>
                                <span className={`text-sm ${hasEvent ? 'font-bold text-purple-700' : 'text-gray-700'}`}>{day}</span>
                                {hasEvent && (
                                    <div className="text-xs bg-purple-600 text-white rounded p-1 truncate">
                                        Evento...
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