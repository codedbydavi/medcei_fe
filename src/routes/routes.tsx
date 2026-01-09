import { HashRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./private_routes"
import { PATHS } from "./paths"
import HomeView from "../views/home_view"
import SimulationConfigurator from "../views/simulation_configurator"
import EntryView from "../views/entry_view"
import { isUserAuthenticated } from "../hooks/user_hook"

export const MainRoute = () => {

    const isAuthenticated = isUserAuthenticated();

    return (
        <HashRouter>
            <Routes>
                <Route path={PATHS.LOGIN} element={<EntryView/>}/>
                <Route path={PATHS.REGISTER_PAGE} element={<EntryView/>}/>
                <Route path={PATHS.HOME_PAGE}  element={<PrivateRoute children={<HomeView/>} isAuthenticated={isAuthenticated} allowedRoles={["admin", "user"]}/>}/>
            </Routes>
        </HashRouter>
    )

}
