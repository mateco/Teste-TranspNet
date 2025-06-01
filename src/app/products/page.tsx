'use client'

import { useEffect, useState } from 'react'
import { Product, Category } from '@/types/product'
import Filters from './components/Filters'
import SortSelect from './components/SortSelect'
import ProductTable from './components/ProductTable'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [errorProducts, setErrorProducts] = useState('')
  const [errorCategories, setErrorCategories] = useState('')

  const limit = 10

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setErrorProducts('')
      const skip = (page - 1) * limit

      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
      }
      if (selectedCategory) {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`
      }

      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Erro ao carregar produtos.')
        const data = await res.json()
        setProducts(data.products || [])
      } catch (error: any) {
        setErrorProducts(error.message || 'Erro inesperado ao buscar produtos.')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [search, selectedCategory, page])

  useEffect(() => {
    const fetchCategories = async () => {
      setErrorCategories('')
      try {
        const res = await fetch('https://dummyjson.com/products/categories')
        if (!res.ok) throw new Error('Erro ao carregar categorias.')
        const data = await res.json()

        // A API já retorna a estrutura correta (slug, name, url)
        setCategories(Array.isArray(data) ? data : [])
      } catch (error: any) {
        setErrorCategories(error.message || 'Erro inesperado ao buscar categorias.')
        setCategories([])
      }
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
    <div className="flex flex-col">
      {errorCategories && <p className="text-red-600 mb-4">⚠️ {errorCategories}</p>}

      <div className="flex justify-center mb-6">
        <h5 className="text-xl md:text-2xl font-bold text-center">Filtro de Produtos</h5>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <Filters
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          categories={categories}
          onCategoryChange={setSelectedCategory}
        />
        <SortSelect value={sort} onChange={handleSort} />
      </div>

      {errorProducts && <p className="text-red-600 mb-4">⚠️ {errorProducts}</p>}

      <div className="overflow-x-auto">
        <ProductTable products={products} loading={loading} />
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 text-black"
        >
          Anterior
        </button>
        <span className="text-white">Página {page}</span>
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
