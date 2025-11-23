
import { Event, User, UserType, Feedback, FreelancerJob } from '../types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'The Town 2025 - Edição Especial',
    date: '2025-09-12',
    time: '14:00',
    location: 'Autódromo de Interlagos, São Paulo - SP',
    description: 'O maior festival de música, cultura e arte de São Paulo está de volta! Prepare-se para 5 palcos, mais de 235 horas de música e experiências inesquecíveis. Line-up inclui: Bruno Mars, Maroon 5, Foo Fighters e muito mais. A Cidade da Música te espera para dias históricos.',
    priceInteira: 850.00,
    priceMeia: 425.00,
    image: 'https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=1000&auto=format&fit=crop',
    category: 'Festivais',
    organizerId: 'comp1',
    status: 'FUTURE'
  },
  {
    id: '2',
    title: 'O Fantasma da Ópera - O Musical',
    date: '2025-06-15',
    time: '20:00',
    location: 'Teatro Renault, São Paulo - SP',
    description: 'O musical mais antigo em cartaz na Broadway retorna ao Brasil. Baseado no romance clássico de Gaston Leroux, O Fantasma da Ópera conta a história de uma figura mascarada que se espreita pelas catacumbas da Ópera de Paris, exercendo um reinado de terror sobre todos que habitam o local.',
    priceInteira: 320.00,
    priceMeia: 160.00,
    image: 'https://images.unsplash.com/photo-1503095392213-2e2d04002561?q=80&w=1000&auto=format&fit=crop',
    category: 'Teatros',
    organizerId: 'comp1',
    status: 'FUTURE'
  },
  {
    id: '3',
    title: 'Final do Campeonato Brasileiro: PAL x FLA',
    date: '2025-12-07',
    time: '16:00',
    location: 'Allianz Parque, São Paulo - SP',
    description: 'A rodada decisiva do Brasileirão 2025. Palmeiras e Flamengo se enfrentam em um clássico eletrizante que pode decidir o título nacional. Garanta seu lugar na arquibancada e venha torcer pelo seu time do coração neste duelo de gigantes.',
    priceInteira: 250.00,
    priceMeia: 125.00,
    image: 'https://images.unsplash.com/photo-1504454138493-068c8b8dc3f4?q=80&w=1000&auto=format&fit=crop',
    category: 'Esportes',
    organizerId: 'comp2',
    status: 'FUTURE'
  },
  {
    id: '4',
    title: 'Workshop de Gastronomia Italiana',
    date: '2025-04-20',
    time: '09:00',
    location: 'Eataly, São Paulo - SP',
    description: 'Aprenda a fazer massas frescas e molhos clássicos com chefs renomados. O curso inclui todos os ingredientes, apostila digital e degustação harmonizada com vinhos italianos ao final da aula. Para iniciantes e amantes da culinária.',
    priceInteira: 450.00,
    priceMeia: 450.00, // Cursos geralmente preço único, mas mantendo estrutura
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop',
    category: 'Cursos',
    organizerId: 'comp2',
    status: 'FUTURE'
  },
  {
    id: '5',
    title: 'Stand-up: Whindersson Nunes',
    date: '2025-08-05',
    time: '21:00',
    location: 'Espaço das Américas, São Paulo - SP',
    description: 'Whindersson Nunes em seu novo show solo "Efeito Borboleta". Com humor afiado e histórias inéditas sobre sua carreira e vida pessoal, o comediante promete arrancar gargalhadas do público em uma noite inesquecível.',
    priceInteira: 180.00,
    priceMeia: 90.00,
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=1000&auto=format&fit=crop',
    category: 'Teatros',
    organizerId: 'comp1',
    status: 'FUTURE'
  },
  {
    id: '6',
    title: 'Excursão: Vinícolas de Bento Gonçalves',
    date: '2025-07-10',
    time: '07:00',
    location: 'Saída: Terminal Tietê, SP -> RS',
    description: 'Um passeio incrível pelo Vale dos Vinhedos. Inclui transporte executivo, hospedagem de 2 noites, visita guiada a 3 vinícolas premiadas com degustação e almoço típico italiano. Vagas limitadas para grupo exclusivo.',
    priceInteira: 1200.00,
    priceMeia: 1200.00,
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1000&auto=format&fit=crop',
    category: 'Excursões',
    organizerId: 'comp2',
    status: 'FUTURE'
  },
  {
    id: '7',
    title: 'Coldplay - Music of the Spheres',
    date: '2025-10-15',
    time: '20:30',
    location: 'Estádio do Morumbi, São Paulo - SP',
    description: 'A banda britânica retorna ao Brasil com sua turnê mundial aclamada pela crítica. Um espetáculo de luzes, cores e hits que marcaram gerações. Prepare-se para cantar "Yellow", "Viva La Vida" e muito mais.',
    priceInteira: 650.00,
    priceMeia: 325.00,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop',
    category: 'Shows',
    organizerId: 'comp1',
    status: 'FUTURE'
  },
  {
    id: '8',
    title: 'Festival de Inverno de Campos do Jordão',
    date: '2024-07-01',
    time: '19:00',
    location: 'Auditório Cláudio Santoro, Campos do Jordão - SP',
    description: 'Abertura oficial do maior festival de música clássica da América Latina. Apresentação da Orquestra Sinfônica do Estado de São Paulo (OSESP) com regência de Thierry Fischer.',
    priceInteira: 100.00,
    priceMeia: 50.00,
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop',
    category: 'Festivais',
    organizerId: 'comp2',
    status: 'REALIZED'
  }
];

