
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Trash2, LogOut, User, Mail, Phone, MapPin, Calendar, Lock, Camera, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClientSettings: React.FC = () => {
  const { user, updateProfile, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    password: user?.password || '',
    birthDate: user?.birthDate || '',
    avatar: user?.avatar || ''
  });

  const handleSave = () => {
    updateProfile(formData);
    alert('Perfil atualizado com sucesso!');
  };

  const handleDeleteAccount = () => {
     if(confirm('Tem certeza que deseja deletar sua conta? Esta ação é irreversível e você perderá o acesso aos seus ingressos.')) {
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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
         <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
            <User size={24} />
         </div>
         <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
          {/* Left Sidebar (Menu) */}
          <div className="md:col-span-1 space-y-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-md relative group">
                      <img src={formData.avatar || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                  <button onClick={handleLogout} className="text-red-600 text-sm font-medium hover:underline flex items-center justify-center gap-1">
                      <LogOut size={14} /> Sair
                  </button>
              </div>
          </div>

          {/* Right Content (Forms) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <User size={20} className="text-purple-600"/> Dados Pessoais
                </h2>
                
                <div className="space-y-6">
                    {/* Avatar URL Input */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Camera size={16} /> Foto de Perfil (URL)
                        </label>
                        <div className="flex gap-2">
                            <div className="relative flex-grow">
                                <LinkIcon className="absolute left-3 top-3 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    value={formData.avatar} 
                                    onChange={e => setFormData({...formData, avatar: e.target.value})} 
                                    placeholder="Cole o link da sua imagem aqui (https://...)"
                                    className="w-full border border-gray-300 pl-10 p-2.5 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white text-black" 
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Recomendamos usar imagens quadradas.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome Completo</label>
                            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white text-black" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white text-black" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
                            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white text-black" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Data de Nascimento</label>
                            <input type="date" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white text-black" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Endereço</label>
                        <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white text-black" />
                    </div>
                    
                    <div className="pt-4 border-t">
                         <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Nova senha" className="w-full border border-gray-300 pl-10 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white text-black" />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button onClick={handleSave} className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-1">
                            <Save size={18} /> Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-lg font-bold text-red-700 mb-2">Zona de Perigo</h2>
                <p className="text-red-600/80 mb-6 text-sm">Ao deletar sua conta, todos os seus dados e ingressos serão removidos permanentemente.</p>
                <button onClick={handleDeleteAccount} className="text-red-600 border border-red-200 bg-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-red-50 transition-colors text-sm">
                    <Trash2 size={16} /> Deletar Minha Conta
                </button>
            </div>
          </div>
      </div>
    </div>
  );
};
