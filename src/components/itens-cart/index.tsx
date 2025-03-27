"use client"

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Minus, Plus } from 'lucide-react';

interface ItemProps {
  image: StaticImageData;
  description: string;
  price: string;
}

const ItemCart: React.FC<ItemProps> = ({ image, description, price }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        height: '104px',
        width: '648px',
        position: 'relative',
      }}
    >
      {/* Imagem do item */}
      <Image src={image} height={104} width={104} alt={'item'} />

      {/* Descrição e preço */}
      <div className="flex flex-col gap-9">
        <p className="font-medium">{description}</p>
        <p className="text-[16px] font-bold">{price}</p>
      </div>

      {/* Counter */}
      <div className="absolute right-0 bottom-0">
        <div className="flex items-center justify-center gap-4 p-4">
          <button
            className="border border-gray-300 rounded-full p-2"
            onClick={decrement}
            aria-label="Diminuir"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="w-12 text-center text-2xl font-bold">{count}</span>

          <button
            className="border border-gray-300 rounded-full p-2"
            onClick={increment}
            aria-label="Aumentar"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;