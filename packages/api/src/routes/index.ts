import { Express } from "express"

import users from "@routes/users"
import streams from "@routes/streams"

const mountRoutes = (app: Express) => {
    app.use("/users", users)
    app.use("/streams", streams)
}

export default mountRoutes
