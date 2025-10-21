"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../hooks/useCart";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const mockProducts: Product[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `Товар №${i + 1}`,
  price: 500 + i * 100,
  image: "/next.svg",
}));

export default function CatalogPage() {
  const router = useRouter();
  const { add } = useCart();
  const [products] = useState<Product[]>(mockProducts);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Каталог товаров</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-24 h-24 object-contain mb-3"
            />
            <p className="text-gray-700 font-semibold mb-1">{p.name}</p>
            <p className="text-gray-500 mb-3">{p.price.toLocaleString()} с</p>

            <button
              onClick={() => add(p)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1 transition"
            >
              В корзину
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => router.push("/")}
          className="text-blue-500 hover:underline"
        >
          ← Вернуться на главную
        </button>
      </div>
    </main>
  );
}
