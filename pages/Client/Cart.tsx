import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, Minus, Plus, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-8 text-purple-600">
        <ShoppingCart size={32} />
        <h1 className="text-3xl font-bold">Meu Carrinho</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">Seu carrinho está vazio.</p>
          <Link to="/client/home" className="text-purple-600 underline mt-4 inline-block">Voltar para Home</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.eventId}-${item.type}`} className="border rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-sm bg-white">
                <img src={item.eventImage} alt={item.eventTitle} className="w-20 h-20 rounded-lg object-cover" />
                
                <div className="flex-grow text-center md:text-left">
                  <h3 className="font-bold text-gray-900">{item.eventTitle}</h3>
                  <p className="text-sm text-gray-500">{item.type === 'Inteira' ? 'Inteira' : 'Meia'}</p>
                </div>

                <div className="text-gray-800 font-medium whitespace-nowrap">
                  R$: {item.price.toFixed(2).replace('.', ',')}
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.eventId, item.type, item.quantity - 1)}
                    className="bg-gray-300 text-white rounded-full w-8 h-8 flex items-center justify-center"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.eventId, item.type, item.quantity + 1)}
                    className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(item.eventId, item.type)}
                  className="text-red-500 p-2 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border rounded-xl p-6 h-fit bg-white shadow-sm">
            <h2 className="text-xl font-bold text-purple-700 mb-6">Resumo da Compra</h2>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-purple-700 text-xl">Total</span>
              <span className="font-bold text-purple-700 text-xl">R$: {total.toFixed(2).replace('.', ',')}</span>
            </div>

            <button 
              onClick={() => navigate('/client/checkout')}
              className="w-full bg-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-800"
            >
              <CreditCard size={20} /> Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
