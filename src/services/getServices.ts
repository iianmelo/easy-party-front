import api from './api';

export interface RecommendedService {
  service_id: number;
  company_name: string;
  service_name: string;
  description: string;
  price_min: string;
  price_max: string;
  event_types: string[];
  specialties: string[];
  rating: string;
  location: string;
}

export interface ServicesResult {
  services: RecommendedService[];
  source: 'api' | 'mock';
}

const MOCK_SERVICES: RecommendedService[] = [
  {
    service_id: 1,
    company_name: 'Sabor & Festa',
    service_name: 'Buffet completo',
    description:
      'Salgados, doces e bolo para aniversários e confraternizações em casa ou salão.',
    price_min: 'R$ 45',
    price_max: 'R$ 89 por pessoa',
    event_types: ['Aniversário', 'Festa'],
    specialties: ['Buffet', 'Catering'],
    rating: '4,8',
    location: 'Recife - PE'
  },
  {
    service_id: 2,
    company_name: 'Mesa Posta',
    service_name: 'Catering para casamento',
    description:
      'Menu empratado ou coquetel, com equipe de serviço para celebrações íntimas.',
    price_min: 'R$ 120',
    price_max: 'R$ 220 por pessoa',
    event_types: ['Casamento'],
    specialties: ['Catering'],
    rating: '4,9',
    location: 'Recife - PE'
  },
  {
    service_id: 3,
    company_name: 'Som da Casa',
    service_name: 'DJ e pista',
    description:
      'DJ com equipamento de som e iluminação básica para cerca de 100 convidados.',
    price_min: 'R$ 1.200',
    price_max: 'R$ 2.400',
    event_types: ['Aniversário', 'Festa', 'Casamento'],
    specialties: ['DJ', 'Som'],
    rating: '4,7',
    location: 'Recife - PE'
  },
  {
    service_id: 4,
    company_name: 'Luz & Cena',
    service_name: 'Iluminação de ambiente',
    description: 'Projeto de luz cênica para salão, jardim ou festa na praia.',
    price_min: 'R$ 800',
    price_max: 'R$ 1.800',
    event_types: ['Casamento', 'Corporativo'],
    specialties: ['Iluminação'],
    rating: '4,6',
    location: 'Olinda - PE'
  },
  {
    service_id: 5,
    company_name: 'Olhar Presente',
    service_name: 'Fotografia de festa',
    description:
      'Cobertura fotográfica de 4 horas, com entrega de galeria editada.',
    price_min: 'R$ 900',
    price_max: 'R$ 1.600',
    event_types: ['Aniversário', 'Casamento'],
    specialties: ['Fotografia'],
    rating: '4,9',
    location: 'Recife - PE'
  },
  {
    service_id: 6,
    company_name: 'Espaço Maré',
    service_name: 'Salão para eventos',
    description:
      'Espaço para até 80 pessoas, com copa e área externa, próximo à praia.',
    price_min: 'R$ 2.500',
    price_max: 'R$ 4.200',
    event_types: ['Casamento', 'Aniversário'],
    specialties: ['Espaço'],
    rating: '4,5',
    location: 'Jaboatão dos Guararapes - PE'
  },
  {
    service_id: 7,
    company_name: 'Ateliê Balão',
    service_name: 'Decoração temática',
    description:
      'Painel, arranjos e paleta de cores alinhados ao tema da festa.',
    price_min: 'R$ 1.100',
    price_max: 'R$ 3.500',
    event_types: ['Aniversário', 'Festa'],
    specialties: ['Decoração'],
    rating: '4,8',
    location: 'Recife - PE'
  },
  {
    service_id: 8,
    company_name: 'Lembrança Boa',
    service_name: 'Lembrancinhas personalizadas',
    description: 'Kits de agradecimento com embalagem e tag com o nome do evento.',
    price_min: 'R$ 8',
    price_max: 'R$ 22 por unidade',
    event_types: ['Aniversário', 'Casamento'],
    specialties: ['Lembrancinhas'],
    rating: '4,4',
    location: 'Recife - PE'
  }
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function asServiceList(payload: unknown): RecommendedService[] | null {
  if (Array.isArray(payload)) return payload as RecommendedService[];
  if (payload && typeof payload === 'object') {
    const record = payload as { services?: unknown; data?: unknown };
    if (Array.isArray(record.services)) return record.services as RecommendedService[];
    if (Array.isArray(record.data)) return record.data as RecommendedService[];
  }
  return null;
}

function filterMock(prompt: string): RecommendedService[] {
  const tokens = normalize(prompt)
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 3);

  if (tokens.length === 0) return MOCK_SERVICES;

  const matched = MOCK_SERVICES.filter((service) => {
    const haystack = normalize(
      [
        service.service_name,
        service.company_name,
        service.description,
        ...service.event_types,
        ...service.specialties
      ].join(' ')
    );
    return tokens.some((token) => haystack.includes(token));
  });

  return matched.length > 0 ? matched : MOCK_SERVICES;
}

export async function getServices({
  prompt
}: {
  prompt: string;
}): Promise<ServicesResult> {
  try {
    const response = await api.post('/getData', { prompt });
    const services = asServiceList(response.data);
    if (!services) {
      return { services: filterMock(prompt), source: 'mock' };
    }
    return { services, source: 'api' };
  } catch {
    return { services: filterMock(prompt), source: 'mock' };
  }
}
