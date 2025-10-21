"use client";

import { useMemo, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

type AddPayload = { id: number; name: string; price: number };

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const add = (p: AddPayload) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing) {
        // Если товар уже есть — увеличиваем количество
        return prev.map((i) =>
          i.id === p.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      // Если товара нет — добавляем с qty = 1
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const decrease = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const remove = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setCartItems([]);

  const total = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cartItems]
  );

  return { cartItems, add, decrease, remove, clear, total };
}
