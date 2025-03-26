'use client';

import { TopBar, ServiceCard, Footer } from 'components';
import { PartyHome, DJCard, BuffetCard, PlayCard, PhotoCard } from 'assets';
import Image from 'next/image';
import { Button } from 'components/ui/button';

export default function Test() {
  return (
    <div className="w-full h-full">
      <TopBar></TopBar>
      <div className="flex items-center h-full justify-between">
        <div className="pl-14 flex flex-col gap-6 max-w-[580px] justify-start">
          <h1 className="text-[56px] font-bold leading-[68px] ">
            Encontre o melhor serviço para sua Festa
          </h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Chegou a hora de transformar sua celebração em um momento
            inesquecível! Seja um aniversário, casamento, formatura ou evento
            corporativo, nós cuidamos de tudo para que você aproveite cada
            instante sem preocupações.
          </p>
          <Button className="bg-[#D53232] text-white  w-[170px] text-[16px]">
            Monte sua festa
          </Button>
        </div>
        <Image src={PartyHome} alt="Logo" className="h-full" />
      </div>
      <div className="flex flex-col py-10 gap-10 w-full bg-[#D53232]">
        <div className="flex justify-between px-16 py-5 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-[48px] leading-[58px]">
              {' '}
              Serviços mais procurados
            </h1>
            <p className="font-normal text-[18px] leading-[27px]">
            Navegue pelos nossos serviços mais procurados!
              </p>
          </div>
          <Button className="text-black bg-[#d53232] border border-black h-10 text-lg hover:bg-[#b02a2a]">
            Ver todos
          </Button>
        </div>
        <div className="flex px-8 h-full justify-self-center">
          <ServiceCard
            image={DJCard}
            title="DJ"
            description="Música"
            price="R$99,90"
          />
          <ServiceCard
            image={BuffetCard}
            title="Buffet"
            description="Alimentação"
            price="R$99,90"
          />
          <ServiceCard
            image={PlayCard}
            title="Brinquedo"
            description="Brinquedos"
            price="R$99,90"
          />
          <ServiceCard
            image={PhotoCard}
            title="Fotógrafo"
            description="Mídia"
            price="R$99,90"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
