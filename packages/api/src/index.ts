import "module-alias/register"
import "source-map-support/register"

import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import bodyParser from "body-parser"

import "reflect-metadata"
import mountRoutes from "@routes/index"

//import mountRoutes from "@routes/index"

dotenv.config()

/**
 * App Variabless
 */

if (!process.env.API_PORT) {
    console.log("No port specified in .env API_PORT variable. Using default value.")
}

const PORT: number = process.env.API_PORT ? parseInt(process.env.API_PORT as string, 10) : 3000

const app = express()

/**
 *  App Configuration
 */

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

mountRoutes(app)

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
