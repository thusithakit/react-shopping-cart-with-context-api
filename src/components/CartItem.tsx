import { Button } from "react-bootstrap"
import { useShoppingCartContext } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utils/formatCurrency"
import { useProduct } from "../hooks/useProducts"

const CartItem = ({ id, quantity }: { id: number, quantity: number }) => {
    const { removeFromCart } = useShoppingCartContext()
    const { data } = useProduct(id)
    return (
        <div>
            <img src={data.images[0]} width={50} height={50} />
            <h5>{data.title}{quantity > 1 && <span>x{quantity}</span>}</h5>
            <h6>{formatCurrency(data.price * quantity)}</h6>
            <Button onClick={() => removeFromCart(id)}>Remove</Button>
        </div>
    )
}

export default CartItem