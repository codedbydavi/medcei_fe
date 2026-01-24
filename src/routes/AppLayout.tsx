import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import CookieBanner from "../components/CookieBanner";

const AppLayout = () => {
  return (
    <main className="h-screen bg-[#EAF4F1] relative flex flex-col">
     <NavBar/>
      <div className="flex-1 overflow-y-auto md:overflow-hidden">
        <div className="content min-h-full">
          <Outlet />
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CookieBanner />
    </main>   
  );
};

export default AppLayout;