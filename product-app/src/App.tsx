import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './api/products'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p style={center}>Loading...</p>
  if (error) return <p style={center}>Error mengambil data</p>

  const filteredData = data?.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={container}>
      <div style={card}>
        <h1 style={title}>Product List</h1>

        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={input}
        />

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
  )
}

export default App

const container = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#020617',
}

const card = {
  width: '600px',
  background: '#020617',
  borderRadius: '16px',
  padding: '24px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
}

const title = {
  color: '#e5e7eb',
  marginBottom: '16px',
  textAlign: 'center' as const,
}

const input = {
  width: '100%',
  padding: '10px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  background: '#0f172a',
  color: '#e5e7eb',
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
  color: '#e5e7eb',
}

const center = {
  textAlign: 'center' as const,
  marginTop: '100px',
}
