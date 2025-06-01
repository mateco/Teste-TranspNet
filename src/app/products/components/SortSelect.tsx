'use client'

const sortOptions = [
  { label: 'Nome (A-Z)', value: 'title-asc' },
  { label: 'Nome (Z-A)', value: 'title-desc' },
  { label: 'Preço (menor)', value: 'price-asc' },
  { label: 'Preço (maior)', value: 'price-desc' },
  { label: 'Estoque (menor)', value: 'stock-asc' },
  { label: 'Estoque (maior)', value: 'stock-desc' },
]

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SortSelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="border px-3 py-2 rounded w-full md:w-64">
      <option value="">Ordenar por</option>
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
