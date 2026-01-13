import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './api/products'

type Product = {
  id: number
  title: string
  price: number
}

function App() {
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(0)

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p style={center}>Loading...</p>
  if (error) return <p style={center}>Error mengambil data</p>

  const filteredData = data
    ?.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p => (maxPrice ? p.price <= maxPrice : true))

  return (
    <div style={container}>
      <div style={wrapper}>
        <h1 style={title}>Product List</h1>

        {/* SEARCH & FILTER */}
        <div style={filterBar}>
          <input
            placeholder="Search product..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={input}
          />

          <input
            type="number"
            placeholder="Max price"
            value={maxPrice || ''}
            onChange={e => setMaxPrice(Number(e.target.value))}
            style={input}
          />
        </div>

        {/* LIST */}
        <div style={card}>
          <ul style={list}>
            {filteredData?.map(p => (
              <li key={p.id} style={item}>
                <span>{p.title}</span>
                <span>${p.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App

/* ================= STYLES ================= */

const container = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#020617',
  color: '#e5e7eb',
}

const wrapper = {
  width: '100%',
  maxWidth: '600px',
}

const title = {
  textAlign: 'center' as const,
  marginBottom: '20px',
}

const filterBar = {
  display: 'flex',
  gap: '10px',
  marginBottom: '16px',
}

const input = {
  flex: 1,
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #334155',
  background: '#020617',
  color: '#e5e7eb',
}

const card = {
  background: '#020617',
  borderRadius: '12px',
  padding: '20px',
  border: '1px solid #1e293b',
}

const list = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
}

const item = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px 0',
  borderBottom: '1px solid #1e293b',
}

const center = {
  textAlign: 'center' as const,
  marginTop: '100px',
}