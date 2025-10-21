"use client";

import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, total, clear } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    delivery: "pickup",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Корзина пуста!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total,
      customer: form,
      status: "В обработке",
    };

    // Сохраняем в localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Очищаем корзину
    clear();

    // Переход на страницу заказов
    router.push("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <h1 className="text-2xl font-semibold mb-4">Корзина пуста</h1>
        <a href="/" className="text-blue-600 underline">
          Вернуться на главную
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Оформление заказа</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Имя</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600">Телефон</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600">Адрес</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-600">Тип доставки</label>
          <select
            name="delivery"
            value={form.delivery}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-1"
          >
            <option value="pickup">Самовывоз</option>
            <option value="delivery">Доставка</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-lg font-semibold text-gray-700">
            Итого: <span className="text-blue-600">{total} с</span>
          </p>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Оформить заказ
          </button>
        </div>
      </form>
    </main>
  );
}
