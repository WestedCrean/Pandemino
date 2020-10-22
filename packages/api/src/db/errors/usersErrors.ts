import { HttpError } from "routing-controllers"

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

export { UserNotFoundError, UserCreationError }
