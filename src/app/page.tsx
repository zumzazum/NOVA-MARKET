"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "../components/CartDrawer";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const PER_PAGE = 24;

function makeMockProducts(): Product[] {
  return Array.from({ length: PER_PAGE }).map((_, i) => ({
    id: i + 1,
    name: `Товар №${i + 1}`,
    price: 1200 + i * 200,
    image: "/next.svg",
  }));
}

export default function Page() {
  const [products] = useState<Product[]>(makeMockProducts());
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Главный контейнер */}
      <main className="container mx-auto pt-28 pb-10 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-contain mb-2"
              />
              <p className="text-sm text-gray-600">{p.name}</p>
              <p className="text-blue-600 font-semibold">{p.price} c</p>
              <button className="mt-2 w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition">
                В корзину
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Корзина */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
