import PG from "pg";

const { Pool } = PG;
const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'user123',
    password: 'password123',
    database: 'mydb123'
})

export default pool;