import "reflect-metadata"
import { Action } from "routing-controllers"
import firebase from "./firebaseApp"
import logger from "winston"

function getAuthToken(req: any) {
    
    let authToken: string
    
    if (req.headers == undefined) {
        return ""
    }

    if (req.headers["authorization"] && req.headers["authorization"].split(" ")[0] === "Bearer") {
        authToken = req.headers["authorization"].split(" ")[1]
    } else {
        authToken = ""
    }
    return authToken
}

export async function AuthenticationMiddleware(action: Action, roles: string[]): Promise<any> {
    const authToken = getAuthToken(action.request)
    logger.info("Auth token: " + authToken)
    try {
        await firebase.auth().verifyIdToken(authToken)
    } catch (e) {
        logger.info("Authorized: false")
        return false
    }
    logger.info("Authorized: true")
    return true
}
