
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Trash2, LogOut, User, Mail, Phone, MapPin, Camera, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Settings: React.FC = () => {
  const { user, updateProfile, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();
  
  // Mock state for RF39
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    avatar: user?.avatar || ''
  });

  const handleSave = () => {
    updateProfile(formData);
    alert('Dados atualizados com sucesso!');
  };

  const handleDeleteAccount = () => {
     if(confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível.')) {
        deleteAccount();
        navigate('/');
     }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">Configurações da Empresa</h1>

      <div className="bg-white border rounded-xl p-8 shadow-sm space-y-6">
         
         <h2 className="text-xl font-bold border-b pb-4 mb-4 flex items-center gap-2">
            <User className="text-purple-600" /> Dados da Empresa
         </h2>
         
         <div className="flex flex-col items-center mb-6">
             <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-purple-100 overflow-hidden mb-4">
                 <img src={formData.avatar || 'https://via.placeholder.com/150'} alt="Logo" className="w-full h-full object-cover" />
             </div>
             <div className="w-full max-w-md relative">
                 <label className="block text-xs font-bold text-gray-500 mb-1">URL do Logotipo</label>
                 <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <LinkIcon className="absolute left-3 top-2.5 text-gray-400" size={14} />
                        <input 
                            type="text" 
                            value={formData.avatar} 
                            onChange={e => setFormData({...formData, avatar: e.target.value})} 
                            placeholder="https://..."
                            className="w-full border border-gray-300 pl-9 p-2 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white text-black" 
                        />
                    </div>
                 </div>
             </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><User size={16}/> Razão Social</label>
               <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-3 rounded-lg focus:ring-purple-500 outline-none bg-white text-black" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Mail size={16}/> Email Comercial</label>
               <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-3 rounded-lg focus:ring-purple-500 outline-none bg-white text-black" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Phone size={16}/> Telefone</label>
               <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border p-3 rounded-lg focus:ring-purple-500 outline-none bg-white text-black" />
            </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><MapPin size={16}/> Endereço</label>
               <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border p-3 rounded-lg focus:ring-purple-500 outline-none bg-white text-black" />
            </div>
         </div>

         <div className="pt-4 flex justify-end">
            <button onClick={handleSave} className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700 transition-all">
               <Save size={18} /> Salvar Alterações
            </button>
         </div>
      </div>

      {/* RF38 Logout */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mt-8 flex justify-between items-center">
          <div>
              <h2 className="text-lg font-bold text-gray-800">Sessão</h2>
              <p className="text-sm text-gray-500">Desconectar deste dispositivo</p>
          </div>
          <button onClick={handleLogout} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50">
             <LogOut size={18} /> Sair
          </button>
      </div>

      {/* RF37 Delete Account */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 shadow-sm mt-6">
          <h2 className="text-lg font-bold text-red-700 mb-2">Zona de Perigo</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-red-600 text-sm">Ao deletar sua conta, todos os eventos e dados financeiros serão removidos.</p>
             <button onClick={handleDeleteAccount} className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-50">
                <Trash2 size={18} /> Deletar Conta
             </button>
          </div>
      </div>
    </div>
  );
};
