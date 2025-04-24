import { createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}
type CartItem = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCartContext() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    function openCart() {
        setIsOpen(true)
    }
    function closeCart() {
        setIsOpen(false)
    }
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id: number) {
        setCartItems(prev => {
            if (prev.find(item => item.id === id) == null) {
                return [...prev, { id, quantity: 1 }]
            } else {
                return prev.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity(id: number) {
        setCartItems(prev => {
            if (prev.find(item => item.id === id)?.quantity === 1) {
                return prev.filter(item => item.id !== id)
            } else {
                return prev.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number) {
        setCartItems(prev => {
            return prev.filter(item => item.id !== id)
        })
    }
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}