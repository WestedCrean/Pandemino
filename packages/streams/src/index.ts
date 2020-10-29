import "reflect-metadata";
import "source-map-support/register"
import { Rakkit, MetadataStorage } from "rakkit"
import BodyParser from "koa-bodyparser"
import { Serve } from "static-koa-router"

import * as dotenv from "dotenv"
import logger from "winston"

dotenv.config()

/**
 * App Variabless
 */

if (!process.env.API_PORT) {
    logger.info(
        "No port specified in .env API_PORT variable. Using default value."
    )
}
if (!process.env.REDIS_HOST) {
    logger.info(
        "No redis host specified in .env REDIS_HOST variable. Using default value."
    )
}
if (!process.env.REDIS_PORT) {
    logger.info(
        "No redis port specified in .env REDIS_PORT variable. Using default value."
    )
}

const PORT: number = process.env.API_PORT
    ? parseInt(process.env.API_PORT as string, 10)
    : 5001
const REDIS_HOST: string = process.env.REDIS_HOST || "localhost"
const REDIS_PORT: number = process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT as string, 10)
    : 6379

/**
 *  App Configuration
 */

export class App {
    private _websockets = [`${__dirname}/websockets/*`]
    private _routers = [`${__dirname}/routes/*`]

    async start() {
        await Rakkit.start({
            ws: {
                websockets: this._websockets,
            },
            rest: {
                routers: this._routers,
                globalRestMiddlewares: [BodyParser()],
            },
        })
    }
}

const app = new App()
app.start()
