import { Elysia, t } from "elysia";
import { Database } from "bun:sqlite";
import { cors } from "@elysiajs/cors";

// 1. Inisialisasi Database (Otomatis bikin file kalau belum ada)
const db = new Database("mydb.sqlite", { create: true });

// 2. Buat Tabel User Manual (Gak perlu Prisma-prismaan!)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE
  )
`);

const app = new Elysia()
  .use(cors())
  .get("/", () => "AKHIRNYA JALAN BOS!!")
  
  // Ambil semua user
  .get("/users", () => {
    return db.query("SELECT * FROM users").all();
  })
  
  // Tambah user baru (buat ngetes)
  .post("/users", ({ body }) => {
    const { name, email } = body as { name: string, email: string };
    try {
      db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);
      return { success: true, message: "User ditambah!" };
    } catch (e) {
      return { success: false, message: "Email sudah ada!" };
    }
  })
  .listen(3000);

console.log(`✅ DATABASE & SERVER NYALA DI http://localhost:3000`);