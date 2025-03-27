import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface CartItemProps {
  image: StaticImageData;
  description: string;
  price: string;
}

const CartItem: React.FC<CartItemProps> = ({ image, description, price }) => {
  return (
    <div className="flex space-x-4">
      {/* Imagem do item */}
      <Image src={image} alt={description} width={104} height={104} />
      
      {/* Descrição e preço */}
      <div className="flex-1">,
        <p className="text-[16px] font-medium">{description}</p>
        <p className="text-[16px] font-bold">{price}</p>
      </div>
    </div>
  );
};

export default CartItem;