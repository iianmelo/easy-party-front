import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Instagram, Linkedin } from 'lucide-react';

interface PersonalCardProps {
  image: string | StaticImageData;
  name: string;
  ocupation: string;
}

const linkedinLinks: { [key: string]: string } = {
    'João Fellows': 'https://www.linkedin.com/in/joão-fellows-b2b07732a',
    'Rafael Alves': 'https://www.linkedin.com/in/rafael-alves-701741269/',
    'Victor Mendonça': 'https://www.linkedin.com/in/victor-mendonca-aguiar-94aa25281/',
    'Guilherme Montenegro': 'https://www.linkedin.com/in/guilherme-albuquerque-85b0081a9/',
    'Ian Melo': 'https://www.linkedin.com/in/ian-melo-2340312a8/',
};

const instaLinks: { [key: string]: string } = {
    'João Fellows': 'https://www.instagram.com/joao_fellows/',
    'Rafael Alves': 'https://www.instagram.com/r4faelalves_/',
    'Victor Mendonça': 'https://www.instagram.com/victor_mendonca0607/',
    'Guilherme Montenegro': 'https://www.instagram.com/guilherme_montt/',
    'Ian Melo': 'https://www.instagram.com/ian.mmelo/',
};

const PersonalCard: React.FC<PersonalCardProps> = ({
  image,
  name,
  ocupation,
}) => {

  const linkedinLink = linkedinLinks[name] || '#';
  const instaLink = instaLinks[name] || '#';

  return (
    <div className="items-start flex flex-col justify-between w-full pl-6 pr-6">
      <Image src={image} alt={name} height={110} width={110} className='rounded-full' />
      <h1 className="font-semibold text-lg leading-7">{name}</h1>
      <p className="font-normal text-sm leading-6">{ocupation}</p>
      <div className="flex gap-3 item-center justify-center mt-2">
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
          <Linkedin></Linkedin>
        </a>
        <a href={instaLink} target="_blank" rel="noopener noreferrer">
          <Instagram></Instagram>
        </a>  
      </div>
    </div>
  );
};

export default PersonalCard;
