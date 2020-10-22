import "module-alias/register"
import "source-map-support/register"
import "reflect-metadata"

import * as dotenv from "dotenv"
import express from "express"
import { useExpressServer } from "routing-controllers"
import cors from "cors"
import helmet from "helmet"
import bodyParser from "body-parser"
import morgan from "morgan"

import { LoggerStream } from "@middleware/logging"
import { AuthenticationMiddleware } from "@middleware/authentication"

import Controllers from "@controllers/index"

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
app.use(morgan("combined", { stream: new LoggerStream() }))
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
useExpressServer(app, {
    cors: true,
    controllers: [...Controllers],
})
app.use(AuthenticationMiddleware)

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

export default app
