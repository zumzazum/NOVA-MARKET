"use client";

import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);

  // Загружаем данные при входе
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("nova_user") || "null");
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    if (savedUser) {
      setUser(savedUser);
      setIsRegistered(true);
      setBalance(savedUser.balance || 0);
    }
    setOrders(savedOrders);
  }, []);

  // Обработка регистрации
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      balance: 5000, // стартовый баланс, можно изменить
    };
    localStorage.setItem("nova_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsRegistered(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("nova_user");
    setUser(null);
    setIsRegistered(false);
  };

  return (
    <main className="max-w-3xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-6">
      {!isRegistered ? (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Регистрация пользователя
          </h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-gray-600">Имя</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-600">Телефон</label>
              <input
                type="text"
                name="phone"
                required
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Зарегистрироваться
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Личный кабинет</h1>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Выйти
            </button>
          </div>

          <div className="mb-6">
            <p>
              <strong>Имя:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Телефон:</strong> {user?.phone}
            </p>
            <p className="text-green-600 font-semibold mt-2">
              💰 Баланс: {balance} с
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">История покупок</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">Вы ещё не делали заказов.</p>
            ) : (
              <ul className="space-y-3">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="border p-3 rounded-lg flex justify-between items-center"
                  >
                    <span>
                      Заказ №{order.id} — {order.total} с
                    </span>
                    <span className="text-sm text-gray-500">
                      {order.date}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </main>
  );
}
