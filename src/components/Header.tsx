"use client";

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "./CartDrawer";
import { ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Header() {
  const [showCatalog, setShowCatalog] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-700 to-blue-600 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* ЛЕВАЯ ЧАСТЬ — ЛОГОТИП + КАТАЛОГ */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-white tracking-tight">
            NOVA Market
          </Link>

          <button
            onClick={() => setShowCatalog(!showCatalog)}
            className="relative w-10 h-10 flex flex-col justify-center items-center group ml-4"
            aria-label="Toggle catalog"
          >
            <span
              className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
                showCatalog ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 my-1 ${
                showCatalog ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
                showCatalog ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* ЦЕНТР — ПОИСК */}
        <div className="relative w-1/2 hidden md:block mr-auto ml-6">
          <input
            type="text"
            placeholder="Найти в NOVA"
            className="w-full py-2 pl-4 pr-10 rounded-full text-gray-800 placeholder-gray-500 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* ПРАВАЯ ЧАСТЬ — ПРОФИЛЬ + КОРЗИНА */}
<div className="flex items-center gap-3 relative">
  {/* КНОПКА ПРОФИЛЯ */}
  <button
    onClick={() => setShowLogin(true)}
    className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
  >
    <User className="w-6 h-6 text-white" />
  </button>

  {/* КНОПКА КОРЗИНЫ */}
  <button
    onClick={() => setCartOpen(!cartOpen)}
    className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
  >
    <ShoppingCart className="w-6 h-6 text-white" />
  </button>
</div>

{/* МОДАЛЬНОЕ ОКНО ВХОДА */}
{showLogin && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[420px] p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Войти или создать профиль</h2>
        <button
          onClick={() => setShowLogin(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-3">Введите номер телефона</p>

      <input
        type="tel"
        id="phoneInput"
        placeholder="+996 000 00-00-00"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={() => {
          const phone = (document.getElementById("phoneInput") as HTMLInputElement)?.value;
          if (!phone) return alert("Введите номер телефона!");
          const user = {
            phone,
            balance: 0,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem("nova_user", JSON.stringify(user));
          setShowLogin(false);
          router.push("/profile");
        }}
        className="w-full py-2 rounded-lg text-white font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
      >
        Подтвердить
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Продолжая, вы соглашаетесь с условиями использования NOVA Market.
      </p>
    </div>
  </div>
)}

      </div>

      {/* КАТАЛОГ (открывается/закрывается) */}
      {showCatalog && (
        <div className="bg-white text-gray-800 shadow-md py-4 animate-fadeIn">
          <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Одежда</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Футболки</li>
                <li>Куртки</li>
                <li>Платья</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Электроника</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Телефоны</li>
                <li>Ноутбуки</li>
                <li>Наушники</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

    </header>
  );
}

  