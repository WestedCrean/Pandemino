import { HttpError } from "routing-controllers"

class DatabaseError extends HttpError {
    constructor(msg: string) {
        super(400, "Database error. " + msg)
    }
}

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

class UserNotFoundError extends HttpError {
    constructor() {
        super(404, "User not found")
    }
}

class UserCreationError extends HttpError {
    constructor(msg: string) {
        super(400, "Cannot create user. " + msg)
    }
}

export { DatabaseError, UserNotFoundError, UserCreationError, StreamNotFoundError, StreamCreationError }
