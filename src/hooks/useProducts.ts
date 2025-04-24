import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

type Product = {
    id: number
    title: string
    price: number
    images: string[]
}

export const useProducts = () => {
    return useQuery<{ products: Product[] }>({
        queryKey: ["productsData"],
        queryFn: async () => {
            const res = await fetch('https://dummyjson.com/products?limit=100')
            return res.json()
        }
    })
}

export const useProduct = (id: number) => {
    return useSuspenseQuery<Product>({
        queryKey: ["productData", id],
        queryFn: async () => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            return res.json();
        }
    })
}