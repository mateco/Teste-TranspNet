export interface Product {
  id: number
  title: string
  price: number
  stock: number
  category: string
  tags?: string[]
}

export interface Category {
  slug: string
  name: string
  url: string
}
