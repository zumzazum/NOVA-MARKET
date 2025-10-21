"use client";

import React from "react";
import { useCart } from "../hooks/useCart";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { cartItems, add, decrease, remove, total, clear } = useCart();

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Заголовок */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Ваша корзина</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Список товаров */}
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-sm">Корзина пуста</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString()} c
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decrease(item.id)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="font-semibold">{item.qty}</span>
                    <button
                      onClick={() => add(item)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-gray-700 font-semibold">
                    {(item.price * item.qty).toLocaleString()} c
                  </span>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 text-xs hover:underline mt-1"
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Нижняя часть — итоги */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex justify-between mb-3">
          <span className="font-medium text-gray-700">Итого:</span>
          <span className="font-bold text-gray-900">
            {total.toLocaleString()} c
          </span>
        </div>

        <button
          onClick={clear}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mb-2 transition"
        >
          Очистить корзину
        </button>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Перейти к оплате
        </button>
       <div className="mt-4 flex justify-between items-center border-t pt-4">
  <span className="font-semibold text-gray-800">Итого: {total} с</span>
  <button
    onClick={() => alert('Заказ оформлен!')}
    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    Заказать
  </button>
</div>
 
      </div>
    </aside>
  );
}
