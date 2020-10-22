import { HttpError } from "routing-controllers"

class StreamNotFoundError extends HttpError {
    constructor() {
        super(404, "Stream not found")
    }
}

class StreamCreationError extends HttpError {
    constructor(msg: string) {
        super(400, "Cannot create stream. " + msg)
    }
}

export { StreamNotFoundError, StreamCreationError }
