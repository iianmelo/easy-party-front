'use client';

import { TopBar, ServiceCard, Footer } from 'components';
import {
  PartyHome,
  DJCard,
  BuffetCard,
  PlayCard,
  PhotoCard,
  Alimentacao,
    Decoracao,
    Midia,
    Musica,
    Musica2
} from 'assets';
import Image from 'next/image';
import { Button } from 'components/ui/button';
import Link from 'next/link';

export default function Servicos() {
  return (
    <div className="w-full h-full">
      <TopBar></TopBar>
      <div className="flex-col items-center h-full justify-between mb-20">
        <div className="pl-14 flex flex-col gap-6 w-full text-center justify-start mt-40">
          <h1 className="text-[56px] font-bold leading-[68px] ">
            Serviços
          </h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="flex justify-center mt-20 mb-20">
            <input
            type="text"
            placeholder="Pesquise serviços para sua festa!"
            className="border border-black rounded-lg p-2 w-1/2"
            />
        </div>
        <div className="flex gap-5 px-8 h-full w-full justify-center">
            <div className="flex flex-col justify-between pl-6 pr-6">
            <Link href="/servicos/alimentacao">
                <Image src={Alimentacao} alt="Logo" className="w-220 h-auto" />
            </Link>
            </div>
            <div className="flex flex-col gap-8">
                <div className="flex flex-row gap-5">
                    <div className="justify-center pl-6 pr-6">
                    <Link href="/servicos/musica">
                        <Image src={Musica} alt="Logo" className="w-220 h-auto" />
                    </Link>
                    </div>
                    <div className="justify-center pl-6 pr-6">
                    <Link href="/servicos/musica">
                        <Image src={Musica2} alt="Logo" className="w-220 h-auto" />
                    </Link>
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <div className="justify-center pl-6 pr-6">
                    <Link href="/servicos/decoracao">
                        <Image src={Decoracao} alt="Logo" className="w-220 h-auto" />
                    </Link>
                    </div>
                    <div className="justify-center pl-6 pr-6">
                    <Link href="/servicos/midia">
                        <Image src={Midia} alt="Logo" className="w-220 h-auto" />
                    </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
}
