import { Button } from "react-bootstrap"
import { useShoppingCartContext } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utils/formatCurrency"

type Product = {
    id: number
    title: string
    price: number
    images: string[]
}
const ItemCard = ({ product }: { product: Product }) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCartContext()
    const quantity = getItemQuantity(product.id)
    return (
        <div>
            <img src={product.images[0]} height={300} width={300} />
            <h2>{product.title}</h2>
            <p>{formatCurrency(product.price)}</p>
            {quantity === 0 ? (
                <Button onClick={() => increaseCartQuantity(product.id)}>Add to Cart</Button>
            ) : (
                <div>
                    <div>
                        <Button onClick={() => decreaseCartQuantity(product.id)}>-</Button>
                        <span>{quantity}</span>
                        <Button onClick={() => increaseCartQuantity(product.id)}>+</Button>
                    </div>
                    <Button variant="danger" onClick={() => removeFromCart(product.id)}>Remove Form Cart</Button>
                </div>
            )}
        </div>
    )
}

export default ItemCard