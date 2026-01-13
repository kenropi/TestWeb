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
    <div style={page}>
      <div style={container}>
        <h1 style={title}>Product List</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={searchInput}
        />

        <div style={card}>
          <ul style={list}>
            {filteredData?.map(p => (
              <li key={p.id} style={item}>
                <span>{p.title}</span>
                <span>${p.price}</span>
              </li>
            ))}
          </ul>

          {filteredData?.length === 0 && (
            <p style={empty}>Product tidak ditemukan</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

/* ===== STYLE ===== */

const page = {
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const container = {
  width: '100%',
  maxWidth: '700px',
  padding: '24px',
}

const title = {
  marginBottom: '16px',
  textAlign: 'center' as const,
}

const searchInput = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #1e293b',
  marginBottom: '16px',
  background: '#020617',
  color: '#e5e7eb',
  outline: 'none',
}

const card = {
  background: '#020617',
  borderRadius: '12px',
  padding: '20px',
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

const empty = {
  textAlign: 'center' as const,
  padding: '16px',
  color: '#94a3b8',
}

const center = {
  textAlign: 'center' as const,
  marginTop: '100px',
}
