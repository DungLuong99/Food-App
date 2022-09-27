
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Create from "~/pages/Create";
import CreateContainer from "~/components/Layout/CreateContainer";
import ModifyContainer from "~/components/Layout/ModifyContainer";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu, layout: Menu },
    { path: '/create', component: CreateContainer, layout: CreateContainer },
    { path: '/modify', component: ModifyContainer, layout: ModifyContainer },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }