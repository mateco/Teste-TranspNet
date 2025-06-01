'use client'

import { useEffect, useState } from 'react'
import { Product, Category } from '@/types/product'
import Filters from '@/app/products/components/Filters'
import SortSelect from '@/app/products/components/SortSelect'
import ProductTable from '@/app/products/components/ProductTable'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)

  const limit = 10

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const skip = (page - 1) * limit

      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
      }
      if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`
      }

      const res = await fetch(url)
      const data = await res.json()
      setProducts(data.products || [])
      setLoading(false)
    }

    fetchProducts()
  }, [search, selectedCategory, page])

useEffect(() => {
  const fetchCategories = async () => {
    const res = await fetch('https://dummyjson.com/products/categories')
    const data = await res.json()
    setCategories(data) // agora data é um array de objetos com slug e name
  }

  fetchCategories()
}, [])


  const handleSort = (value: string) => {
    setSort(value)
    const [field, order] = value.split('-')
    const sorted = [...products].sort((a, b) => {
      const aValue = a[field as keyof Product]
      const bValue = b[field as keyof Product]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      return 0
    })
    setProducts(sorted)
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Produtos</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <Filters
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={setSelectedCategory}
        />
        <SortSelect value={sort} onChange={handleSort} />
      </div>

      <ProductTable products={products} loading={loading} />

      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 text-black"
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-gray-200 px-4 py-2 rounded text-black"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
