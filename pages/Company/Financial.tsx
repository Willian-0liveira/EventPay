
import React, { useState } from 'react';
import { DollarSign, CreditCard, Save, Edit2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FinancialData: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock state initialized with user data or defaults
  const [bankData, setBankData] = useState({
     agency: user?.bankingData?.agency || '',
     account: user?.bankingData?.account || '',
     pixKey: user?.bankingData?.pixKey || ''
  });

  const handleSave = () => {
     setIsEditing(false);
     alert('Dados bancários atualizados com sucesso!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
       <h1 className="text-3xl font-bold text-purple-700 mb-8">Dados Financeiros</h1>

       <div className="grid md:grid-cols-2 gap-8">
          
          {/* RF31, RF32 Banking Data Form */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                   <CreditCard className="text-purple-600" /> Dados Bancários
                </h2>
                <button 
                   onClick={() => setIsEditing(!isEditing)} 
                   className="text-purple-600 hover:bg-purple-50 p-2 rounded-full"
                >
                   <Edit2 size={18} />
                </button>
             </div>

             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Agência</label>
                   <input 
                      type="text" 
                      value={bankData.agency}
                      onChange={e => setBankData({...bankData, agency: e.target.value})}
                      disabled={!isEditing}
                      className="w-full border p-3 rounded-lg bg-white text-black disabled:text-gray-500 disabled:bg-gray-50" 
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Conta</label>
                   <input 
                      type="text" 
                      value={bankData.account}
                      onChange={e => setBankData({...bankData, account: e.target.value})}
                      disabled={!isEditing}
                      className="w-full border p-3 rounded-lg bg-white text-black disabled:text-gray-500 disabled:bg-gray-50" 
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Chave PIX</label>
                   <input 
                      type="text" 
                      value={bankData.pixKey}
                      onChange={e => setBankData({...bankData, pixKey: e.target.value})}
                      disabled={!isEditing}
                      className="w-full border p-3 rounded-lg bg-white text-black disabled:text-gray-500 disabled:bg-gray-50" 
                   />
                </div>
                
                {isEditing && (
                   <button onClick={handleSave} className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 mt-4">
                      <Save size={18} /> Salvar Alterações
                   </button>
                )}
             </div>
          </div>

          {/* RF33 Payments Received */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                   <DollarSign className="text-green-600" /> Pagamentos Recebidos
              </h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                 {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0">
                       <div>
                          <p className="font-bold text-gray-800">Venda de Ingresso #{1000+i}</p>
                          <p className="text-xs text-gray-500">10/10/2025 - 14:30</p>
                       </div>
                       <span className="text-green-600 font-bold">+ R$ 150,00</span>
                    </div>
                 ))}
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between items-center">
                 <span className="font-bold text-gray-600">Total Acumulado:</span>
                 <span className="font-bold text-2xl text-purple-700">R$ 45.200,00</span>
              </div>
          </div>
       </div>
    </div>
  );
};
