import { HomePage, Login, SignUp, ListLectures, Lecture } from "pages"
import QuizPage from "../pages/QuizPage"
import ListCourses from "../pages/ListCourses";
import UserPanel from "../pages/UserPanel"
import QuizFinished from "../pages/QuizFinished"
import QuizAdminPanel from "../pages/QuizAdminPanel"

const routes = [
    {
        path: "/lecture/:id",
        component: Lecture,
        needsAuth: true,
    },
    {
        path: "/course/:id",
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
    {
        path: "/userPanel",
        component: UserPanel,
        needsAuth: true,
    },
    {

        path: "/quiz/:id",
        component: QuizPage,
        needsAuth: true,
    },
    {
        path: "/quizFinished/:id",
        component: QuizFinished,
        needAuth: true
    },

    {
        path: "/quizAdminPanel/:id",
        component: QuizAdminPanel,
        needAuth: true
    }

]

export default routes
