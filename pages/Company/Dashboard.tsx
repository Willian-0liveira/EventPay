
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Users, Ticket, ArrowRight, BarChart, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-700">Olá, {user.name}</h1>
          <p className="text-gray-500">CNPJ: {user.cnpj} - Gerencie seus eventos e vendas.</p>
        </div>
        <Link to="/company/create-event" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-md">
          <Plus size={20} /> Novo Evento
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-2">
             <div className="bg-purple-100 p-3 rounded-full text-purple-600">
               <Ticket size={24} />
             </div>
             <h3 className="text-gray-500 font-medium">Eventos Ativos</h3>
          </div>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-2">
             <div className="bg-green-100 p-3 rounded-full text-green-600">
               <Users size={24} />
             </div>
             <h3 className="text-gray-500 font-medium">Ingressos Vendidos</h3>
          </div>
          <p className="text-3xl font-bold">1,240</p>
        </div>
         <div className="bg-white border p-6 rounded-xl shadow-sm">
          <Link to="/company/calendar" className="flex items-center gap-4 mb-2 hover:text-purple-600">
             <div className="bg-blue-100 p-3 rounded-full text-blue-600">
               <Calendar size={24} />
             </div>
             <h3 className="text-gray-500 font-medium">Calendário</h3>
          </Link>
          <p className="text-xs text-gray-400 mt-2">Ver agenda completa</p>
        </div>
        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <Link to="/company/statistics" className="flex items-center gap-4 mb-2 hover:text-purple-600">
             <div className="bg-orange-100 p-3 rounded-full text-orange-600">
               <BarChart size={24} />
             </div>
             <h3 className="text-gray-500 font-medium">Estatísticas</h3>
          </Link>
          <p className="text-xs text-gray-400 mt-2">Ver relatórios</p>
        </div>
      </div>

      {/* Quick Links & Lists */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile & Actions */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             <UserIcon size={20} /> Perfil da Empresa
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
               <img src={user.avatar} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
               <h3 className="font-bold text-lg">{user.name}</h3>
               <p className="text-sm text-gray-500">{user.address}</p>
            </div>
            <Link to="/company/profile" className="ml-auto text-purple-600 text-sm font-bold border border-purple-200 px-3 py-1 rounded hover:bg-purple-50">
               Ver Perfil
            </Link>
          </div>
          <hr className="my-4"/>
          <div className="grid grid-cols-2 gap-4">
             <Link to="/company/financial" className="p-3 bg-gray-50 rounded text-center hover:bg-purple-50 text-gray-700 font-medium">
                Dados Bancários
             </Link>
             <Link to="/company/history" className="p-3 bg-gray-50 rounded text-center hover:bg-purple-50 text-gray-700 font-medium">
                Histórico de Eventos
             </Link>
          </div>
        </div>

        {/* Recent Customers / Sales */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             <Users size={20} /> Últimos Clientes
          </h2>
          <div className="space-y-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                     <div>
                        <p className="font-medium text-sm">Cliente {i}</p>
                        <p className="text-xs text-gray-500">Comprou: São Rock</p>
                     </div>
                  </div>
                  <span className="text-xs text-gray-400">Há 2h</span>
               </div>
             ))}
          </div>
          <button className="w-full mt-4 text-purple-600 text-sm font-bold flex items-center justify-center gap-1">
             Ver todos <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
