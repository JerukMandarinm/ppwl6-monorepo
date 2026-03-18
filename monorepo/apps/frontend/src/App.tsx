import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState<any[]>([])

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/users')
      setUsers(res.data)
    } catch (e) {
      console.error("Gagal ambil data", e)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      fontFamily: 'sans-serif' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '500px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>User List</h2>
        
        <button 
          onClick={fetchUsers}
          style={{ 
            backgroundColor: 'black', 
            color: 'white', 
            border: 'none', 
            padding: '8px 15px', 
            borderRadius: '5px', 
            cursor: 'pointer',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
          Refresh
        </button>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{u.id}</td>
                <td style={{ padding: '10px' }}>{u.name}</td>
                <td style={{ padding: '10px' }}>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App