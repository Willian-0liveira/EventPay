
export enum UserType {
  CLIENT = 'CLIENT',
  COMPANY = 'COMPANY'
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  cpf?: string;
  cnpj?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  bankingData?: BankingData;
  password?: string; // Added for local auth simulation
  favorites?: string[]; // Added for RF12
  birthDate?: string;
}

export interface BankingData {
  agency: string;
  account: string;
  pixKey: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  priceInteira: number;
  priceMeia: number;
  image: string;
  category: string;
  organizerId: string;
  status?: 'FUTURE' | 'REALIZED';
}

export interface Feedback {
  id: string;
  eventId: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  eventId: string;
  eventTitle: string;
  eventImage: string;
  type: 'Inteira' | 'Meia';
  price: number;
  quantity: number;
}

export interface PurchasedTicket extends CartItem {
  ticketId: string;
  purchaseDate: string;
  status: 'VALID' | 'USED';
  userId: string; // Link ticket to user
}

export interface FreelancerJob {
  id: string;
  eventId: string;
  eventTitle: string;
  role: string; // e.g., 'Segurança', 'Barman', 'Recepcionista'
  date: string;
  time: string;
  payment: number;
  requirements: string[];
  status: 'OPEN' | 'CLOSED';
  image: string;
}