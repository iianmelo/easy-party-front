'use client';

import { useState } from 'react';
import { TopBarLogged, Footer } from 'components';
import { Button } from 'components/ui/button';
import { ServiceCard } from 'components';
import { PhotoCard, Midia, MidiaCard } from 'assets';
import type { StaticImageData } from 'next/image';

interface CatalogService {
  image: StaticImageData;
  title: string;
  description: string;
  price: string;
}

export default function MidiaPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Estrutura de dados para os serviços agrupados por categoria
  const categories: Record<string, CatalogService[]> = {
    'Fotografia e Filmagem': [
      {
        image: PhotoCard,
        title: 'Fotografia Profissional',
        description: 'Fotos de alta qualidade para eventos',
        price: 'R$1.500,00'
      },
      {
        image: Midia,
        title: 'Filmagem de Eventos',
        description: 'Vídeos profissionais para registrar momentos',
        price: 'R$2.500,00'
      },
      {
        image: MidiaCard,
        title: 'Filmagem com Drone',
        description: 'Imagens aéreas incríveis para seu evento',
        price: 'R$3.000,00'
      }
    ],
    'Edição e Pós-Produção': [
      {
        image: PhotoCard,
        title: 'Edição de Vídeos',
        description: 'Edição profissional para vídeos de eventos',
        price: 'R$800,00'
      },
      {
        image: PhotoCard,
        title: 'Álbum Fotográfico',
        description: 'Álbuns personalizados com fotos do evento',
        price: 'R$1.200,00'
      }
    ],
    'Streaming e Mídia Social': [
      {
        image: Midia,
        title: 'Streaming ao Vivo',
        description: 'Transmissão ao vivo do seu evento',
        price: 'R$2.000,00'
      },
      {
        image: MidiaCard,
        title: 'Gerenciamento de Mídias Sociais',
        description: 'Postagens e cobertura do evento em redes sociais',
        price: 'R$1.500,00'
      },
      {
        image: Midia,
        title: 'Criação de Banners',
        description: 'Banners digitais e impressos para divulgação',
        price: 'R$500,00'
      }
    ]
  };

  // Função para filtrar os serviços de uma categoria com base no termo de pesquisa
  const filterServices = (services: CatalogService[]) =>
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
          <h1 className="text-[56px] font-bold leading-[68px] ">Mídia</h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Capture e compartilhe os melhores momentos do seu evento com
            serviços de mídia de alta qualidade!
          </p>
        </div>
        <div className="flex justify-center mt-20 mb-20">
          <form onSubmit={handleSearch} className="w-1/2">
            <input
              type="text"
              placeholder="Pesquise serviços de mídia..."
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
                    Nenhum serviço encontrado para &quot;{searchTerm}&quot; na
                    categoria {categoryName}.
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
