import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

import { ArrowBack } from "@mui/icons-material";
import { authService } from "../apis/auth";
import User from '../models/UserModel';


interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const isFilled = (value: string) => value.length > 2;

    const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;

    setLoading(true);
    try {
        const newUser = { firstName, lastName, email, password };
        await authService.register(newUser);
        toast.success("Conta criada com sucesso!");
        
        setTimeout(() => onSwitchToLogin(), 2000); 

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
        <>
            <div className="bg-white p-4 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-2xl w-full max-w-[500px] flex-shrink-0">
                <div className="text-center mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Criar Conta</h2>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Introduza os seus dados</p>
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
                        onClick={onSwitchToLogin}
                        className="flex items-center justify-center gap-1 w-full text-teal-600 font-bold hover:underline text-[11px]"
                    >
                        <ArrowBack className="!w-3 !h-3"/> Voltar para o Login
                    </button>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;