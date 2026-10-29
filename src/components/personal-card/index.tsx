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
    <article className="rounded-3xl bg-card p-5 shadow-card">
      <Image src={image} alt="" height={80} width={80} className="h-20 w-20 rounded-full object-cover" />
      <h3 className="mt-3 font-semibold leading-6">{name}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{ocupation}</p>
      <div className="mt-3 flex gap-2">
        <a
          href={linkedinLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href={instaLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram de ${name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-secondary"
        >
          <Instagram className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
};

export default PersonalCard;
