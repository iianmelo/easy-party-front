'use client';

import { TopBar, Footer, PersonalCard } from 'components';
import {
  ImgFesta,
  ImgBalloons,
  VictorProfile,
  IanProfile,
  GuiProfile,
  RafaProfile,
  JoaoProfile
} from 'assets';
import Image from 'next/image';

export default function Test() {
  return (
    <div className="w-full h-full">
      <TopBar></TopBar>
      <div className="w-full">
        <Image src={ImgFesta} alt="Imagem de uma festa" className="h-full w-full" />
      </div>
      <div className="flex items-center h-full justify-between">
        <div className="pl-14 flex flex-col gap-6 max-w-[580px] justify-start">
          <h1 className="text-[56px] font-bold leading-[68px] ">
            Easy Party
          </h1>
          <p className="font-normal text-[18px] leading-[27px] text-left text-justify">
            Organizar um evento nunca foi tão simples! Na Easy Party, utilizamos inteligência artificial para recomendar os
            melhores serviços para a sua celebração, garantindo que cada detalhe seja perfeito. Seja um casamento dos sonhos,
            uma festa de aniversário, um evento corporativo ou qualquer outra ocasião especial, nossa IA analisa suas preferências
            e sugere fornecedores ideais para buffet, decoração, música, iluminação, entretenimento e muito mais. Com tecnologia
            avançada e uma curadoria especializada, ajudamos você a criar eventos únicos, cheios de estilo e sofisticação, sem complicações.
            Deixe a Easy Party tornar sua festa inesquecível com recomendações sob medida para você!
          </p>
        </div>
        <Image src={ImgBalloons} alt="Logo" className='mr-20' />
      </div>
      <div className="flex flex-col py-10 gap-10 w-full bg-[#D53232]">
        <div className="flex justify-between px-16 py-5 items-center">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-[18px] leading-[58px]">
                Nosso time
            </p>
            <h1 className="font-bold text-[48px] leading-[58px]">
              {' '}
              Pessoas responsáveis por desenvolver a plataforma
            </h1>
            <p className="font-normal text-[18px] leading-[27px]">
                O nosso time é formado por jovens empreendedores que pensam e colocam em prática
                soluções para problemas do seu dia a dia.
            </p>
          </div>
        </div>
        <div className="flex gap-14 px-8 h-full justify-self-center">
          <PersonalCard
            image={RafaProfile}
            name="Rafael Alves"
            ocupation="Desenvolvedor de Software" 
          />
          <PersonalCard
            image={JoaoProfile}
            name="João Fellows"
            ocupation="Desenvolvedor de Software"
          />
          <PersonalCard
            image={GuiProfile}
            name="Guilherme Montenegro"
            ocupation="Desenvolvedor de Software"
          />
          <PersonalCard
            image={VictorProfile}
            name="Victor Mendonça"
            ocupation="Desenvolvedor de Software"
          />
          <PersonalCard
            image={IanProfile}
            name="Ian Melo"
            ocupation="Desenvolvedor de Software"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
