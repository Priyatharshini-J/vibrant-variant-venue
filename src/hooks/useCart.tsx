
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update count and total
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cart]);
  
  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      // Check if item already exists in cart (same product, color and size)
      const itemKey = `${newItem.id}-${newItem.color || ''}-${newItem.size || ''}`;
      const existingItemIndex = prevCart.findIndex(item => 
        `${item.id}-${item.color || ''}-${item.size || ''}` === itemKey
      );
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        // Item doesn't exist, add to cart
        return [...prevCart, newItem];
      }
    });
  };
  
  const removeFromCart = (itemToRemove: CartItem) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.id === itemToRemove.id && 
        item.color === itemToRemove.color && 
        item.size === itemToRemove.size)
    ));
  };
  
  const updateQuantity = (itemToUpdate: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemToUpdate);
      return;
    }
    
    setCart(prevCart => prevCart.map(item => 
      (item.id === itemToUpdate.id && 
       item.color === itemToUpdate.color && 
       item.size === itemToUpdate.size)
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
