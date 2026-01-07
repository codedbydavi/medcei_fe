import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FeaturePill } from "../components/FeaturePills";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Assets
import CuidadoIcon from "../assets/icons/medcei_ig_icon_cuidado_2cores.png";
import TechIcon from "../assets/icons/medcei_ig_icon_tech_2cores.png";
import TransporteIcon from "../assets/icons/medcei_ig_icon_transporte_2cores.png";
import MedceiLogo from "../assets/medcei_logo_verde.png";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { ArrowBack } from "@mui/icons-material";
import { Register } from "../apis/auth";
import User from '../models/user_model';

const RegisterView = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isFilled = (value: string) => value.length > 2;

    const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;

    setLoading(true);
    try {
        // Cria no Firebase
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseToken = await userCredentials.user.getIdToken();

        const newUser = new User(firstName, lastName, email);

        // Envia dados para o backend
        await Register(firebaseToken, newUser);

        toast.success("Conta criada com sucesso!");
        
        setTimeout(() => navigate(PATHS.LOGIN), 2000); 

    } catch (error: any) {
        let message = "Erro ao registar.";
        if (error.code === 'auth/email-already-in-use') message = "Este email já está em uso.";
        if (error.code === 'auth/weak-password') message = "A password é muito fraca.";
        
        toast.error(message);
        console.error(error);
    } finally {
        setLoading(false);
    }
};

    return (
        // Mudança: Adicionamos h-screen e overflow-hidden no container pai
        <div className="min-h-screen bg-[#F0F8F8] relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            {/* Decoração de Fundo */}
            <div className="absolute -top-20 -right-20 w-64 h-64 md:w-[400px] md:h-[400px] bg-teal-100/40 rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 md:w-[300px] md:h-[300px] bg-amber-100/40 rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Coluna 1: Formulário */}
                <div className="flex flex-col items-center justify-center w-full">
                    <img 
                        src={MedceiLogo} 
                        alt="Logo" 
                        className="h-28 md:h-40 mb-6 md:mb-8 object-contain"  
                    />

                    <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-[500px]">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-bold text-slate-800">Criar Conta</h2>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Gerir os seus cuidados</p>
                        </div>

                        <form className="space-y-3" onSubmit={handleRegister}>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-0.5">
                                    <label className="text-[11px] font-bold text-slate-700 ml-1">Primeiro Nome</label>
                                    <div className="relative">
                                        <input 
                                            type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:border-teal-500 outline-none text-xs"
                                            placeholder="Nome"
                                        />
                                        {isFilled(firstName) && <CheckCircle2 className="absolute right-2 top-2 w-4 h-4 text-teal-500" />}
                                    </div>
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-[11px] font-bold text-slate-700 ml-1">Último Nome</label>
                                    <div className="relative">
                                        <input 
                                            type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                            className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:border-teal-500 outline-none text-xs"
                                            placeholder="Sobrenome"
                                        />
                                        {isFilled(lastName) && <CheckCircle2 className="absolute right-2 top-2 w-4 h-4 text-teal-500" />}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-[11px] font-bold text-slate-700 ml-1">Email</label>
                                <div className="relative">
                                    <input 
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:border-teal-500 outline-none text-xs"
                                        placeholder="exemplo@medcei.com"
                                    />
                                    {isFilled(email) && <CheckCircle2 className="absolute right-2 top-2 w-4 h-4 text-teal-500" />}
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-[11px] font-bold text-slate-700 ml-1">Palavra-Passe</label>
                                <div className="relative">
                                    <input 
                                        type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:border-teal-500 outline-none text-xs"
                                        placeholder="••••••••"
                                    />
                                    {isFilled(password) && <CheckCircle2 className="absolute right-2 top-2 w-4 h-4 text-teal-500" />}
                                </div>
                            </div>

                            <div className="flex items-start gap-2 py-1">
                                <input 
                                    type="checkbox" id="terms" checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="mt-0.5 w-3.5 h-3.5 accent-teal-500 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-[10px] text-slate-500 leading-tight cursor-pointer">
                                    Aceito os <span className="text-teal-600 font-bold">Termos</span> e a <span className="text-teal-600 font-bold">Privacidade</span>
                                </label>
                            </div>

                            {/* O botão agora é fixo para não "empurrar" o card. 
                                Se não estiver aceito, mostramos um botão desativado ou reduzimos a margem */}
                            <button 
                                type="submit"
                                disabled={!acceptedTerms || loading}
                                className={`w-full font-bold py-2.5 rounded-xl shadow-lg transition-all transform active:scale-95 text-sm
                                    ${acceptedTerms ? 'bg-[#5FB08C] text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'}`}
                            >
                                {loading ? "A processar..." : "Registar"}
                            </button>
                        </form>

                        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                            <button 
                                type="button"
                                onClick={() => navigate(PATHS.LOGIN)} 
                                className="flex items-center justify-center gap-1 w-full text-teal-600 font-bold hover:underline text-[11px]"
                            >
                                <ArrowBack className="!w-3 !h-3"/> Voltar para o Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coluna 2: Features (Lado Direito) */}
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


export default RegisterView;