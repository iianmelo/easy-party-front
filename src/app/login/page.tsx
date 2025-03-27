'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {PartyLogo} from '../../assets/index';


export default function Login() {
  const session = useSession();
  
  const [cliente,setCliente] = useState(false);
  const [prestador, setPrestador] = useState(false);

  if (session.status === 'authenticated') {
    redirect('/');
  }

  return (
    <div className="flex flex-1 flex-row h-full justify-around items-center bg-gray-100">
      
      <div className="flex flex-1 flex-col h-full justify-center items-center w-1/2 bg-[#D53232] gap-2">
        <h1 className="text-6xl text-white font-bold">
          Easy Party
        </h1>
        <Image src={PartyLogo} alt='Logo EasyParty' />
      </div>
      <div className="flex flex-1 flex-col h-full justify-around items-center w-1/2 bg-gray-100">
        <Card className="w-full max-w-sm bg-white shadow-lg rounded-lg">
          <CardHeader className='flex justify-center items-center flex-col'>
            <CardTitle className="text-2xl text-gray-950 pb-4">Login</CardTitle>
            <CardDescription className="text-sm text-muted-foreground w-full flex flex-row gap-4">
              <button className='bg-[#d53232] rounded-md p-2 w-full hover:bg-red-500' onClick={() => {setCliente(true); setPrestador(false)}}>
                <div className='flex justify-center items-center gap-2 text-white'>
                  Cliente
                </div>
              </button>
              <button className='bg-[#d53232] rounded-md p-2 w-full flex gap-2 justify-center items-center hover:bg-red-500' onClick={() => {setPrestador(true); setCliente(false)}}>
                <div className='flex justify-center items-center gap-2 text-white'>
                  Fornecedor
                </div>
              </button>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 text-black">
            {cliente ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu Nome"
                    required
                    className='bg-transparent border-b-2 border-gray-300'
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className='bg-transparent border-b-2 border-gray-300'
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className='bg-transparent border-b-2 border-gray-300'
                  />
                </div>
              </>
            ) : prestador ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="email">Nome da empresa</Label>
                  <Input
                    id="nameofcompany"
                    type="name"
                    placeholder="Nome da empresa"
                    required
                    className='bg-transparent border-b-2 border-gray-300'
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Contato</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className='bg-transparent border-b-2 border-gray-300'
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className='bg-transparent border-b-2 border-gray-300'
                  />
                </div>
              </>
            ):(
              <></>
            )}
          </CardContent>
          <CardFooter>
            <button type="submit" className="w-full bg-[#d53232] rounded-md p-2 text-white hover:bg-red-500">Login</button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
