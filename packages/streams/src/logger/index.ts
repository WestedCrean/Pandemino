import winston, { createLogger, format, transports } from "winston"

const { align, colorize, combine, timestamp, printf } = format

const LOG_PATH: string = process.env.LOG_PATH || "./logs/"

const config = {
    format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        align(),
        printf((log) => `${log.timestamp} ${log.level}: ${log.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: LOG_PATH + "error.log", level: "error" }),
        new transports.File({ filename: LOG_PATH + "info.log", level: "info" }),
    ],
    exitOnError: false,
}
const logger = createLogger(config)

// default logger

winston.add(logger)

export default logger
