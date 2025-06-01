
'use client'

import { Product } from '@/types/product'

interface Props {
  products: Product[]
  loading: boolean
}

export default function ProductTable({ products, loading }: Props) {
  if (loading) return <p>Carregando produtos...</p>
  if (!products.length) return <p>Nenhum produto encontrado.</p>

  return (
    <table className="min-w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left text-black">Nome</th>
          <th className="border p-2 text-left text-black">Categoria</th>
          <th className="border p-2 text-left text-black">Preço</th>
          <th className="border p-2 text-left text-black">Estoque</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="border p-2">{product.title}</td>
            <td className="border p-2">{product.category}</td>
            <td className="border p-2">${product.price}</td>
            <td className="border p-2">{product.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

