
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { EventProvider } from './context/EventContext';
import { Layout } from './components/Layout';
import { UserTypeSelect } from './pages/Auth/UserTypeSelect';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { ClientHome } from './pages/Client/Home';
import { LandingPage } from './pages/LandingPage';
import { EventDetails } from './pages/Client/EventDetails';
import { Cart } from './pages/Client/Cart';
import { Checkout } from './pages/Client/Checkout';
import { ClientProfile } from './pages/Client/Profile';
import { CompanyDashboard } from './pages/Company/Dashboard';
import { CreateEvent } from './pages/Company/CreateEvent';
import { CalendarView } from './pages/Client/Calendar';
import { Tickets } from './pages/Client/Tickets';
import { CompanyEvents } from './pages/Company/Events';
import { CompanyProfile } from './pages/Company/Profile';
import { FinancialData } from './pages/Company/Financial';
import { CompanyCalendar } from './pages/Company/Calendar';
import { Statistics } from './pages/Company/Statistics';
import { Settings } from './pages/Company/Settings';
import { History } from './pages/Company/History';
import { ClientSettings } from './pages/Client/Settings';
import { FreelancerHub } from './pages/Client/Freelancer';

// Route Guard that redirects to Landing Page if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    
    if (!user) {
        // User explicitly requested to start on Landing Page even if not logged in
        // So if they try to access a protected route, we send them to /
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <EventProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                {/* Default route points to Landing Page - The absolute entry point */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Public Routes */}
                <Route path="/type-select" element={<UserTypeSelect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/explore" element={<ClientHome />} />
                <Route path="/client/event/:id" element={<EventDetails />} />
                
                {/* Client Protected Routes */}
                <Route path="/client/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/client/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/client/profile" element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
                <Route path="/client/settings" element={<ProtectedRoute><ClientSettings /></ProtectedRoute>} />
                <Route path="/client/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
                <Route path="/client/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
                <Route path="/client/freelancer" element={<ProtectedRoute><FreelancerHub /></ProtectedRoute>} />

                {/* Company Protected Routes */}
                <Route path="/company/dashboard" element={<ProtectedRoute><CompanyDashboard /></ProtectedRoute>} />
                <Route path="/company/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
                <Route path="/company/edit-event/:id" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
                <Route path="/company/events" element={<ProtectedRoute><CompanyEvents /></ProtectedRoute>} />
                <Route path="/company/profile" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
                <Route path="/company/financial" element={<ProtectedRoute><FinancialData /></ProtectedRoute>} />
                <Route path="/company/calendar" element={<ProtectedRoute><CompanyCalendar /></ProtectedRoute>} />
                <Route path="/company/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
                <Route path="/company/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/company/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

                {/* Catch-all route redirects to Landing Page */}
                <Route path="*" element={<Navigate to="/" replace />} />
                
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
