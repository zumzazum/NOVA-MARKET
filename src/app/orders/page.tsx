"use client";

import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Мои заказы</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">У вас пока нет заказов.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">
                  Заказ №{order.id}
                </p>
                <span
                  className={`text-sm font-medium ${
                    order.status === "Доставлен"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Дата: {order.date} • Сумма: {order.total} с
              </p>
              <ul className="mt-2 text-gray-700 text-sm list-disc pl-5">
                {order.items.map((item: any, i: number) => (
                  <li key={i}>
                    {item.name} — {item.price} с × {item.qty}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-500 mt-2">
                Имя: {order.customer.name}, Телефон: {order.customer.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
