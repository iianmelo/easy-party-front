"use client"
import React, { useState } from "react";
import TopBar from "components/top-bar";
import Footer from "components/footer";
import { motion } from "framer-motion";
import { getServices } from "services/getServices";

const suggestions = [
    "Quero um aniversário temático de Hollywood para 50 pessoas.",
    "Preciso de um casamento íntimo na praia, com buffet e decoração.",
    "Quero uma festa com DJ e drinks personalizados para 100 convidados."
];
interface Service {
    service_id: number;
    company_name: string;
    service_name: string;
    description: string;
    price_min: string;
    price_max: string;
    event_types: string[];
    specialties: string[];
    rating: string;
    location: string;
}

const CreateParty: React.FC = () => {

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [haveNothing, setHaveNothing] = useState(false);


    const handleSubmit = async () => {
        setLoading(true);
        setHaveNothing(false);
        try {
            const data = await getServices({ prompt });
            if (data.length === 0) {
                setHaveNothing(true);
            } else {
                setHaveNothing(false);
            }
            setServices(data);
        }catch(err) {
            console.log(err);
            alert("Erro ao buscar serviços");
        }finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <TopBar></TopBar>
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-[#d53232] to-white text-white">
                <motion.h1
                    className="text-4xl font-bold mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Descreva sua festa dos sonhos e deixe a <span className="text-blue-300">Easy Party</span> cuidar do resto! 🎉
                </motion.h1>

                <p className="text-lg text-center mb-6 max-w-xl">
                    Não sabe por onde começar? Apenas nos conte o que imagina e nossa IA encontrará os melhores serviços para transformar sua festa em realidade!
                </p>

                <div className="w-full max-w-2xl bg-white p-4 rounded-2xl shadow-lg flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Quero uma festa de aniversário de 1 ano o orçamento é de R$ 5.000,00"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-3 text-gray-900 rounded-lg focus:outline-none"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-300 text-gray-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-500 transition"
                    >
                        Encontrar
                    </button>
                </div>

                <p className="text-lg text-black mt-6">💡 Sugestões:</p>
                <ul className="mt-2 space-y-2">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => setPrompt(suggestion)}
                            className="cursor-pointer bg-white/60 p-3 rounded-lg text-black hover:bg-white transition shadow-xl"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {loading && <p className="text-black text-xl text-center font-bold animate-pulse">Encontrando os melhores serviços para sua festa ...</p>}
                {["Alimentação", "Áudio Visual", "Entretenimento", "Local", "Ornamentação"].map((category) => {
                    let filteredServices: Service[] = [];
                    switch (category) {
                        case "Alimentação":
                            filteredServices = services.filter(service =>
                                service.specialties.includes("Buffet") || service.specialties.includes("Catering")
                            );
                            break;
                        case "Áudio Visual":
                            filteredServices = services.filter(service =>
                                service.specialties.includes("Som") || service.specialties.includes("Iluminação")
                            );
                            break;
                        case "Entretenimento":
                            filteredServices = services.filter(service =>
                                service.specialties.includes("Fotografia") || service.specialties.includes("DJ")
                            );
                            break;
                        case "Local":
                            filteredServices = services.filter(service =>
                                service.specialties.includes("Espaço")
                            );
                            break;
                        case "Ornamentação":
                            filteredServices = services.filter(service =>
                                service.specialties.includes("Decoração") || service.specialties.includes("Lembrancinhas")
                            );
                            break;
                        default:
                            break;
                    }

                    if (filteredServices.length === 0) {
                        return null;
                    }

                    return (
                        <div key={category} className="mt-6">
                            <h2 className="text-2xl font-bold text-center text-black">{category}</h2>
                            {filteredServices.map((service) => (
                                <div key={service.service_id} className="bg-white p-4 rounded-lg shadow-md mt-4">
                                    <h3 className="text-xl font-semibold">{service.service_name}</h3>
                                    <p className="text-gray-700">{service.company_name}</p>
                                    <p className="text-gray-600">{service.description}</p>
                                    <p className="text-gray-800 font-bold">Preço: {service.price_min} - {service.price_max}</p>
                                    <p className="text-gray-600">Avaliação: {service.rating}</p>
                                </div>
                            ))}
                        </div>
                    );
                })}
                {haveNothing && (
                    <p className="text-gray-600 text-center mt-6">Nenhum serviço correspondente foi encontrado. Tente ajustar sua descrição para obter melhores resultados!</p>
                )}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default CreateParty;