import logger from "winston"

class LoggerStream {
    write(message: string) {
        logger.info(message.substring(0, message.lastIndexOf("\n")))
    }
}

export { LoggerStream }
