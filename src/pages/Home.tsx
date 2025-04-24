import ItemCard from "../components/ItemCard"
import { useProducts } from "../hooks/useProducts"


const Home = () => {
    const { isPending, error, data } = useProducts()
    if (error) {
        alert("Error Occured...!")
    }
    return (
        <div>
            {isPending ? <h1>Loading...</h1> : (
                data?.products.map((product, i) => (
                    <ItemCard key={i} product={product} />
                ))
            )}
        </div>
    )
}

export default Home