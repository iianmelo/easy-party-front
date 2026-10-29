'use client';

import { TopBar, Footer } from 'components';
import { PartyHome} from 'assets';
import Image from 'next/image';
import { Button } from 'components/ui/button';

export default function Home() {
  return (
    <div className="w-full h-full">
      <TopBar></TopBar>
      <div className="flex flex-col-reverse items-center justify-between gap-6 px-6 py-6 md:flex-row md:gap-8 md:px-0 md:py-0">
        <div className="flex max-w-[580px] flex-col gap-6 md:pl-14">
          <h1 className="text-4xl font-bold leading-tight md:text-[50px] md:leading-[68px] ">
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
        <Image src={PartyHome} alt="Ilustração de uma festa" className="h-auto w-full max-h-[220px] object-contain md:max-h-[640px] md:w-auto" />
      </div>
      <Footer></Footer>
    </div>
  );
}
