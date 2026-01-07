import { HashRouter, Route, Routes } from "react-router-dom"
import LoginView from "../views/login_view"
import PrivateRoute from "./private_routes"
import { PATHS } from "./paths"
import HomeView from "../views/home_view"
import RegisterView from "../views/register_view"
import SimulationConfigurator from "../views/simulation_configurator"

export const MainRoute = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path={PATHS.LOGIN} element={<SimulationConfigurator/>}/>
                <Route path={PATHS.REGISTER_PAGE} element={<RegisterView/>}/>
                <Route path={PATHS.HOME_PAGE}  element={<PrivateRoute children={<HomeView/>} isAuthenticated={false} allowedRoles={["admin", "user"]}/>}/>
            </Routes>
        </HashRouter>
    )

}

