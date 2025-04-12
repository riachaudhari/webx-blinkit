import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  removeFromCart: (productName: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => useContext(CartContext)!;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Omit<Product, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(p => p.name === product.name);
      if (existing) {
        return prev.map(p =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName: string) => {
    setCart(prev =>
      prev
        .map(p =>
          p.name === productName ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter(p => p.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
