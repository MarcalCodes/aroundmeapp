// Comes from:
// - https://github.com/porsager/postgres?tab=readme-ov-file#usage

import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL)

export default sql