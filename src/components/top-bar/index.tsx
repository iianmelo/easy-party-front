import React from 'react';
import Image from 'next/image';
import { PartyLogo } from 'assets';
import { Location } from 'components';
import { Button } from 'components/ui/button';

const TopBar: React.FC = () => {
  return (
    <div className="relative flex min-h-24 w-full flex-wrap items-center justify-between gap-3 bg-[#d53232] px-4 py-3 md:px-6">
      <div
        className="flex cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        <Image src={PartyLogo} alt="Logo" width={100} height={100} />
      </div>
      <div className="hidden md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2">
        <Location location="Recife - PE"></Location>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 font-extralight md:gap-4">
        <div className="hidden md:flex">
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
          <Button className="text-black bg-transparent border-none shadow-none text-lg hover:bg-gray-200" onClick={() => (window.location.href = '/landing-page')}>
            Sobre nós
          </Button>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Button className="text-black bg-[#d53232] border border-black h-10 text-base md:text-lg hover:bg-[#b02a2a]" onClick={() => (window.location.href = '/login')}>
            Login
          </Button>
          <Button className="text-white bg-black h-10 px-3 text-base md:px-4 md:text-lg hover:bg-gray-800" onClick={() => (window.location.href = '/signup')}>
            Cadastre-se
          </Button>
        </div>
      </div>
      <div className="flex w-full justify-center md:hidden">
        <Location location="Recife - PE"></Location>
      </div>
    </div>
  );
};

export default TopBar;
