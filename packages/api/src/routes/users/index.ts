import Router from "express-promise-router"
import { Request, Response } from "express"

const router = Router()

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    res.send(`Hello from id ${id}`)
})

router.get("/", async (req: Request, res: Response) => {
    res.send("Hello at /users")
})

export default router
