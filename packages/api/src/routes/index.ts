import Router from "express-promise-router"
import { Express } from "express"

import users from "./users"
import streams from "./streams"

const mountRoutes = (app: Express) => {
    app.use("/users", users)
    app.use("/streams", streams)
}

export default mountRoutes
