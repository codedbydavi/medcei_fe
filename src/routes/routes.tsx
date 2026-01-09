import { HashRouter, Route, Routes } from "react-router-dom"
import LoginView from "../views/login_view"
import PrivateRoute from "./private_routes"
import { PATHS } from "./paths"
import HomeView from "../views/home_view"
import RegisterView from "../views/register_view"
import SimulationConfigurator from "../views/simulation_configurator"
import ProfileView from "../views/profile_view"

export const MainRoute = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path={PATHS.LOGIN} element={<ProfileView />} />
                {/* <Route path={PATHS.LOGIN} element={<LoginView />} /> */}
                <Route path={PATHS.REGISTER_PAGE} element={<RegisterView/>}/>
                <Route path={PATHS.HOME_PAGE}  element={<PrivateRoute children={<HomeView/>} isAuthenticated={false} allowedRoles={["admin", "user"]}/>}/>
                <Route
                    path={PATHS.PROFILE_PAGE}
                    element={
                        <PrivateRoute isAuthenticated={true} allowedRoles={["admin", "user"]}>
                        <ProfileView />
                        </PrivateRoute>
                    }
                    />
            </Routes>
        </HashRouter>
    )

}
