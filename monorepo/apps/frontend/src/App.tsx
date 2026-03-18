import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Ambil data dari Backend
  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3000/users')
    setUsers(res.data)
  }

  // Tambah user baru
  const addUser = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post('http://localhost:3000/users', { name, email })
    setName('')
    setEmail('')
    fetchUsers() // Refresh list
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>DAFTAR USER (BACKEND NYALA BOS!)</h1>
      
      <form onSubmit={addUser} style={{ marginBottom: '20px' }}>
        <input placeholder="Nama" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">TAMBAH</button>
      </form>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App