import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

import { PATHS } from "../routes/paths";
import { Login } from "../apis/auth";
import ForgotPasswordDialog from "./forgot_password_dialog";
import GoogleIcon from "../assets/icons/google.jpeg";
import MicrosoftIcon from "../assets/icons/microsoft.jpeg";

interface LoginFormProps {
    onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warn("Preencha todos os campos.");
            return;
        }
        setLoading(true);
        try {
            await Login({ email, password });
            toast.success("Login efetuado com sucesso!");

            navigate(PATHS.HOME_PAGE);
        } catch (error) {
            toast.error("Email ou password incorretos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[2rem] shadow-xl w-full max-w-[500px] flex-shrink-0">
                <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8 text-center">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Aceder</h2>
                    <p className="text-xs text-slate-400 mt-0.5 sm:mt-1 uppercase">Introduza as suas credenciais para aceder</p>
                </div>

                <form className="space-y-3 sm:space-y-4 md:space-y-5" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-0.5 sm:mb-1 ml-1 uppercase tracking-wider">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 sm:w-5 h-4 sm:h-5 group-focus-within:text-teal-500 transition-colors" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemplo@medcei.com"
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-600 bg-white text-xs sm:text-sm md:text-base"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-0.5 sm:mb-1 ml-1 uppercase tracking-wider">Palavra-Passe</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 sm:w-5 h-4 sm:h-5 group-focus-within:text-teal-500 transition-colors" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-600 bg-white text-xs sm:text-sm md:text-base"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs px-0.5 sm:px-1">
                        <label className="flex items-center space-x-2 cursor-pointer select-none">
                            <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500 accent-teal-500" />
                            <span className="text-slate-500 font-medium text-xs">Lembrar-me</span>
                        </label>
                        <button
                            type="button"
                            className="text-teal-500 font-bold hover:underline text-xs"
                            onClick={() => setOpen(true)}
                        >
                            Esqueceu-se da password?
                        </button>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#5FB08C] hover:bg-[#4a9675] text-white font-bold py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl shadow-lg shadow-teal-900/10 transition-all transform active:scale-[0.98] disabled:opacity-50 mt-1 sm:mt-2 text-xs sm:text-sm"
                    >
                        {loading ? "A processar..." : "Entrar"}
                    </button>
                </form>

                <div className="relative my-4 sm:my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 sm:px-4 bg-white text-xs text-slate-400 uppercase tracking-wider">Ou continue com</span>
                    </div>
                </div>

                <div className="flex gap-2 sm:gap-3">
                    <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 border border-slate-200 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors bg-white shadow-sm">
                        <img src={GoogleIcon} alt="Google Logo" className="w-4 h-4 sm:w-5 sm:h-5"/>
                        <span className="font-bold text-slate-600 text-xs hidden sm:inline">Google</span>                      
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 border border-slate-200 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors bg-white shadow-sm">
                        <img src={MicrosoftIcon} alt="Microsoft Logo" className="w-4 h-4 sm:w-5 sm:h-5"/>
                        <span className="font-bold text-slate-600 text-xs hidden sm:inline">Microsoft</span>
                    </button>
                </div>

                <div className="text-center mt-4 sm:mt-6">
                    <p className="text-xs text-slate-400">
                        Ainda não tem conta?{" "}
                        <button 
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-teal-500 font-bold hover:underline"
                        >
                            Registe-se
                        </button>
                    </p>
                </div>
            </div>

            <ForgotPasswordDialog open={open} onClose={handleClose} />
        </>
    );
};

export default LoginForm;