
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Event } from '../types';
import { MOCK_EVENTS } from '../data/mockData';

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Initialize events from localStorage or fall back to MOCK_EVENTS
    const storedEvents = localStorage.getItem('eventpay_events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(MOCK_EVENTS);
      localStorage.setItem('eventpay_events', JSON.stringify(MOCK_EVENTS));
    }
  }, []);

  const saveEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem('eventpay_events', JSON.stringify(newEvents));
  };

  const addEvent = (event: Event) => {
    const newEvents = [event, ...events];
    saveEvents(newEvents);
  };

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    const newEvents = events.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    );
    saveEvents(newEvents);
  };

  const deleteEvent = (id: string) => {
    const newEvents = events.filter(event => event.id !== id);
    saveEvents(newEvents);
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, getEventById }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
