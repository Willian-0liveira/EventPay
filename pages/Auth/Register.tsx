
import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Ticket, User as UserIcon, Mail, Bookmark, Calendar, Lock, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { UserType } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const type = (searchParams.get('type') as UserType) || UserType.CLIENT;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: '', // CPF or CNPJ
    phone: '',
    address: '',
    birthDate: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Map form data to User object structure
    const userData = {
      type,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      ...(type === UserType.CLIENT ? { cpf: formData.document } : { cnpj: formData.document }),
    };

    register(userData);
    
    // Always redirect to Landing Page to maintain flow start at Index
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 py-10">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
        <ArrowLeft size={20} /> Voltar para Home
      </Link>

      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-600 p-2 rounded-lg text-white">
              <Ticket size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-700 tracking-tight">EventPay</span>
        </div>
        <h2 className="text-xl text-black font-normal text-center">
          {type === UserType.COMPANY ? "Cadastro de Empresa" : "Faça seu cadastro no EventPay"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={type === UserType.CLIENT ? "Digite seu nome completo" : "Razão Social"}
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <UserIcon className="absolute right-3 top-3.5 text-gray-700" size={20} />
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite seu email"
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <Mail className="absolute right-3 top-3.5 text-gray-700" size={20} />
        </div>

        <div className="relative">
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleInputChange}
            placeholder={type === UserType.CLIENT ? "Digite seu CPF" : "Digite seu CNPJ"}
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <Bookmark className="absolute right-3 top-3.5 text-gray-700" size={20} />
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Telefone"
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <Phone className="absolute right-3 top-3.5 text-gray-700" size={20} />
        </div>

        <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Endereço Completo"
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <MapPin className="absolute right-3 top-3.5 text-gray-700" size={20} />
        </div>

        {type === UserType.CLIENT && (
          <div className="relative">
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              placeholder="Data de nascimento"
              className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            />
          </div>
        )}

        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Digite sua senha"
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <Lock className="absolute right-3 top-3.5 text-gray-700" size={20} />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-800 transition-colors uppercase tracking-wider mt-4"
        >
          Cadastrar
        </button>

        <div className="text-center mt-2">
          <span className="text-gray-600">Já possui uma conta? </span>
          <Link to={`/login?type=${type}`} className="text-purple-600 font-medium">Faça Login</Link>
        </div>

        <div className="flex items-center gap-4 my-2">
           <div className="h-px bg-purple-300 flex-1"></div>
           <span className="text-xs text-gray-500 uppercase">OU</span>
           <div className="h-px bg-purple-300 flex-1"></div>
        </div>

        <button
          type="button"
          className="w-full border border-purple-400 py-3 rounded-lg flex justify-center items-center hover:bg-gray-50"
        >
          <span className="font-bold text-lg" style={{color: '#4285F4'}}>G</span>
        </button>
      </form>
    </div>
  );
};
