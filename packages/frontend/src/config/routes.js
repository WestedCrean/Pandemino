import { HomePage, Login, SignUp, ListLectures} from "pages"
import ListCourses from "../pages/ListCourses";

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
    {
        path: "/listCourses",
        component: ListCourses,
        needsAuth: true,
    },
]

export default routes
