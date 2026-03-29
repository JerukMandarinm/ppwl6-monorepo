import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [courses, setCourses] = useState<any[]>([
  { id: "1", name: "Praktikum PWL 2026", section: "Kelas B" }
])

  // GANTI INI DENGAN CLIENT ID KAMU
  const CLIENT_ID = "297425169327-b7p40fdhpmsmvheb9rrmhk1om51a1h73.apps.googleusercontent.com"; 
  const REDIRECT_URI = "http://localhost:5173";
  const SCOPE = "https://www.googleapis.com/auth/classroom.courses.readonly";

  const handleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    window.location.href = authUrl;
  };

  const fetchCourses = async () => {
    try {
      // Mengambil data dari backend (Turso)
      const res = await axios.get('http://localhost:3000/courses')
      setCourses(res.data)
    } catch (e) {
      console.error("Gagal ambil data", e)
    }
  }

  useEffect(() => { fetchCourses() }, [])

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '600px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Web List Class (Google Classroom)</h2>
        
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button onClick={handleLogin} style={{ backgroundColor: '#4285F4', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Login with Google
          </button>
          
          <button onClick={fetchCourses} style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Refresh Class
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>Course Name</th>
              <th style={{ padding: '10px' }}>Section</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? courses.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{c.id}</td>
                <td style={{ padding: '10px' }}>{c.name}</td>
                <td style={{ padding: '10px' }}>{c.section || '-'}</td>
              </tr>
            )) : (
              <tr><td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No classes found. Click Refresh or Add data in Turso.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App