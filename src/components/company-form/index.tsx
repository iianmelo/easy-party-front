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
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSent(false);
    console.log('Dados enviados:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded-3xl border border-border bg-card p-6 shadow-card">
      <h2 className="text-xl font-bold mb-4">Cadastro de Empresa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nome da Empresa</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Instagram ou Portfólio</label>
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

        <button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {isSubmitting ? 'Enviando…' : 'Cadastrar em demonstração'}
        </button>
        {sent && (
          <p className="text-sm text-muted-foreground" role="status">
            Recebido só nesta tela. Nenhum dado foi enviado a um servidor.
          </p>
        )}
      </form>
    </div>
  );
}