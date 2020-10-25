import "source-map-support/register"
import "reflect-metadata"

import * as dotenv from "dotenv"
import express from "express"
import { useExpressServer } from "routing-controllers"
import helmet from "helmet"
import morgan from "morgan"

import { createConnection } from "typeorm"

import { LoggerStream } from "./middleware/logging"
import { AuthenticationMiddleware } from "./middleware/authentication"

import Controllers from "./controllers/index"

import logger from "./logger"

dotenv.config()

/**
 * App Variabless
 */

if (!process.env.API_PORT) {
    logger.info("No port specified in .env API_PORT variable. Using default value.")
}

const PORT: number = process.env.API_PORT ? parseInt(process.env.API_PORT as string, 10) : 3000

let app = express()

/**
 *  App Configuration
 */

useExpressServer(app, {
    cors: true,
    routePrefix: "/api",
    controllers: [...Controllers],
    middlewares: [morgan("tiny"), helmet()],
    authorizationChecker: AuthenticationMiddleware,
})

//app.use(AuthenticationMiddleware)

/**
 * Server Activation
 *
 *  - connect to database using settings defined in ormconfig.json
 */

createConnection()
    .then(() => logger.info("Connected to database"))
    .catch((e) => logger.error(`Could not connect to database: ${e.message}`))

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`)
})

export default app
