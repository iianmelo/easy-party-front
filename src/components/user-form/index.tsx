'use client';

import { useState } from 'react';

export default function CompanySignupForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    portfolioLink: '',
    serviceType: '',
    description: '',
    phone: '',
    location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Dados enviados:', formData);
    setTimeout(() => setIsSubmitting(false), 1000); // Simula envio de dados
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nome de usuário</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Senha</label>
          <input type="url" name="portfolioLink" value={formData.portfolioLink} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Tipo de Serviço</label>
          <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="">Selecione um serviço</option>
            <option value="buffet">Buffet</option>
            <option value="decoracao">Decoração</option>
            <option value="fotografia">Fotografia</option>
            <option value="musica">Música e Entretenimento</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Descrição da Empresa</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Telefone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Localização</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#d53232] hover:bg-red-500 text-white p-2 rounded">
          {isSubmitting ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}