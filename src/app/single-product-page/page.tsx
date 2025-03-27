'use client';

import { useState } from 'react';
import { TopBar, Footer } from 'components';
import { BuffetCard, BuffetCard2, BuffetCard3, BuffetCard4 } from 'assets';
import Image from 'next/image';
import { Button } from 'components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from 'components/ui/accordion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from 'components/ui/breadcrumb';
import { useRouter } from 'next/navigation';

interface Service {
  serviceCategory: string;
  name: string;
  price: string;
  stars: number;
  reviews: number;
  images: string[];
  description: string;
  events: string[];
}

const Teste: Service = {
  serviceCategory: 'Alimentação',
  name: 'Buffet para Festas',
  price: 'R$99,90 por pessoa',
  stars: 3.4,
  reviews: 10,
  images: [BuffetCard, BuffetCard2, BuffetCard3, BuffetCard4],
  description:
    'Somos um buffet especializado na criação de experiências gastronômicas inesquecíveis para eventos. Com anos de expertise no mercado, oferecemos um serviço de alta qualidade, combinando sabor, sofisticação e uma apresentação impecável. Nosso compromisso é tornar sua celebração ainda mais especial, proporcionando pratos deliciosos, preparados com ingredientes frescos e selecionados.',
  events: ['Casamento', 'Aniversário', 'Corporativo']
};

export default function SingleProductPage() {
  const router = useRouter();
  const service = Teste;
  const [selectedImage, setSelectedImage] = useState(service.images[0]);

  return (
    <div className="w-full h-full">
      <TopBar></TopBar>
      <div className="flex gap-20 items-center justify-center mt-12">
        <div>
          <Breadcrumb className='mb-3'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/servicos">Serviços</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  {service.serviceCategory}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{service.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex gap-4">
          {/* Miniaturas */}
          <div className="flex flex-col gap-2">
            {service.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Miniatura ${index + 1}`}
                className="w-20 h-20 object-cover cursor-pointer border border-gray-300 hover:border-black"
                onClick={() => setSelectedImage(image)} // Atualiza a imagem principal
              />
            ))}
          </div>

          {/* Imagem Principal */}
          <div>
            <Image
              src={selectedImage}
              alt="Imagem Principal"
              className=" h-[600px] w-[520px] object-cover"
            />
          </div>
        </div>
        </div>
        <div className='max-w-[600px]'>
          <h1 className="font-bold text-[40px]">{service.name}</h1>
          <h1 className="font-bold text-[24px]">{service.price}</h1>
          <div className="flex items-center mt-3">
            {Array.from({ length: Math.floor(service.stars) }, (_, index) => (
              <svg
                key={index}
                viewBox="0 0 24 24"
                className="w-4 h-4 text-black"
              >
                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
              </svg>
            ))}
            {service.stars % 1 !== 0 && (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-black">
                <defs>
                  <linearGradient id="halfStarGradient">
                    <stop offset="50%" stopColor="black" />
                    <stop offset="50%" stopColor="gray" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z"
                  fill="url(#halfStarGradient)"
                />
              </svg>
            )}
            <span className="ml-1 text-gray-600">
              ({service.stars} estrelas)
            </span>
            <div className="flex items-center">
              <div className="w-1 h-1 bg-gray-600 rounded-full mx-2"></div>
              <span className="text-gray-600">{service.reviews} reviews</span>
            </div>
          </div>
          <p className="font-normal text-[16px] mt-3">{service.description}</p>
          <div className="flex flex-col gap-4 mt-20 ">
            <Button onClick={() => router.push("/cart")}>Adicionar ao Carrinho</Button>
          </div>
          <div className="w-full h-[1px] bg-gray-200 my-4"></div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold text-[18px]">
                Eventos
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {service.events.map((event, index) => (
                    <li className="font-bold text-[16px] " key={index}>
                      {' '}
                      • {event}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
