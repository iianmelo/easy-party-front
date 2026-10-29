import type { StaticImageData } from 'next/image';
import buffet from '../assets/catalog/buffet.webp';
import buffetTabua from '../assets/catalog/buffet-tabua.webp';
import buffetPremium from '../assets/catalog/buffet-premium.webp';
import sobremesa from '../assets/catalog/sobremesa.webp';
import doces from '../assets/catalog/doces.webp';
import docesCupcake from '../assets/catalog/doces-cupcake.webp';
import salgados from '../assets/catalog/salgados.webp';
import barman from '../assets/catalog/barman.webp';
import cerveja from '../assets/catalog/cerveja.webp';
import dj from '../assets/catalog/dj.webp';
import banda from '../assets/catalog/banda.webp';
import ambiente from '../assets/catalog/ambiente.webp';
import karaoke from '../assets/catalog/karaoke.webp';
import flores from '../assets/catalog/flores.webp';
import baloes from '../assets/catalog/baloes.webp';
import salao from '../assets/catalog/salao.webp';
import foto from '../assets/catalog/foto.webp';
import video from '../assets/catalog/video.webp';
import social from '../assets/catalog/social.webp';
import { normalizeText } from 'lib/format';

export type CategoryId = 'alimentacao' | 'musica' | 'decoracao' | 'midia';

export interface Category {
  id: CategoryId;
  label: string;
  href: string;
  image: StaticImageData;
  blurb: string;
}

export interface Product {
  id: string;
  title: string;
  category: CategoryId;
  categoryLabel: string;
  supplier: string;
  description: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  image: StaticImageData;
  gallery: StaticImageData[];
  tags: string[];
  events: string[];
}

export const categories: Category[] = [
  {
    id: 'alimentacao',
    label: 'Alimentação',
    href: '/subcategoria-alimentacao',
    image: buffet,
    blurb: 'Buffet, doces, salgados e bar para o tamanho da sua mesa.'
  },
  {
    id: 'musica',
    label: 'Música',
    href: '/subcategoria-musica',
    image: dj,
    blurb: 'DJ, banda e som ambiente com equipamento incluso.'
  },
  {
    id: 'decoracao',
    label: 'Decoração',
    href: '/subcategoria-decoracao',
    image: salao,
    blurb: 'Flores, balões e ambientação no tom da festa.'
  },
  {
    id: 'midia',
    label: 'Mídia',
    href: '/subcategoria-midia',
    image: foto,
    blurb: 'Foto e filme para guardar a noite inteira.'
  }
];

