import "source-map-support/register"

import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import logger from "./logger"
import redis from "redis"
import * as path from "path"

import cors from "cors"
import bodyParser from "body-parser"

dotenv.config()

/**
 * App Variabless
 */

if (!process.env.API_PORT) {
    logger.info("No port specified in .env API_PORT variable. Using default value.")
}
if (!process.env.REDIS_HOST) {
    logger.info("No redis host specified in .env REDIS_HOST variable. Using default value.")
}
if (!process.env.REDIS_PORT) {
    logger.info("No redis port specified in .env REDIS_PORT variable. Using default value.")
}

const PORT: number = process.env.API_PORT ? parseInt(process.env.API_PORT as string, 10) : 5001
const REDIS_HOST: string = process.env.REDIS_HOST || "localhost"
const REDIS_PORT: number = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT as string, 10) : 6379

/**
 *  App Configuration
 */

let app = express()
app.set("port", PORT)

const client = redis.createClient(`redis://${REDIS_HOST}:${REDIS_PORT}`)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

export default app
