import { Request, Response } from "express"
import firebase from "./firebaseApp"

function getAuthToken(req: Request) {
    let authToken: string
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        authToken = req.headers.authorization.split(" ")[1]
    } else {
        authToken = ""
    }
    return authToken
}

export async function AuthenticationMiddleware(req: Request, res: Response, next?: (err?: any) => any): Promise<any> {
    const authToken = getAuthToken(req)
    try {
        await firebase.auth().verifyIdToken(authToken)
    } catch (e) {
        res.status(401).send({ error: "Unauthorized" })
    }
    next()
}
