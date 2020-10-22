import "reflect-metadata"
import { Action } from "routing-controllers"
import firebase from "./firebaseApp"
import logger from "winston"

function getAuthToken(req: Request) {
    let authToken: string
    logger.info(req.headers)
    if (req.headers.get("authorization") && req.headers.get("authorization").split(" ")[0] === "Bearer") {
        authToken = req.headers.get("authorization").split(" ")[1]
    } else {
        authToken = ""
    }
    return authToken
}

export async function AuthenticationMiddleware(action: Action, roles: string[]): Promise<any> {
    const authToken = getAuthToken(action.request)
    try {
        await firebase.auth().verifyIdToken(authToken)
    } catch (e) {
        return false
    }
    return true
}
