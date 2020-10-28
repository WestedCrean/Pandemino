import { HomePage, Login, SignUp, ListLectures } from "pages"

const routes = [
    {
        path: "/lecture",
        component: ListLectures,
        needsAuth: true,
    },
    {
        path: "/login",
        component: Login,
        needsAuth: false,
    },
    {
        path: "/signup",
        component: SignUp,
        needsAuth: false,
    },
    {
        path: "/",
        component: HomePage,
        needsAuth: true,
    },
]

export default routes
