import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './api/products'

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p style={center}>Loading...</p>
  if (error) return <p style={center}>Error mengambil data</p>

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>Product List</h1>

        <div style={card}>
          <ul style={list}>
            {data?.map(p => (
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
  marginBottom: '20px',
  textAlign: 'center' as const,
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

const center = {
  textAlign: 'center' as const,
  marginTop: '100px',
}
