import React from 'react';
import Image from 'next/image';
import { Carrinho, BuffetCard, BarmanCard, DJCard } from 'assets';
import { ItemCart } from 'components';

const Page = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Conteúdo principal */}
      <div className="flex-1 pt-9 pl-[69px]  gap-[82px]">
        <div className="flex gap-[38px]">
          <Image src={Carrinho} height={59} width={57} alt={'carrinho'} />
          <h1 className="font-bold text-[48px]">CARRINHO</h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            marginTop: '82px'
          }}
        >
          <ItemCart
            image={BuffetCard}
            description="Buffet Festa-Alimentação"
            price="R$ 39,90 por Pessoa"
          />
          <ItemCart
            image={BarmanCard}
            description="Barman João-Bebidas"
            price="R$ 30,00 por Hora"
          />
          <ItemCart
            image={DJCard}
            description="DJ Victor-Música"
            price="R$ 8.599,90"
          />
        </div>
      </div>
      {/* Sidebar vermelha */}
      <div style={{ width: '20%', backgroundColor: 'red' }}></div>
    </div>
  );
};

export default Page;
