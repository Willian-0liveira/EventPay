
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../types';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-purple-200 rounded-lg bg-white overflow-hidden">
      <button 
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-purple-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 font-medium">{question}</span>
        {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-purple-50 text-gray-600 text-sm border-t border-purple-100">
          {answer}
        </div>
      )}
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const { events } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Show a preview of events on the landing page
  const filteredEvents = events.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Determine CTA destination based on auth state
  const getCtaDestination = () => {
    if (!user) return "/type-select";
    return user.type === UserType.CLIENT ? "/explore" : "/company/dashboard";
  };

  const getCtaText = () => {
    if (!user) return "Comece Agora";
    return "Acessar Plataforma";
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-purple-50/50 pt-10 pb-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-purple-700 leading-tight uppercase">
              Venda de Ingressos de forma Fácil
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              Divulgue seus eventos e venda ingressos online sem complicações. 
              Nossa plataforma é fácil de usar e perfeita para qualquer tipo de evento.
            </p>
            <div className="pt-4">
              <Link 
                to={getCtaDestination()}
                className="inline-block px-8 py-4 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition-colors shadow-lg shadow-purple-200 uppercase tracking-wide"
              >
                {getCtaText()}
              </Link>
            </div>
          </div>
          
          <div className="flex-1 relative">
             {/* Image collage effect based on the screenshot */}
             <div className="relative z-10">
               <img 
                 src="https://www.eventosemsp.com.br/img/grande/escola-02.jpg"
                  alt="Concerto" 
                 className="rounded-[2rem]"
               />
             </div>
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-50 blur-xl"></div>
             <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-purple-50/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            Pesquise pelos principais eventos da sua Região
          </h2>
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Pesquisar por eventos, Shows, Teatros, Festivais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-purple-200 rounded-full py-4 px-8 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black placeholder-gray-500 shadow-sm"
            />
            <button type="submit" className="absolute right-4 top-2.5 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filteredEvents.map(event => {
              const eventDate = new Date(event.date);
              const day = eventDate.getDate();
              const month = eventDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
              const weekDay = eventDate.toLocaleString('pt-BR', { weekday: 'short' }).toUpperCase().replace('.', '');
              
              return (
                <Link key={event.id} to={`/client/event/${event.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-3xl mb-4 aspect-square bg-gray-100 shadow-sm border border-gray-100">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-200 shadow-lg text-center flex flex-col w-14">
                        <div className="bg-black text-white text-[10px] font-bold py-0.5 uppercase">{month}</div>
                        <div className="text-xl font-extrabold text-gray-900 leading-none pt-1">{day}</div>
                        <div className="text-[10px] font-bold text-gray-500 pb-1 uppercase">{weekDay}</div>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase font-medium tracking-wide mt-1">
                      {event.location}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
             <Link to="/explore" className="text-purple-700 font-bold hover:underline">Ver todos os eventos</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-purple-50/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            <FAQItem 
              question="Quais formas de pagamento são aceitas?" 
              answer="Aceitamos cartões de crédito (Visa, Mastercard, Elo), Pix e Boleto Bancário. O pagamento via Pix é aprovado instantaneamente."
            />
            <FAQItem 
              question="Como recebo meu ingresso?" 
              answer="Após a confirmação do pagamento, seu ingresso ficará disponível na seção 'Meus Ingressos' do site e também será enviado para o seu e-mail cadastrado."
            />
            <FAQItem 
              question="Posso cancelar minha compra?" 
              answer="Sim, o cancelamento pode ser solicitado em até 7 dias após a compra, desde que seja feito pelo menos 48 horas antes do início do evento."
            />
            <FAQItem 
              question="Como entro em contato?" 
              answer="Você pode entrar em contato conosco através do e-mail suporte@eventpay.com.br ou pelo chat disponível na Central de Ajuda."
            />
          </div>
        </div>
      </section>
    </div>
  );
};
