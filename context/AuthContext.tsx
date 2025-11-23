
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, UserType } from '../types';
import { MOCK_USER, MOCK_COMPANY } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (emailOrCnpj: string, type: UserType, password?: string) => boolean;
  register: (userData: Partial<User>) => void;
  updateProfile: (data: Partial<User>) => void;
  deleteAccount: () => void;
  toggleFavorite: (eventId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('eventpay_session');
    if (storedSession) {
      setUser(JSON.parse(storedSession));
    } else {
        // Initialize mock users in local storage if empty (for demo purposes)
        const storedUsers = localStorage.getItem('eventpay_users');
        if (!storedUsers) {
            const initialUsers = [
                { ...MOCK_USER, password: '123', favorites: [] },
                { ...MOCK_COMPANY, password: '123', favorites: [] }
            ];
            localStorage.setItem('eventpay_users', JSON.stringify(initialUsers));
        }
    }
  }, []);

  const login = (emailOrCnpj: string, type: UserType, password?: string): boolean => {
    const storedUsersStr = localStorage.getItem('eventpay_users');
    const storedUsers: User[] = storedUsersStr ? JSON.parse(storedUsersStr) : [];

    // Simple check: find user by email/cnpj and type
    // In a real app, we would hash passwords. Here we just check generic match or mock.
    const foundUser = storedUsers.find(u => {
        const identifierMatch = type === UserType.CLIENT ? u.email === emailOrCnpj : (u.email === emailOrCnpj || u.cnpj === emailOrCnpj);
        return identifierMatch && u.type === type;
    });

    if (foundUser) {
      // Update session
      setUser(foundUser);
      localStorage.setItem('eventpay_session', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const register = (userData: Partial<User>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || 'Novo Usuário',
      email: userData.email || '',
      type: userData.type || UserType.CLIENT,
      cpf: userData.cpf,
      cnpj: userData.cnpj,
      phone: userData.phone,
      address: userData.address,
      avatar: 'https://via.placeholder.com/150',
      password: userData.password,
      favorites: [],
      ...userData
    } as User;

    // Save to "DB"
    const storedUsersStr = localStorage.getItem('eventpay_users');
    const storedUsers: User[] = storedUsersStr ? JSON.parse(storedUsersStr) : [];
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('eventpay_users', JSON.stringify(updatedUsers));

    // Login immediately
    setUser(newUser);
    localStorage.setItem('eventpay_session', JSON.stringify(newUser));
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('eventpay_session', JSON.stringify(updatedUser));

    // Update in "DB"
    const storedUsersStr = localStorage.getItem('eventpay_users');
    if (storedUsersStr) {
        const storedUsers: User[] = JSON.parse(storedUsersStr);
        const newUsersList = storedUsers.map(u => u.id === user.id ? updatedUser : u);
        localStorage.setItem('eventpay_users', JSON.stringify(newUsersList));
    }
  };

  const deleteAccount = () => {
      if (!user) return;
      
      const storedUsersStr = localStorage.getItem('eventpay_users');
      if (storedUsersStr) {
          const storedUsers: User[] = JSON.parse(storedUsersStr);
          const newUsersList = storedUsers.filter(u => u.id !== user.id);
          localStorage.setItem('eventpay_users', JSON.stringify(newUsersList));
      }
      logout();
  };

  const toggleFavorite = (eventId: string) => {
      if (!user) return;
      
      const currentFavorites = user.favorites || [];
      let newFavorites;
      
      if (currentFavorites.includes(eventId)) {
          newFavorites = currentFavorites.filter(id => id !== eventId);
      } else {
          newFavorites = [...currentFavorites, eventId];
      }

      updateProfile({ favorites: newFavorites });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventpay_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, deleteAccount, toggleFavorite, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
