'use client';

import { useState } from 'react';
import { TopBarLogged, Footer } from 'components';
import { Button } from 'components/ui/button';
import { ServiceCard } from 'components';
import {
  Decoracao
} from 'assets';

export default function DecoracaoPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Estrutura de dados para os serviços agrupados por categoria
  const categories = {
    'Decoração de Salão': [
      { image: Decoracao, title: 'Decoração Clássica', description: 'Decoração com tons neutros e elegantes', price: 'R$1.500,00' },
      { image: Decoracao, title: 'Decoração Temática', description: 'Decoração personalizada para eventos temáticos', price: 'R$2.000,00' },
      { image: Decoracao, title: 'Decoração Minimalista', description: 'Decoração simples e sofisticada', price: 'R$1.200,00' },
      { image: Decoracao, title: 'Decoração Luxuosa', description: 'Decoração premium com detalhes refinados', price: 'R$3.500,00' },
    ],
    'Flores e Arranjos': [
      { image: Decoracao, title: 'Arranjos Florais', description: 'Arranjos para mesas e ambientes', price: 'R$300,00' },
      { image: Decoracao, title: 'Flores Naturais', description: 'Flores frescas para decoração', price: 'R$500,00' },
    ],
    'Iluminação e Painéis': [
      { image: Decoracao, title: 'Iluminação Decorativa', description: 'Iluminação especial para eventos', price: 'R$800,00' },
      { image: Decoracao, title: 'Painel Decorativo', description: 'Painel personalizado para fotos e eventos', price: 'R$1.000,00' },
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
            Decoração
          </h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Transforme seu evento com uma decoração incrível e personalizada!
          </p>
        </div>
        <div className="flex justify-center mt-20 mb-20">
          <form onSubmit={handleSearch} className="w-1/2">
            <input
              type="text"
              placeholder="Pesquise serviços de decoração..."
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