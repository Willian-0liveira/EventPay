
import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, DollarSign, Clock, CheckCircle, Search } from 'lucide-react';
import { MOCK_JOBS } from '../../data/mockData';

export const FreelancerHub: React.FC = () => {
  const [filter, setFilter] = useState('');

  const filteredJobs = MOCK_JOBS.filter(job => 
    job.role.toLowerCase().includes(filter.toLowerCase()) || 
    job.eventTitle.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header Section */}
        <div className="bg-purple-700 text-white pt-12 pb-24 px-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl -top-20 -left-20 opacity-50"></div>
                <div className="absolute w-80 h-80 bg-pink-500 rounded-full blur-3xl bottom-0 right-0 opacity-30"></div>
             </div>
             
             <div className="container mx-auto max-w-5xl relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Trabalhe nos Melhores Eventos</h1>
                <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
                    Conecte-se com organizadores e ganhe uma renda extra trabalhando como staff, segurança, barman e muito mais.
                </p>
                
                <div className="bg-white p-2 rounded-full shadow-xl max-w-2xl mx-auto flex">
                    <div className="flex-grow relative">
                        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Busque por cargo (ex: Segurança) ou evento..." 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full py-3 pl-12 pr-4 rounded-full outline-none bg-white text-black"
                        />
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full font-bold transition-colors hidden md:block">
                        Buscar Vagas
                    </button>
                </div>
             </div>
        </div>

        <div className="container mx-auto px-4 -mt-12 relative z-20 max-w-5xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div>
                     <h3 className="font-bold text-gray-800">Complete seu Perfil Profissional</h3>
                     <p className="text-sm text-gray-500">Adicione suas experiências para aumentar suas chances.</p>
                 </div>
                 <button className="text-purple-600 font-bold text-sm border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                     Editar Perfil
                 </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="text-purple-600" /> Vagas Disponíveis
            </h2>

            <div className="grid gap-6">
                {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                            <img src={job.image} alt={job.eventTitle} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{job.role}</h3>
                                    <p className="text-purple-600 font-medium">{job.eventTitle}</p>
                                </div>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 mt-2 md:mt-0">
                                    <DollarSign size={14} /> R$ {job.payment.toFixed(2)}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1"><Calendar size={16}/> {new Date(job.date).toLocaleDateString('pt-BR')}</span>
                                <span className="flex items-center gap-1"><Clock size={16}/> {job.time}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.requirements.map((req, idx) => (
                                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                                        {req}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => alert('Candidatura enviada com sucesso!')}
                                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center gap-2"
                                >
                                    <CheckCircle size={18} /> Candidatar-se
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredJobs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Nenhuma vaga encontrada com os termos pesquisados.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
