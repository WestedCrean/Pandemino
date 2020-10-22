import { createLogger, format, transports } from "winston"

const { label, combine, timestamp, prettyPrint } = format

const LOG_PATH: string = process.env.LOG_PATH || "./"

const logger = createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new transports.File({ filename: LOG_PATH + "error.log", level: "error" }),
        new transports.File({ filename: LOG_PATH + "info.log", level: "info" }),
    ],
    exitOnError: false,
})

export class LoggerStream {
    write(message: string) {
        logger.info(message.substring(0, message.lastIndexOf("\n")))
    }
}

export default logger
