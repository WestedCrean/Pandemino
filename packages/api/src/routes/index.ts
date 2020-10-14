import Router from "express-promise-router"
import { Express } from "express"

import * as users from "./users"
import * as streams from "./streams"

module.exports = (app : Express) => {
    app.use("/users", users: Router)
    app.use("/streams", streams: Router)
}
