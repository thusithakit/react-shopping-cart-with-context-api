import { Button, Container, Nav, Navbar as NavBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCartContext } from "../context/ShoppingCartContext"
const Navbar = () => {
    const { cartQuantity, openCart } = useShoppingCartContext()
    return (
        <NavBs>
            <Container>
                <Nav>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
                    <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                </Nav>
                {
                    cartQuantity > 0 && (
                        <Button onClick={openCart}>
                            {cartQuantity} in the Cart
                        </Button>
                    )
                }
            </Container>
        </NavBs>
    )
}

export default Navbar