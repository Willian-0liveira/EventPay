
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, PurchasedTicket } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (eventId: string, type: 'Inteira' | 'Meia') => void;
  updateQuantity: (eventId: string, type: 'Inteira' | 'Meia', quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  total: number;
  tickets: PurchasedTicket[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [tickets, setTickets] = useState<PurchasedTicket[]>([]);

  // Load tickets from local storage on mount or when user changes
  useEffect(() => {
      const storedTicketsStr = localStorage.getItem('eventpay_tickets');
      if (storedTicketsStr) {
          const allTickets: PurchasedTicket[] = JSON.parse(storedTicketsStr);
          if (user) {
              // Filter tickets for current user
              setTickets(allTickets.filter(t => t.userId === user.id));
          } else {
              setTickets([]);
          }
      }
  }, [user]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(i => i.eventId === newItem.eventId && i.type === newItem.type);
      if (existing) {
        return prev.map(i => 
          (i.eventId === newItem.eventId && i.type === newItem.type)
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (eventId: string, type: 'Inteira' | 'Meia') => {
    setItems(prev => prev.filter(i => !(i.eventId === eventId && i.type === type)));
  };

  const updateQuantity = (eventId: string, type: 'Inteira' | 'Meia', quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => 
      (i.eventId === eventId && i.type === type) ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  const checkout = () => {
    if (!user) return;

    const newTickets: PurchasedTicket[] = items.map(item => ({
      ...item,
      ticketId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      purchaseDate: new Date().toISOString(),
      status: 'VALID',
      userId: user.id
    }));
    
    // Update state
    const updatedTickets = [...tickets, ...newTickets];
    setTickets(updatedTickets);
    setItems([]);

    // Update Local Storage (Merge with existing tickets from other users)
    const storedTicketsStr = localStorage.getItem('eventpay_tickets');
    const allExistingTickets: PurchasedTicket[] = storedTicketsStr ? JSON.parse(storedTicketsStr) : [];
    
    // We need to be careful not to duplicate logic if we were filtering. 
    // Simplest strategy: Get all, add new, save all.
    const finalStorage = [...allExistingTickets, ...newTickets];
    localStorage.setItem('eventpay_tickets', JSON.stringify(finalStorage));
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, checkout, total, tickets }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
