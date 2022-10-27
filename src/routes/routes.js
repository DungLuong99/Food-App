
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import CreateContainer from "~/components/Layout/CreateContainer";
import ModifyContainer from "~/components/Layout/ModifyContainer";
import About_us from "~/pages/About_us";
import Service from "~/pages/Service";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu, layout: Menu },
    { path: '/create', component: CreateContainer, layout: CreateContainer },
    { path: '/modify', component: ModifyContainer, layout: ModifyContainer },
    { path: '/about_us', component: About_us, layout: About_us },
    { path: '/service', component: Service, layout: Service },

]

const privateRoutes = []

export { publicRoutes, privateRoutes }