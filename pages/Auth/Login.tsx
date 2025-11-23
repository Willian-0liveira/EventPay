
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Ticket, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserType } from '../../types';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = (searchParams.get('type') as UserType) || UserType.CLIENT;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, type);
    // Always redirect to Landing Page (Home) based on user request
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
        <ArrowLeft size={20} /> Voltar para Home
      </Link>
      
      <div className="mb-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-600 p-2 rounded-lg text-white">
              <Ticket size={24} />
            </div>
            <span className="text-2xl font-bold text-purple-700 tracking-tight">EventPay</span>
        </div>
        <h2 className="text-xl text-black font-normal">Faça Login no EventPay</h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder={type === UserType.COMPANY ? "Digite seu Email ou CNPJ" : "Digite seu Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <Mail className="absolute right-3 top-3.5 text-gray-500" size={20} />
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-purple-400 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-black"
            required
          />
          <Lock className="absolute right-3 top-3.5 text-gray-500" size={20} />
        </div>

        <div className="flex justify-end">
          <Link to="#" className="text-purple-600 text-sm">Esqueci minha senha</Link>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-800 transition-colors uppercase tracking-wider"
        >
          Entrar
        </button>

        <div className="text-center mt-2">
          <span className="text-gray-600">Não possui uma conta? </span>
          <Link to={`/register?type=${type}`} className="text-purple-600 font-medium">Cadastre-se</Link>
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
          {/* Google G Logo Placeholder */}
          <span className="font-bold text-lg" style={{color: '#4285F4'}}>G</span>
        </button>
      </form>
    </div>
  );
};
