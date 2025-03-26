'use client';

import { useState } from 'react';
import { TopBarLogged, Footer } from 'components';
import { Button } from 'components/ui/button';
import { ServiceCard } from 'components';
import {
  DJCard,
  BandaCard,
  InstrumentoCard,
  KaraokeCard,
  Musica,
  Musica2,
  Iluminacao,
  PalcoCard
} from 'assets';

export default function MusicaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Estrutura de dados para os serviços agrupados por categoria
  const categories = {
    'DJs e Bandas': [
      {
        image: DJCard,
        title: 'DJ Profissional',
        description: 'Animação garantida para sua festa',
        price: 'R$1.500,00'
      },
      {
        image: BandaCard,
        title: 'Banda ao Vivo',
        description: 'Música ao vivo para eventos',
        price: 'R$3.000,00'
      }
    ],
    'Instrumentos e Equipamentos': [
      {
        image: InstrumentoCard,
        title: 'Aluguel de Instrumentos',
        description: 'Instrumentos musicais para eventos',
        price: 'R$800,00'
      },
      {
        image: Iluminacao,
        title: 'Iluminação de Palco',
        description: 'Iluminação especial para shows',
        price: 'R$1.200,00'
      },
      {
        image: PalcoCard,
        title: 'Palco Completo',
        description: 'Estrutura de palco para eventos',
        price: 'R$5.000,00'
      }
    ],
    'Karaokê e Música Ambiente': [
      {
        image: KaraokeCard,
        title: 'Karaokê',
        description: 'Diversão garantida com karaokê',
        price: 'R$1.000,00'
      },
      {
        image: Musica,
        title: 'Música Ambiente',
        description: 'Playlist personalizada para eventos',
        price: 'R$500,00'
      },
      {
        image: Musica2,
        title: 'Música ao Vivo',
        description: 'Músicos para eventos intimistas',
        price: 'R$2.000,00'
      }
    ]
  };

  // Função para filtrar os serviços de uma categoria com base no termo de pesquisa
  const filterServices = (services) =>
    services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Pesquisando por:', searchTerm);
  };

  return (
    <div className="w-full">
      <TopBarLogged></TopBarLogged>
      <div className="flex-col items-center h-full justify-between mb-20">
        <div className="pl-14 flex flex-col gap-6 w-full text-center justify-start mt-40">
          <h1 className="text-[56px] font-bold leading-[68px] ">Música</h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Torne seu evento inesquecível com os melhores serviços musicais!
          </p>
        </div>
        <div className="flex justify-center mt-20 mb-20">
          <form onSubmit={handleSearch} className="w-1/2">
            <input
              type="text"
              placeholder="Pesquise serviços de música..."
              className="border border-black rounded-lg p-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="hidden">
              Pesquisar
            </button>
          </form>
        </div>

        {/* Renderizar categorias */}
        {Object.entries(categories).map(([categoryName, services]) => {
          const filteredServices = filterServices(services);

          return (
            <div key={categoryName} className="mb-10">
              <div className="flex items-center justify-between px-10">
                <h1 className="font-bold text-[48px]">{categoryName}</h1>
                <Button className="border border-black bg-white text-black hover:bg-black hover:text-white transition-colors">
                  Ver Todos
                </Button>
              </div>
              <div className="pt-5">
                {filteredServices.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8">
                    {filteredServices.map((service, index) => (
                      <ServiceCard
                        key={index}
                        image={service.image}
                        title={service.title}
                        description={service.description}
                        price={service.price}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    Nenhum serviço encontrado para "{searchTerm}" na categoria{' '}
                    {categoryName}.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Footer></Footer>
    </div>
  );
}
