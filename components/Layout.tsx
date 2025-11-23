
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Ticket, ShoppingCart, User as UserIcon, LogOut, Menu, X, Home, LayoutDashboard, DollarSign, BarChart, Briefcase, Settings, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { UserType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage = ['/login', '/register', '/type-select'].includes(location.pathname);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header - Glassmorphism / Modern */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-purple-600 p-1.5 rounded-xl text-white shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
              <Ticket size={22} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-purple-700 transition-colors">EventPay</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {!user ? (
              // Public Navigation
              <>
                <Link to="/explore" className="hover:text-purple-600 transition-colors flex items-center gap-1.5">
                  <Home size={18} /> Explorar
                </Link>
                <a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-1.5">
                   <Info size={18} /> Sobre
                </a>
              </>
            ) : (
              // Authenticated Navigation
              user.type === UserType.CLIENT ? (
                <>
                  <Link to="/explore" className={`flex items-center gap-1.5 hover:text-purple-600 transition-colors ${location.pathname === '/explore' ? 'text-purple-600' : ''}`}>
                    <Home size={18} /> Explorar
                  </Link>
                  <Link to="/client/freelancer" className={`flex items-center gap-1.5 hover:text-purple-600 transition-colors ${location.pathname === '/client/freelancer' ? 'text-purple-600' : ''}`}>
                    <Briefcase size={18} /> Freelancer
                  </Link>
                  <Link to="/client/calendar" className={`flex items-center gap-1.5 hover:text-purple-600 transition-colors ${location.pathname === '/client/calendar' ? 'text-purple-600' : ''}`}>
                    <Calendar size={18} /> Agenda
                  </Link>
                  <Link to="/client/tickets" className={`flex items-center gap-1.5 hover:text-purple-600 transition-colors ${location.pathname === '/client/tickets' ? 'text-purple-600' : ''}`}>
                    <Ticket size={18} /> Ingressos
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/company/dashboard" className="flex items-center gap-1.5 hover:text-purple-600 transition-colors">
                    <LayoutDashboard size={18} /> Painel
                  </Link>
                  <Link to="/company/events" className="flex items-center gap-1.5 hover:text-purple-600 transition-colors">
                    <Ticket size={18} /> Eventos
                  </Link>
                  <Link to="/company/financial" className="flex items-center gap-1.5 hover:text-purple-600 transition-colors">
                    <DollarSign size={18} /> Financeiro
                  </Link>
                  <Link to="/company/statistics" className="flex items-center gap-1.5 hover:text-purple-600 transition-colors">
                    <BarChart size={18} /> Relatórios
                  </Link>
                </>
              )
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user && user.type === UserType.CLIENT && (
                <Link to="/client/cart" className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all">
                    <ShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                        {cartItemCount}
                      </span>
                    )}
                </Link>
            )}
            
            {!user ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login" 
                  className="px-5 py-2 rounded-full text-gray-700 font-bold hover:bg-gray-100 transition-colors text-sm"
                >
                  Entrar
                </Link>
                <Link 
                  to="/type-select" 
                  className="px-5 py-2 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-200 text-sm"
                >
                  Cadastrar
                </Link>
              </div>
            ) : (
              <Link to={user.type === UserType.CLIENT ? "/client/profile" : "/company/profile"} className="flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="text-right hidden lg:block">
                      <p className="text-sm font-bold text-gray-800 leading-none">{user.name.split(' ')[0]}</p>
                      <p className="text-xs text-gray-500 mt-0.5 capitalize">{user.type.toLowerCase()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 p-0.5 shadow-sm overflow-hidden hover:ring-2 hover:ring-purple-400 transition-all">
                     {user.avatar ? 
                        <img src={user.avatar} alt="avatar" className="w-full h-full object-cover rounded-full"/> : 
                        <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-600"><UserIcon size={20} /></div>
                     }
                  </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-2 animate-in slide-in-from-top-5">
             {!user ? (
                <>
                  <Link to="/explore" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 font-medium">
                      <Home size={18}/> Explorar
                  </Link>
                  <Link to="/login" className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 font-medium">
                      <UserIcon size={18}/> Entrar
                  </Link>
                  <Link to="/type-select" className="flex items-center gap-3 p-3 rounded-lg bg-purple-600 text-white font-bold shadow-md">
                      Cadastrar
                  </Link>
                </>
             ) : (
                user.type === UserType.CLIENT ? (
                  <>
                    <Link to="/explore" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                        <Home size={18}/> Explorar
                    </Link>
                    <Link to="/client/freelancer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                        <Briefcase size={18}/> Freelancer
                    </Link>
                    <Link to="/client/tickets" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                        <Ticket size={18}/> Meus Ingressos
                    </Link>
                    <Link to="/client/cart" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                        <ShoppingCart size={18}/> Carrinho ({cartItemCount})
                    </Link>
                    <Link to="/client/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                        <Settings size={18}/> Configurações
                    </Link>
                  </>
                ) : (
                   <>
                    <Link to="/company/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">Home</Link>
                    <Link to="/company/events" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">Eventos</Link>
                    <Link to="/company/financial" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">Financeiro</Link>
                    <Link to="/company/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700">Perfil</Link>
                   </>
                )
             )}
             
             {user && (
                <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 font-medium mt-2 border-t">
                  <LogOut size={18} /> Sair da conta
                </button>
             )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 mt-auto border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="bg-purple-600 p-1.5 rounded-lg text-white">
                  <Ticket size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-900">EventPay</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                A plataforma mais completa para viver experiências inesquecíveis. Compre ingressos, gerencie eventos ou trabalhe como freelancer.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-16 text-sm">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-gray-900">Empresa</h4>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Sobre Nós</a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Carreiras</a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Blog</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-gray-900">Ajuda</h4>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Central de Suporte</a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Termos de Uso</a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Privacidade</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-gray-900">Social</h4>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Instagram</a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <span>© 2025 EventPay Tecnologia Ltda. Todos os direitos reservados.</span>
            <div className="flex gap-4">
                <span>CNPJ 00.000.000/0001-00</span>
                <span>São Paulo, Brasil</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
