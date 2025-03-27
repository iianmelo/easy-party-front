"use client"
import React from 'react';
import CartItem from './itens';
import { BuffetCard, BarmanCard, DJCard } from 'assets';
import { Button } from 'components/ui/button';
import { useRouter } from 'next/navigation';

const RedSidebar: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-1/3 bg-red-500 text-white pt-6 pl-8 pr-7 pb-8">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[20px] font-bold">Seu carrinho tem três itens</h2>
      </div>

      {/* Traço preto */}
      <div className="h-0.5 bg-black mb-4"></div>

      {/* Body */}
      <div className="flex flex-col gap-12">
        <CartItem
          image={BuffetCard}
          description="Buffet Festa-Alimentação"
          price="R$ 1002,00"
        />
        <CartItem
          image={BarmanCard}
          description="Barman João-Bebidas"
          price="R$ 150,00"
        />
        <CartItem
          image={DJCard}
          description="DJ Victor-Música"
          price="R$ 8599,90"
        />
      </div>

      {/* Traço preto */}
      <div className="h-0.5 bg-black mb-4"></div>

      {/* Footer */}

      <div className='flex flex-col gap-[70px]'>
        <div className="flex gap-[183px]">
          <p className="text-[20px] font-medium">Total:</p>
          <p className="text-[20px] font-bold">R$10.561,80</p>
        </div>
        <Button onClick={() => router.push("/payment")}>Finalizar Compra</Button>
      </div>
    </div>
  );
};

export default RedSidebar;
