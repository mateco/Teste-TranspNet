'use client'

interface Category {
  slug: string
  name: string
  url: string
}

interface Props {
  search: string
  selectedCategory: string
  categories: Category[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export default function Filters({
  search,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: Props) {
  return (
    <>
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-64"
      />

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-64"
      >
        <option value="">Todas categorias</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </>
  )
}

