
import React, { useState, useEffect } from 'react';
import { Upload, Share2, Plus, Save, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { Event } from '../../types';

export const CreateEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addEvent, updateEvent, getEventById } = useEvents();
  const { user } = useAuth();
  
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    priceInteira: '',
    priceMeia: '',
    image: '',
    category: 'Shows'
  });

  useEffect(() => {
    if (id) {
      const existingEvent = getEventById(id);
      if (existingEvent) {
        setFormData({
          title: existingEvent.title,
          date: existingEvent.date,
          time: existingEvent.time,
          location: existingEvent.location,
          description: existingEvent.description,
          priceInteira: existingEvent.priceInteira.toString(),
          priceMeia: existingEvent.priceMeia.toString(),
          image: existingEvent.image,
          category: existingEvent.category
        });
      }
    }
  }, [id, getEventById]);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    setShared(true);
    alert('Link de pré-visualização copiado!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    const eventData: any = {
      title: formData.title,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      priceInteira: parseFloat(formData.priceInteira),
      priceMeia: parseFloat(formData.priceMeia),
      image: formData.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      category: formData.category,
      organizerId: user.id,
      status: 'FUTURE'
    };

    if (id) {
      updateEvent(id, eventData);
      alert('Evento atualizado com sucesso!');
    } else {
      eventData.id = Math.random().toString(36).substr(2, 9);
      addEvent(eventData as Event);
      alert('Evento criado com sucesso!');
    }

    setLoading(false);
    navigate('/company/events');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
         <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft size={24} />
         </button>
         <h1 className="text-3xl font-bold text-purple-700">{id ? 'Editar Evento' : 'Criar Novo Evento'}</h1>
         {shared && <span className="ml-auto text-green-600 font-medium flex items-center gap-1 text-sm bg-green-50 px-3 py-1 rounded-full">Link Copiado <Share2 size={14} /></span>}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border shadow-sm">
        
        {/* Image URL Input */}
        <div className="space-y-2">
             <label className="block text-sm font-medium text-gray-700">Imagem do Evento (URL)</label>
             <div className="flex gap-4 items-start">
                <div className="flex-1">
                    <div className="relative">
                        <Upload size={20} className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="text" 
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            placeholder="https://exemplo.com/imagem.jpg"
                            className="w-full border pl-10 p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black" 
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Cole o link de uma imagem hospedada.</p>
                </div>
                <div className="w-24 h-24 bg-gray-100 rounded-lg border overflow-hidden flex-shrink-0">
                    {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Upload size={24} />
                        </div>
                    )}
                </div>
             </div>
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Evento</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black" 
                placeholder="Ex: Show de Rock" 
                required
              />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
               <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black" 
                    required
                />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
               <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black" 
                    required
               />
            </div>
             <div className="md:col-span-2">
               <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
               <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black" 
                    placeholder="Endereço completo" 
                    required
                />
            </div>
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full border p-3 rounded-lg h-32 focus:ring-2 focus:ring-purple-600 outline-none resize-none bg-white text-black" 
            placeholder="Detalhes do evento, atrações, regras..."
            required
          ></textarea>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Gênero/Categoria</label>
               <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black"
               >
                  <option>Shows</option>
                  <option>Teatros</option>
                  <option>Festivais</option>
                  <option>Esportes</option>
                  <option>Cursos</option>
                  <option>Excursões</option>
               </select>
            </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor Inteira (R$)</label>
              <input 
                type="number" 
                value={formData.priceInteira}
                onChange={(e) => setFormData({...formData, priceInteira: e.target.value})}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black" 
                placeholder="0.00" 
                required
                step="0.01"
              />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valor Meia (R$)</label>
              <input 
                type="number" 
                value={formData.priceMeia}
                onChange={(e) => setFormData({...formData, priceMeia: e.target.value})}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none bg-white text-black" 
                placeholder="0.00" 
                required
                step="0.01"
              />
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4">
           <button type="submit" disabled={loading} className="flex-1 bg-purple-700 text-white font-bold py-3 rounded-lg hover:bg-purple-800 flex items-center justify-center gap-2 disabled:opacity-70">
               {id ? <Save size={20} /> : <Plus size={20} />} {id ? 'Salvar Alterações' : 'Publicar Evento'}
           </button>
           
           <button onClick={handleShare} type="button" className="md:w-auto px-8 border border-purple-600 text-purple-600 font-bold py-3 rounded-lg hover:bg-purple-50 flex items-center justify-center gap-2">
               <Share2 size={20} /> Compartilhar
           </button>
        </div>
        
        {!id && (
            <p className="text-center text-xs text-gray-400">
            Você pode editar este evento posteriormente na aba "Meus Eventos".
            </p>
        )}

      </form>
    </div>
  );
};
