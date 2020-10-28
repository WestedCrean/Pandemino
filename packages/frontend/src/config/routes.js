import { HomePage, Login, SignUp } from "pages"

const routes = [
    {
        "path": "/login",
        "component": Login,
        "needsAuth": false
    },
    {
        "path": "/signup",
        "component": SignUp,
        "needsAuth": false
    },
    {
        "path": "/",
        "component": HomePage,
        "needsAuth": true
    },
]

export default routes