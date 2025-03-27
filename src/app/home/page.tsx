'use client';

import { TopBar, Footer } from 'components';
import { PartyHome} from 'assets';
import Image from 'next/image';
import { Button } from 'components/ui/button';

export default function Home() {
  return (
    <div className="w-full h-full">
      <TopBar></TopBar>
      <div className="flex items-center h-full justify-between">
        <div className="pl-14 flex flex-col gap-6 max-w-[580px] justify-start">
          <h1 className="text-[50px] font-bold leading-[68px] ">
            Easy Party: sua festa sem complicação!
          </h1>
          <p className="font-normal text-[18px] leading-[27px]">
            Não sabe quais serviços contratar? Deixe que nossa IA encontre as melhores 
            opções para você. Do buffet à decoração, cuidamos de tudo para que você 
            aproveite cada momento sem preocupações!
          </p>
            <Button 
            className="bg-[#D53232] text-white w-[170px] text-[16px]" 
            onClick={() => window.location.href = '/create-party'}
            >
            Monte sua festa
            </Button>
        </div>
        <Image src={PartyHome} alt="Logo" className="h-full" />
      </div>
      <Footer></Footer>
    </div>
  );
}
