import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Ticket } from 'lucide-react';
import { UserType } from '../../types';

export const UserTypeSelect: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (type: UserType) => {
    // Pass the type to the next screen (login/register) via state or URL params if needed
    // For this flow, we will navigate to login, and login will handle logic based on "mock" selection
    navigate(`/login?type=${type}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 flex flex-col items-center">
         <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-600 p-2 rounded-lg text-white">
              <Ticket size={32} />
            </div>
            <span className="text-3xl font-bold text-purple-700 tracking-tight">EventPay</span>
          </div>
        <h1 className="text-2xl font-medium text-black">Selecione o tipo de registro</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center">
        {/* Cliente Card */}
        <button 
          onClick={() => handleSelect(UserType.CLIENT)}
          className="flex-1 border-2 border-purple-600 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-purple-50 transition-colors h-64"
        >
          <div className="bg-purple-600 p-4 rounded-full text-white">
            <User size={48} />
          </div>
          <span className="text-xl font-bold text-purple-700">Cliente</span>
        </button>

        {/* Empresa Card */}
        <button 
          onClick={() => handleSelect(UserType.COMPANY)}
          className="flex-1 border-2 border-purple-600 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-purple-50 transition-colors h-64"
        >
          <div className="bg-white border-2 border-purple-600 p-4 rounded-lg text-purple-600">
            <Building2 size={48} />
          </div>
          <span className="text-xl font-bold text-purple-700">Empresa</span>
        </button>
      </div>
    </div>
  );
};
