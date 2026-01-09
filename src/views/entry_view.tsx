import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

import { FeaturePill } from "../components/FeaturePills";

// Assets & Icons
import CuidadoIcon from "../assets/icons/medcei_ig_icon_cuidado_2cores.png";
import TechIcon from "../assets/icons/medcei_ig_icon_tech_2cores.png";
import TransporteIcon from "../assets/icons/medcei_ig_icon_transporte_2cores.png";
import BackgroundDecoration from "../utils/background_deco";
import LoginForm from "./login_form";
import RegisterForm from "./register_form";
import MedceiLogo from "../assets/medcei_logo_verde.png";


const EntryView = () => {
    const [view, setView] = useState<"LOGIN" | "REGISTER">("LOGIN");

    return (
        <div className="h-screen bg-[#F0F8F8] relative overflow-hidden flex">
            
            {/* Decoração de Fundo */}
            <BackgroundDecoration />

            {/* Conteúdo Central */}
            <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center md:justify-between px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-0 gap-4 md:gap-12 max-w-6xl mx-auto">
                
                {/* Coluna 1: Logo + Forms com animação */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 md:h-screen md:overflow-y-auto md:py-6 relative">

                    {/* Logo Fixa */}
                    <img 
                        src={MedceiLogo} 
                        alt="Logo" 
                        className="h-20 sm:h-28 md:h-40 mb-4 sm:mb-6 md:mb-8 object-contain flex-shrink-0"  
                    />

                    {/* Forms com animação */}
                    <div className="flex flex-col items-center justify-center w-full">
                        
                        {/* Container com animação */}
                        <div className="w-full relative perspective">
                            {/* Login Form */}
                            <div 
                                className={`transition-all duration-500 ease-in-out absolute inset-0 ${
                                    view === "LOGIN" 
                                        ? "opacity-100 translate-x-0" 
                                        : "opacity-0 translate-x-full pointer-events-none"
                                }`}
                            >
                                <LoginForm onSwitchToRegister={() => setView("REGISTER")} />
                            </div>

                            {/* Register Form */}
                            <div 
                                className={`transition-all duration-500 ease-in-out absolute inset-0 ${
                                    view === "REGISTER" 
                                        ? "opacity-100 translate-x-0" 
                                        : "opacity-0 -translate-x-full pointer-events-none"
                                }`}
                            >
                                <RegisterForm onSwitchToLogin={() => setView("LOGIN")} />
                            </div>

                            {/* Placeholder para manter espaço */}
                            <div className="invisible">
                                <LoginForm onSwitchToRegister={() => setView("REGISTER")} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Features (Fixa no Lado Direito) */}
                <div className="hidden md:flex flex-col space-y-6 items-start justify-center w-1/2 h-screen sticky top-0 pl-10">
                    <h3 className="text-3xl font-bold text-slate-800 mb-2 leading-tight">
                        Soluções completas para <br/><span className="text-teal-600">o seu bem-estar.</span>
                    </h3>
                    <FeaturePill icon={CuidadoIcon} text="Cuidados de saúde e fisioterapia" />
                    <FeaturePill icon={TransporteIcon} text="Entrega de refeições e medicação" />
                    <FeaturePill icon={TechIcon} text="Monitorização inteligente 24h" />
                </div>
            </div>
            <ToastContainer position="top-right" transition={Bounce} />
        </div>
    );
};

export default EntryView;