import React from 'react';
import Image from 'next/image';
import { PartyLogo } from 'assets';
import { Location } from 'components';
import { Button } from 'components/ui/button';
import { Bookmark, ShoppingCart } from 'lucide-react';

const TopBarLogged: React.FC = () => {
  return (
    <div className="bg-[#d53232] items-center flex justify-between h-24 w-full pl-6 pr-6">
      <div
        className="flex cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        <Image src={PartyLogo} alt="Logo" width={100} height={100} />
      </div>
      <div className="flex-1 flex justify-end items-center pr-4">
        <Location location="Recife - PE"></Location>
      </div>
      <div className="flex gap-4 ">
        <div>
          <Button
            className="text-black bg-transparent border-none shadow-none text-lg hover:bg-gray-200"
            onClick={() => (window.location.href = '/')}
          >
            Início
          </Button>
          <Button
            className="text-black bg-transparent border-none shadow-none text-lg hover:bg-gray-200"
            onClick={() => (window.location.href = '/servicos')}
          >
            Serviço
          </Button>
          <Button
            className="text-black bg-transparent border-none shadow-none text-lg hover:bg-gray-200"
            onClick={() => (window.location.href = '/aboutus')}
          >
            Sobre nós
          </Button>
        </div>
        <div className="flex gap-4">
          {/* Botão para Itens Salvos */}
          <Button
            className="flex items-center gap-2 text-black bg-transparent border border-black h-10 text-lg hover:bg-gray-200"
            onClick={() => (window.location.href = '/saved-items')}
          >
            <Bookmark className="w-5 h-5" />
            Salvos
          </Button>

          {/* Botão para Carrinho */}
          <Button
            className="flex items-center gap-2 text-white bg-black h-10 text-lg hover:bg-gray-800"
            onClick={() => (window.location.href = '/cart')}
          >
            <ShoppingCart className="w-5 h-5" />
            Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBarLogged;
