import { HashRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomeView from "../views/HomeView";
import SimulationConfigurator from "../views/SimulationConfigurator";
import EntryView from "../views/EntryView";
import SimulationHistoryView from "../views/SimulationHistory";
import ProfileView from "../views/ProfileView";
import AdminDashboard from "../views/AdminDashboard";
import AppLayout from "./AppLayout";
import { AuthProvider } from "../context/AuthContext";
import AuthGate from "./AuthGate";
import SimulationManager from "../views/SimulationManager";
import ManageUsers from "../views/ManageUsers";
import { PATHS } from "./Paths";

export const MainRoute = () => {
  return (
    <AuthGate>
      <HashRouter>
        <Routes>
          <Route path={PATHS.LOGIN} element={<EntryView />} />
          <Route path={PATHS.REGISTER_PAGE} element={<EntryView />} />

          <Route element={<AppLayout />}>
            <Route
              path={PATHS.HOME_PAGE}
              element={
                <PrivateRoute allowedRoles={["admin", "user"]}>
                  <HomeView />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.SIMULATION_MANAGER}
              element={
                <PrivateRoute allowedRoles={["admin", "user"]}>
                  <SimulationManager />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.SIMULATION_HISTORY}
              element={
                <PrivateRoute allowedRoles={["admin", "user"]}>
                  <SimulationHistoryView />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.PROFILE_PAGE}
              element={
                <PrivateRoute allowedRoles={["admin", "user"]}>
                  <ProfileView />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.DAHSBOARD}
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path={PATHS.MANAGE_USERS}
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <ManageUsers />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </AuthGate>
  );
};
