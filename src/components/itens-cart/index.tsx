import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Counter from 'components/counter';

interface ItemProps {
  image: StaticImageData;
  description: string;
  price: string;
}

const ItemCart: React.FC<ItemProps> = ({ image, description, price }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        height: '104px',
        width: '648px',
        position: 'relative'
      }}
    >
      <Image src={image} height={104} width={104} alt={'item'} />
      <div className="flex flex-col gap-9">
        <p className="font-medium">{description}</p>
        <p className="text-[16px] font-bold">{price}</p>
      </div>
      <div className="absolute right-0 bottom-0">
        <Counter />
      </div>
    </div>
  );
};

export default ItemCart;
