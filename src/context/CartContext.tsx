import { createContext, useContext, useState, ReactNode } from 'react';
import { ForfaitType, MotorBrand } from '../types';
import { ExactPower } from '../utils/pricing';

interface CartItem {
  forfaitType: ForfaitType;
  name: string;
  price: number;
  powerRange?: string;
  power?: ExactPower;
  brand?: MotorBrand;
}

interface MotorSelection {
  brand: MotorBrand;
  model: string;
  power: number;
  powerRange?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  motorSelection: MotorSelection | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  setMotorInfo: (motor: MotorSelection) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [motorSelection, setMotorSelection] = useState<MotorSelection | null>(null);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
    setMotorSelection(null);
  };

  const setMotorInfo = (motor: MotorSelection) => {
    setMotorSelection(motor);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        motorSelection,
        addToCart,
        removeFromCart,
        clearCart,
        setMotorInfo,
        cartCount: cartItems.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
