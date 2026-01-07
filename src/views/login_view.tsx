import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Mail, Lock } from "lucide-react";

import RegisterView from "./register_view";
import { PATHS } from "../routes/paths";
import { FeaturePill } from "../components/FeaturePills";

// Assets & Icons
import MedceiLogo from "../assets/medcei_logo_verde.png";
import CuidadoIcon from "../assets/icons/medcei_ig_icon_cuidado_2cores.png";
import TechIcon from "../assets/icons/medcei_ig_icon_tech_2cores.png";
import TransporteIcon from "../assets/icons/medcei_ig_icon_transporte_2cores.png";
import { Login } from "../apis/auth";


const LoginView = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warn("Preencha todos os campos.");
            return;
        }
        setLoading(true);
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const firebaseToken = await userCredentials.user.getIdToken();

            await Login(firebaseToken);

            navigate(PATHS.HOME_PAGE);
        } catch (error) {
            toast.error("Email ou password incorretos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F8F8] relative flex items-center justify-center p-4 sm:p-6 overflow-x-hidden">
            
            {/* Decoração de Fundo */}
            <div className="absolute -top-20 -right-20 w-64 h-64 md:w-[500px] md:h-[500px] bg-teal-100/60 rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 md:w-[400px] md:h-[400px] bg-amber-100/60 rounded-full pointer-events-none" />

            {/* Conteúdo Central */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Coluna 1: Login */}
                <div className="flex flex-col items-center justify-center w-full">
                    <img 
                        src={MedceiLogo} 
                        alt="Medcei Logo" 
                        className="h-28 md:h-40 mb-6 md:mb-8 object-contain" 
                    />

                    <div className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-xl w-full max-w-[500px]">
                        <div className="flex flex-col items-center mb-6 md:mb-8 text-center">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800">Login</h2>
                            <p className="text-xs md:text-sm text-slate-400 mt-1">Introduza as suas credenciais para aceder</p>
                        </div>

                        <form className="space-y-4 md:space-y-5" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="exemplo@medcei.com"
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-600 bg-white text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider">Palavra-Passe</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-600 bg-white text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#5FB08C] hover:bg-[#4a9675] text-white font-bold py-3 md:py-4 rounded-xl shadow-lg shadow-teal-900/10 transition-all transform active:scale-[0.98] disabled:opacity-50 mt-2"
                            >
                                {loading ? "A processar..." : "Entrar"}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <p className="text-xs md:text-sm text-slate-400">
                                Ainda não tem conta?{" "}
                                <button 
                                    type="button"
                                    onClick={() => navigate(PATHS.REGISTER_PAGE)} 
                                    className="text-teal-500 font-bold hover:underline"
                                >
                                    Registe-se
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Features (Escondida em Telemóveis) */}
                <div className="hidden md:flex flex-col space-y-6 items-start justify-center pl-10">
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

export default LoginView;