import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ServiceCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
  price
}) => {
  return (
    <div className="items-start flex flex-col justify-between w-full pl-6 pr-6">
      <Image src={image} alt={title} height={220} width={220} />
      <h1 className="font-semibold text-lg leading-7">{title}</h1>
      <p className="font-normal text-sm leading-6">{description}</p>
      <h1 className="font-semibold text-xl leading-7">{price}</h1>
    </div>
  );
};

export default ServiceCard;
