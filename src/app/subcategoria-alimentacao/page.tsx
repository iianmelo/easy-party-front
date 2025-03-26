'use client';

import { useState } from 'react';
import { TopBarLogged, Footer } from 'components';
import { Button } from 'components/ui/button';
import { ServiceCard } from 'components';
import {
  BuffetCard,
  SalgadoCard,
  SalgadoCard2,
  DoceCard,
  DoceCard2
} from 'assets';

export default function Servicos() {
  const [searchTerm, setSearchTerm] = useState('');

  // Estrutura de dados para os serviços agrupados por categoria
  const categories = {
    'Doces e Salgados': [
      { image: SalgadoCard, title: 'Salgados', description: 'Preço do combo', price: 'R$99,90' },
      { image: DoceCard, title: 'Docinhos', description: 'Preço do combo', price: 'R$99,90' },
      { image: DoceCard2, title: 'Docinhos', description: 'Preço de 100 unidades', price: 'R$99,90' },
      { image: SalgadoCard2, title: 'Salgados', description: 'Preço do combo', price: 'R$99,90' },
    ],
    Buffet: [
      { image: BuffetCard, title: 'Buffet Completo', description: 'Preço por pessoa', price: 'R$199,90' },
      { image: BuffetCard, title: 'Buffet Premium', description: 'Preço por pessoa', price: 'R$299,90' },
    ],
    Bebidas: [
      { image: BuffetCard, title: 'Refrigerantes', description: 'Preço por litro', price: 'R$9,90' },
      { image: BuffetCard, title: 'Sucos Naturais', description: 'Preço por litro', price: 'R$14,90' },
    ],
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
          <h1 className="text-[56px] font-bold leading-[68px] ">
            Alimentação{' '}
          </h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Todo bom evento tem que ter comida boa!
          </p>
        </div>
        <div className="flex justify-center mt-20 mb-20">
          <form onSubmit={handleSearch} className="w-1/2">
            <input
              type="text"
              placeholder="Pesquise serviços para sua festa..."
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
                    Nenhum serviço encontrado para "{searchTerm}" na categoria {categoryName}.
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