export const products: Product[] = [
  {
    id: 'buffet-festas',
    title: 'Buffet para festas',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    supplier: 'Sabor & Festa',
    description:
      'Cardápio de salgados, doces e bolo, com equipe de serviço. Pensado para aniversários e confraternizações em casa ou salão.',
    price: 99.9,
    unit: 'por pessoa',
    rating: 4.7,
    reviews: 32,
    image: buffet,
    gallery: [buffet, buffetTabua, salgados],
    tags: ['Aniversário', 'Corporativo'],
    events: ['Aniversário', 'Corporativo', 'Confraternização']
  },
  {
    id: 'buffet-premium',
    title: 'Buffet premium',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    supplier: 'Mesa Posta',
    description:
      'Menu empratado ou coquetel, com louça e equipe. Uma opção mais cuidada para casamentos íntimos.',
    price: 189.9,
    unit: 'por pessoa',
    rating: 4.9,
    reviews: 18,
    image: buffetPremium,
    gallery: [buffetPremium, sobremesa],
    tags: ['Casamento'],
    events: ['Casamento', 'Aniversário']
  },
  {
    id: 'docinhos',
    title: 'Combo de docinhos',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    supplier: 'Doce Mesa',
    description:
      'Cem unidades sortidas, com embalagem para a mesa de doces. Sabores combinados com o anfitrião.',
    price: 99.9,
    unit: 'o combo',
    rating: 4.6,
    reviews: 21,
    image: doces,
    gallery: [doces, docesCupcake],
    tags: ['Aniversário', 'Infantil'],
    events: ['Aniversário', 'Infantil']
  },
  {
    id: 'salgados',
    title: 'Combo de salgados',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    supplier: 'Forno da Rua',
    description:
      'Salgados assados e fritos, entregues quentes no horário da festa. Serve bem um lanche de fim de tarde.',
    price: 89.9,
    unit: 'o combo',
    rating: 4.5,
    reviews: 27,
    image: salgados,
    gallery: [salgados, buffetTabua],
    tags: ['Aniversário', 'Corporativo'],
    events: ['Aniversário', 'Corporativo']
  },
  {
    id: 'barman-joao',
    title: 'Barman João',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    supplier: 'Bar da Casa',
    description:
      'Quatro horas de bar com drinks de assinatura e serviço sem álcool. O copo e o gelo entram no pacote.',
    price: 299.9,
    unit: 'por 4 horas',
    rating: 4.8,
    reviews: 14,
    image: barman,
    gallery: [barman],
    tags: ['Aniversário', 'Casamento'],
    events: ['Aniversário', 'Casamento']
  },
  {
    id: 'caixas-heineken',
    title: 'Cerveja gelada',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    supplier: 'Gelada Recife',
    description:
      'Cerveja servida gelada para a mesa ou para o bar. Combina com o serviço de barman ou com um evento mais solto.',
    price: 49.9,
    unit: 'o copo',
    rating: 4.4,
    reviews: 11,
    image: cerveja,
    gallery: [cerveja],
    tags: ['Aniversário'],
    events: ['Aniversário', 'Confraternização']
  },
  {
    id: 'dj-profissional',
    title: 'DJ profissional',
    category: 'musica',
    categoryLabel: 'Música',
    supplier: 'Som da Casa',
    description:
      'DJ, som e luz básica para cerca de cem pessoas. A playlist é alinhada antes da noite.',
    price: 1500,
    unit: 'a noite',
    rating: 4.8,
    reviews: 19,
    image: dj,
    gallery: [dj],
    tags: ['Aniversário', 'Casamento'],
    events: ['Aniversário', 'Casamento', 'Corporativo']
  },
  {
    id: 'banda-ao-vivo',
    title: 'Banda ao vivo',
    category: 'musica',
    categoryLabel: 'Música',
    supplier: 'Trio Boa Vista',
    description:
      'Set ao vivo de duas horas, com repertório combinado. Indicado para casamento íntimo e jantar.',
    price: 3000,
    unit: 'o set',
    rating: 4.9,
    reviews: 9,
    image: banda,
    gallery: [banda],
    tags: ['Casamento'],
    events: ['Casamento', 'Aniversário']
  },
  {
    id: 'musica-ambiente',
    title: 'Música ambiente',
    category: 'musica',
    categoryLabel: 'Música',
    supplier: 'Playlist Aberta',
    description:
      'Seleção contínua para almoço ou chá, com caixa de som discreta. Sem pista, sem volume de boate.',
    price: 500,
    unit: 'a festa',
    rating: 4.5,
    reviews: 8,
    image: ambiente,
    gallery: [ambiente],
    tags: ['Corporativo', 'Casamento'],
    events: ['Corporativo', 'Casamento']
  },
  {
    id: 'karaoke',
    title: 'Karaokê',
    category: 'musica',
    categoryLabel: 'Música',
    supplier: 'Palco Miúdo',
    description:
      'Pista, microfones e catálogo de músicas por quatro horas. Funciona bem em aniversário descontraído.',
    price: 1000,
    unit: 'por 4 horas',
    rating: 4.6,
    reviews: 12,
    image: karaoke,
    gallery: [karaoke],
    tags: ['Aniversário', 'Infantil'],
    events: ['Aniversário', 'Infantil']
  },
  {
    id: 'decoracao-classica',
    title: 'Decoração clássica',
    category: 'decoracao',
    categoryLabel: 'Decoração',
    supplier: 'Ateliê Balão',
    description:
      'Arranjos de mesa, flores e paleta combinada com o convite. Montagem no dia, desmontagem no fim.',
    price: 1800,
    unit: 'o projeto',
    rating: 4.7,
    reviews: 16,
    image: flores,
    gallery: [flores, salao],
    tags: ['Casamento', 'Aniversário'],
    events: ['Casamento', 'Aniversário']
  },
  {
    id: 'baloes-painel',
    title: 'Balões e painel',
    category: 'decoracao',
    categoryLabel: 'Decoração',
    supplier: 'Ateliê Balão',
    description:
      'Painel para fotos e arranjo de balões no tema da festa. Uma peça só, para quem quer um ponto de cor.',
    price: 650,
    unit: 'o conjunto',
    rating: 4.6,
    reviews: 22,
    image: baloes,
    gallery: [baloes],
    tags: ['Infantil', 'Aniversário'],
    events: ['Aniversário', 'Infantil']
  },
  {
    id: 'ambientacao',
    title: 'Ambientação completa',
    category: 'decoracao',
    categoryLabel: 'Decoração',
    supplier: 'Luz & Cena',
    description:
      'Luz, tecido e mesa posta no mesmo projeto. Indicado quando a festa ocupa o salão inteiro.',
    price: 3500,
    unit: 'o projeto',
    rating: 4.8,
    reviews: 7,
    image: salao,
    gallery: [salao, flores, baloes],
    tags: ['Casamento', 'Corporativo'],
    events: ['Casamento', 'Corporativo']
  },
  {
    id: 'fotografia',
    title: 'Fotografia profissional',
    category: 'midia',
    categoryLabel: 'Mídia',
    supplier: 'Olhar Presente',
    description:
      'Quatro horas de cobertura e galeria editada em poucos dias. Inclui fotos de detalhe e de grupo.',
    price: 1500,
    unit: 'a cobertura',
    rating: 4.9,
    reviews: 24,
    image: foto,
    gallery: [foto],
    tags: ['Casamento', 'Aniversário'],
    events: ['Casamento', 'Aniversário', 'Corporativo']
  },
  {
    id: 'filmagem',
    title: 'Filmagem do evento',
    category: 'midia',
    categoryLabel: 'Mídia',
    supplier: 'Olhar Presente',
    description:
      'Filme curto da noite, com fala dos anfitriões se quiserem. Entrega em link privado.',
    price: 2200,
    unit: 'o filme',
    rating: 4.7,
    reviews: 10,
    image: video,
    gallery: [video],
    tags: ['Casamento'],
    events: ['Casamento', 'Aniversário']
  },
  {
    id: 'cobertura-social',
    title: 'Cobertura para redes',
    category: 'midia',
    categoryLabel: 'Mídia',
    supplier: 'Quadro Vivo',
    description:
      'Fotos verticais e um resumo para stories, entregues no mesmo dia. Útil para festa com convidados longe.',
    price: 800,
    unit: 'o pacote',
    rating: 4.4,
    reviews: 13,
    image: social,
    gallery: [social],
    tags: ['Aniversário', 'Corporativo'],
    events: ['Aniversário', 'Corporativo']
  }
];

export type SortKey = 'rating' | 'price-asc' | 'price-desc';

export function getProduct(id: string | null | undefined) {
  if (!id) return undefined;
  return products.find((product) => product.id === id);
}

export function productsByCategory(category: CategoryId) {
  return products.filter((product) => product.category === category);
}

export function featuredProducts() {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
}

export function filterProducts(
  list: Product[],
  query: string,
  tag: string,
  sort: SortKey
) {
  const needle = normalizeText(query.trim());
  const filtered = list.filter((product) => {
    if (tag && !product.tags.includes(tag)) return false;
    if (!needle) return true;
    const haystack = normalizeText(
      [
        product.title,
        product.supplier,
        product.description,
        product.categoryLabel,
        product.unit,
        ...product.tags
      ].join(' ')
    );
    return haystack.includes(needle);
  });

  const sorted = [...filtered];
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  return sorted;
}

export function tagsIn(list: Product[]) {
  return Array.from(new Set(list.flatMap((product) => product.tags)));
}
