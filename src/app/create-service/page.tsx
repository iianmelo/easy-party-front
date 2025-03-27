"use client";

import { TopBar } from "components";
import { useState } from "react";

export default function CreateService() {
  const [selectedCategories, setSelectedCategories] = useState([""]);

  const categories = ["Alimentação", "Decoração", "Mídia", "Música"];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="w-full h-full">
        <TopBar></TopBar>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <h2 className="text-[50px] font-bold mb-20">Create a Service</h2>
        <div className="flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl gap-6">
            <div className="flex items-center justify-center w-full md:w-1/2 border-dashed border-2 border-gray-300 rounded-lg p-6">
            <span className="text-gray-400 text-sm">Anexe suas imagens</span>
            </div>

            <div className="flex flex-col w-full md:w-1/2 space-y-4">
            <input
                type="text"
                placeholder="Título do Serviço"
                className="border rounded-md p-2 w-full"
            />
            <input
                type="text"
                placeholder="Preço"
                className="border rounded-md p-2 w-full"
            />
            <textarea
                placeholder="Descrição"
                className="border rounded-md p-2 w-full h-32"
            ></textarea>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 rounded-md text-sm transition-all border ${
                    selectedCategories.includes(category)
                        ? "bg-[#d53232] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                >
                    {category}
                </button>
                ))}
            </div>
            </div>
        </div>
        <button className="mt-10 bg-[#d53232] hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md">
            Salvar
        </button>
        </div>
    </div>
  );
}