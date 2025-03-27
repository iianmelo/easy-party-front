"use client";

import { Footer, TopBarLogged } from "components";
import Image from "next/image";
import { PlayCard, BuffetCard, DJCard, MidiaCard } from "assets";
import { Bookmark } from "lucide-react";

export default function ServiceList() {
    const services = [
      {
        category: "Recreação",
        title: "Piscina de bolinhas",
        price: "R$ 99,90 por hora",
        image: PlayCard,
      },
      {
        category: "Alimentação",
        title: "Buffet para festas",
        price: "R$ 39,90 por pessoa",
        image: BuffetCard,
      },
      {
        category: "Música",
        title: "DJ",
        price: "R$ 99,90",
        image: DJCard,
      },
      {
        category: "Mídia",
        title: "Fotógrafo",
        price: "R$ 99,90",
        image: MidiaCard,
      },
    ];
  
    return (
      <div className="w-full h-full">
        <TopBarLogged></TopBarLogged>
        <div className="p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <Bookmark className="w-10 h-10" /> LISTA
            </h2>
            <div className="space-y-4">
            {services.map((service, index) => (
                <div
                key={index}
                className="flex items-center p-4 bg-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-500"
                >
                <Image
                    src={service.image}
                    alt={service.title}
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-md mr-4"
                />
                <div>
                    <p className="text-sm font-semibold text-gray-600">
                    {service.category}
                    </p>
                    <p className="text-lg font-medium">{service.title}</p>
                    <p className="text-md font-bold text-gray-800">{service.price}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }