import { text } from "body-parser"
import { Pool, PoolConfig, Submittable, QueryResult } from "pg"

const pool = new Pool()

module.exports = {
    query: (text: string) => pool.query(text),
}
