
import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "~/pages/Create";
import CreateContainer from "~/components/Layout/CreateContainer";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/market', component: Market },
    { path: '/create', component: Create, layout: CreateContainer },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }