import { text } from "body-parser"
import { Pool, PoolConfig, Submittable, QueryResult } from "pg"

const pool = new Pool()

module.exports = {
    query: (text: string, params: Submittable) => pool.query(text, params),
}
