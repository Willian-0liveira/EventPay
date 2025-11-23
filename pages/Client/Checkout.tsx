
import React, { useState } from 'react';
import { ShoppingCart, CreditCard, QrCode } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const { total, checkout } = useCart();
  const [method, setMethod] = useState<'credit' | 'pix'>('pix');
  const navigate = useNavigate();

  const handleFinish = () => {
    // In a real app, validation would happen here
    checkout();
    alert('Compra realizada com sucesso! Seus ingressos estão disponíveis.');
    navigate('/client/tickets');
  };

  // Generate a realistic PIX QR Code string (mock data encoded)
  const pixString = `00020126330014BR.GOV.BCB.PIX0114+551199999999520400005303986540${total.toFixed(2).replace('.', '')}5802BR5913EventPay Ltda6009SAO PAULO62070503***6304E2CA`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixString)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-8 text-purple-600">
        <ShoppingCart size={32} />
        <h1 className="text-3xl font-bold">Finalizar Pagamento</h1>
      </div>

      <div className="max-w-3xl mx-auto border rounded-2xl p-8 bg-white shadow-sm">
        <h2 className="text-center text-xl font-bold text-purple-700 mb-8">Informações do Pagamento</h2>

        <div className="flex flex-col gap-4 mb-8">
          <button 
            onClick={() => setMethod('credit')}
            className={`border rounded-lg p-4 flex items-center gap-4 text-left ${method === 'credit' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}
          >
            <div className="bg-purple-600 p-2 rounded text-white">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm font-medium">Cartão de Crédito</p>
              <p className="text-xs text-gray-500">Pague com seu cartão de crédito</p>
            </div>
          </button>

          <button 
            onClick={() => setMethod('pix')}
            className={`border rounded-lg p-4 flex items-center gap-4 text-left ${method === 'pix' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}
          >
             <div className="bg-purple-600 p-2 rounded text-white">
              <QrCode size={24} />
            </div>
            <div>
              <p className="text-sm font-medium">PIX</p>
              <p className="text-xs text-gray-500">Pagamento instantâneo via PIX</p>
            </div>
          </button>
        </div>

        {method === 'pix' && (
          <div className="flex flex-col items-center justify-center mb-8">
             <p className="text-sm text-gray-600 mb-4 font-medium">Escaneie o QR Code abaixo para pagar:</p>
             <div className="border-4 border-black p-2 bg-white rounded-lg shadow-inner">
               {/* Active QR Code Generation */}
               <img src={qrCodeUrl} alt="QR Code PIX" className="w-48 h-48" />
            </div>
            <p className="text-xs text-gray-400 mt-2">Expira em 30 minutos</p>
          </div>
        )}
        
        {method === 'credit' && (
           <div className="mb-8 space-y-4">
             <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <label className="block text-xs font-bold text-gray-700 mb-1">Número do Cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full border p-2 rounded" />
                <div className="flex gap-4 mt-4">
                   <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-700 mb-1">Validade</label>
                     <input type="text" placeholder="MM/AA" className="w-full border p-2 rounded" />
                   </div>
                   <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                     <input type="text" placeholder="123" className="w-full border p-2 rounded" />
                   </div>
                </div>
                <label className="block text-xs font-bold text-gray-700 mt-4 mb-1">Nome no Cartão</label>
                <input type="text" placeholder="Nome impresso no cartão" className="w-full border p-2 rounded" />
             </div>
           </div>
        )}

        <div className="flex justify-between items-center mb-6 px-4 md:px-10 py-4 bg-gray-50 rounded-lg">
           <span className="text-xl font-bold text-gray-700">Total a pagar</span>
           <span className="text-2xl font-bold text-purple-700">R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>

        <div className="flex justify-center">
            <button 
              onClick={handleFinish}
              className="w-full max-w-sm bg-purple-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-800 shadow-lg transition-all transform hover:scale-105"
            >
              <CreditCard size={20} /> Confirmar Pagamento
            </button>
        </div>
      </div>
    </div>
  );
};