export const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: 'f1',
    eventId: '8',
    user: 'Ana Paula Souza',
    rating: 5,
    comment: 'Acústica perfeita e organização impecável. Foi uma noite mágica!',
    date: '2024-07-02'
  },
  {
    id: 'f2',
    eventId: '8',
    user: 'Roberto Lima',
    rating: 4,
    comment: 'O concerto foi lindo, mas o estacionamento estava muito cheio.',
    date: '2024-07-02'
  }
];

export const MOCK_JOBS: FreelancerJob[] = [
    {
        id: 'j1',
        eventId: '1',
        eventTitle: 'The Town 2025 - Edição Especial',
        role: 'Bartender',
        date: '2025-09-12',
        time: '13:00 - 23:00',
        payment: 250.00,
        requirements: ['Experiência com drinks', 'Maior de 18 anos', 'Uniforme preto'],
        status: 'OPEN',
        image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'j2',
        eventId: '1',
        eventTitle: 'The Town 2025 - Edição Especial',
        role: 'Segurança',
        date: '2025-09-12',
        time: '12:00 - 00:00',
        payment: 300.00,
        requirements: ['Curso de Vigilante', 'Certificado em dia', 'Experiência em grandes eventos'],
        status: 'OPEN',
        image: 'https://images.unsplash.com/photo-1595593791314-9143745dc777?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'j3',
        eventId: '7',
        eventTitle: 'Coldplay - Music of the Spheres',
        role: 'Recepcionista / Bilheteria',
        date: '2025-10-15',
        time: '16:00 - 22:00',
        payment: 180.00,
        requirements: ['Boa comunicação', 'Inglês básico é um diferencial'],
        status: 'OPEN',
        image: 'https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=1000&auto=format&fit=crop'
    }
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Carlos Eduardo Silva',
  email: 'carlos.silva@email.com',
  type: UserType.CLIENT,
  cpf: '123.456.789-00',
  phone: '(11) 98765-4321',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  address: 'Av. Paulista, 1500 - Bela Vista, São Paulo - SP'
};

export const MOCK_COMPANY: User = {
  id: 'comp1',
  name: 'Live Nation Brasil',
  email: 'contato@livenation.com.br',
  type: UserType.COMPANY,
  cnpj: '12.345.678/0001-90',
  phone: '(11) 3030-3030',
  address: 'Rua Funchal, 418 - Vila Olímpia, São Paulo - SP',
  avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop',
  bankingData: {
    agency: '3405',
    account: '99887-1',
    pixKey: '12.345.678/0001-90'
  }
};