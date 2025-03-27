import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Bar */}
      <div className="bg-red-600 text-white flex justify-between items-center px-8 py-4">
        <h1 className="text-lg font-bold">Recife - PE</h1>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Início</a>
          <a href="#" className="hover:underline">Serviços</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8 flex flex-col lg:flex-row justify-between">
        {/* Payment List */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6">Pagamento</h2>
          <div className="space-y-4">
            {[{ name: 'Buffet Festa', category: 'Alimentação', price: 'R$ 1.002,00' },
              { name: 'Barman João', category: 'Bebidas', price: 'R$ 959,90' },
              { name: 'DJ Victor', category: 'Música', price: 'R$ 8.599,90' }].map((item, index) => (
              <div key={index} className="flex justify-between p-4 bg-gray-200 rounded-lg">
                <div>
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
          <div className="flex space-x-2 mb-4">
            <Image src="/mastercard.png" alt="Mastercard" width={40} height={30} />
            <Image src="/visa.png" alt="Visa" width={40} height={30} />
            <Image src="/pix.png" alt="Pix" width={40} height={30} />
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
      <div className="text-center text-sm p-4 border-t mt-8">
        <p>2024 All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies Settings</a>
        </div>
      </div>
    </div>
  );
}
