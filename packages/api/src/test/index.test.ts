import request from "supertest"

import App from "../index"

describe("Test authentication", () => {
    it("should respond with 401 when no Auth token is set", async () => {
        const res = await request(App).get("/")
        expect(res.status).toBe(401)
    })
})
