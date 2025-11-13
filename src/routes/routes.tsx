import { HashRouter, Route, Routes } from "react-router-dom"
import LoginView from "../views/login_view"
import PrivateRoute from "./private_routes"
import { PATHS } from "./paths"
import HomeView from "../views/home_view"

export const MainRoute = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path={PATHS.LOGIN} element={<LoginView/>}/>
                <Route path={PATHS.HOME_PAGE}  element={<PrivateRoute children={<HomeView/>} isAuthenticated={false} allowedRoles={["admin", "user"]}/>}/>
            </Routes>
        </HashRouter>
    )

}

