export type Product = {
  id: number
  title: string
  price: number
  category: string
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://dummyjson.com/products')
  if (!res.ok) throw new Error('Gagal fetch produk')

  const data = await res.json()
  return data.products
}
