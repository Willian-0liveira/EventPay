
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, Award } from 'lucide-react';

const dataSales = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 2000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 1890 },
  { name: 'Jun', vendas: 2390 },
];

const dataGenre = [
  { name: 'Shows', value: 400 },
  { name: 'Festivais', value: 300 },
  { name: 'Teatro', value: 100 },
];

const COLORS = ['#9333EA', '#C084FC', '#E9D5FF'];

export const Statistics: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">Estatísticas e Ranking</h1>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
         <div className="bg-purple-600 rounded-xl p-6 text-white shadow-lg col-span-3 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <Award size={32} className="text-yellow-300" />
               <h2 className="text-xl font-bold">Ranking Regional</h2>
            </div>
            <p className="text-4xl font-bold mb-2">#3</p>
            <p className="text-purple-200 text-sm">Sua empresa está entre as 3 que mais venderam este mês!</p>
         </div>
         
         <div className="bg-white border rounded-xl p-6 shadow-sm col-span-3 md:col-span-2">
             <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
               <TrendingUp size={20} /> Crescimento
            </h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataSales}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="vendas" name="Vendas" stroke="#9333EA" strokeWidth={3} dot={{ r: 4, fill: "#9333EA" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border p-6 rounded-xl shadow-sm h-96">
          <h3 className="text-xl font-bold mb-6">Vendas Mensais</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataSales}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#F3E8FF' }} />
              <Legend />
              <Bar dataKey="vendas" name="Vendas" fill="#9333EA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm h-96">
          <h3 className="text-xl font-bold mb-6">Vendas por Categoria</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataGenre}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {dataGenre.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
