'use client';

import { useState } from 'react';
import { TopBar, Footer } from 'components';
import {
  Alimentacao,
  Decoracao,
  Midia,
  Musica,
  Musica2
} from 'assets';
import Image from 'next/image';
import Link from 'next/link';

export default function Servicos() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Pesquisando por:', searchTerm);
  };

  const [serviceAlimentacao] = useState([
    { name: 'Alimentação', image: Alimentacao, link: '/servicos/alimentacao' },
  ]);

  const [serviceMusica] = useState([
    { name: 'Música', image: Musica, link: '/servicos/musica' },
    { name: 'Música2', image: Musica2, link: '/servicos/musica' },
  ]);

  const [serviceRest] = useState([
    { name: 'Decoração', image: Decoracao, link: '/servicos/decoracao' },
    { name: 'Mídia', image: Midia, link: '/servicos/midia' },
  ]);

  const filteredServiceAlimentacao = serviceAlimentacao.filter(service =>
    service.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(
      searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    )
  );

  const filteredServiceMusica = serviceMusica.filter(service =>
    service.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(
      searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    )
  );

  const filteredServiceRest = serviceRest.filter(service =>
    service.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(
      searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    )
  );

  return (
    <div className="w-full h-full">
      <TopBar></TopBar>
      <div className="flex-col items-center h-full justify-between mb-20">
        <div className="pl-14 flex flex-col gap-6 w-full text-center justify-start mt-40">
          <h1 className="text-[56px] font-bold leading-[68px] ">
            Serviços
          </h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Explore todos os nossos serviços!
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
            <button type="submit" className="hidden">Pesquisar</button>
          </form>
        </div>
        <div className="flex gap-5 px-8 h-full w-full justify-center">
            <div className="flex flex-col justify-between">
              <div className="flex gap-5 px-8 h-full w-full justify-center">
                  {filteredServiceAlimentacao.map(serviceAlimentacao => (
                    <div key={serviceAlimentacao.name} className="flex flex-col justify-between pl-6 pr-6">
                      <Link href={serviceAlimentacao.link}>
                        <Image src={serviceAlimentacao.image} alt={serviceAlimentacao.name} className="w-220 h-auto" />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-5">
                  <div className="flex gap-5 px-8 h-full w-full justify-center">
                    {filteredServiceMusica.map(serviceMusica => (
                      <div key={serviceMusica.name} className="flex flex-col justify-between pl-6 pr-6">
                        <Link href={serviceMusica.link}>
                          <Image src={serviceMusica.image} alt={serviceMusica.name} className="w-220 h-auto" />
                        </Link>
                      </div>
                    ))}
                  </div>
              </div>
                <div className="flex flex-row gap-5">
                    <div className="justify-center">
                      <div className="flex gap-5 px-8 h-full w-full justify-center">
                        {filteredServiceRest.map(serviceRest => (
                          <div key={serviceRest.name} className="flex flex-col justify-between pl-6 pr-6">
                            <Link href={serviceRest.link}>
                              <Image src={serviceRest.image} alt={serviceRest.name} className="w-220 h-auto" />
                            </Link>
                         </div>
                       ))}
                     </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}