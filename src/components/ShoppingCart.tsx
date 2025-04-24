import { Offcanvas } from "react-bootstrap"
import { useShoppingCartContext } from "../context/ShoppingCartContext"
import CartItem from "./CartItem"
import { formatCurrency } from "../utils/formatCurrency"
import { useProducts } from "../hooks/useProducts"

const ShoppingCart = ({ isOpen }: { isOpen: boolean }) => {
    const { closeCart, cartItems } = useShoppingCartContext()
    const { data: productData } = useProducts();

    const total = cartItems.reduce((total, item) => {
        const product = productData?.products.find(p => p.id === item.id)
        return total + (product?.price || 0) * item.quantity
    }, 0)
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.map((cartItem, i) => (
                    <CartItem key={i} {...cartItem} />
                ))}
                <h3>Total:{formatCurrency(total)}</h3>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ShoppingCart