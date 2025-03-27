"use client";

import Image from 'next/image';
import { VictorProfile, BuffetCard, JoaoProfile, mastercard, visa, pix } from 'assets';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import TopBar from '../../components/top-bar';
import Footer from '../../components/footer';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="container mx-auto p-8 flex flex-col lg:flex-row justify-between space-x-8">
        {/* Payment List */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6">Pagamento</h2>
          <div className="space-y-4">
            {[
              { name: 'Buffet Festa', category: 'Alimentação', price: 'R$ 1.002,00', image: BuffetCard },
              { name: 'Barman João', category: 'Bebidas', price: 'R$ 959,90', image: JoaoProfile },
              { name: 'DJ Victor', category: 'Música', price: 'R$ 8.599,90', image: VictorProfile }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-200 rounded-lg">
                <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-full" />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
                <p className="font-semibold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 p-6 bg-red-600 text-white rounded-lg">
          <h3 className="text-xl font-bold mb-4">Detalhes do Cartão</h3>
          <div className="flex gap-[72px] mb-4">
            <Image src={mastercard} alt="Mastercard" width={80} height={30} />
            <Image src={visa} alt="Visa" width={80} height={30} />
            <Image src={pix} alt="Pix" width={80} height={30} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome no Cartão</Label>
            <Input id="name" type="text" className="text-black" />

            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input id="cardNumber" type="text" placeholder="1111 2222 3333 4444" className="text-black" />

            <div className="flex space-x-4">
              <div>
                <Label htmlFor="expiry">Válido até</Label>
                <Input id="expiry" type="text" placeholder="MM/AA" className="text-black" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" type="text" placeholder="123" className="text-black" />
              </div>
            </div>
          </div>
          <div className="mt-6 text-lg">
            <p>Total: <span className="font-bold">R$ 10.561,80</span></p>
            <p>Taxa (5%): <span className="font-bold">R$ 528,09</span></p>
            <p className="font-bold text-xl">Total (Taxa Incl.): R$ 11.089,89</p>
          </div>
          <Button className="w-full mt-4 bg-black text-white">Confirmar</Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
