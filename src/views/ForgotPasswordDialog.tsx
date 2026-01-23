import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

interface ForgotPasswordProps {
    open?: boolean;
    onClose?: () => void;
}

const ForgotPasswordDialog = ({ open, onClose }: ForgotPasswordProps) => {
    const [email, setEmail] = useState("");
    
    const handleForgotPassword = async () => {
        try {
            //await sendPasswordResetEmail(auth, email);
            alert("Email de redefinição de password enviado!\n" + email);
            if (onClose) onClose();
        } catch (error) {
            console.error("Erro ao enviar email de redefinição de password:", error);
            alert("Erro ao enviar email de redefinição de password. Verifique o email introduzido.");
        }
    }
    return (
        open ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-96">
                    <h2 className="text-xl font-bold mb-4">Recuperar Palavra-Passe</h2>
                    <p className="mb-4">Insira o seu endereço de email para receber instruções de recuperação de password.</p>
                    <input
                        type="email"
                        placeholder="exemplo@gmail.com"
                        className="w-full border border-slate-300 rounded-lg p-2 mb-4 focus:outline-none focus:border-teal-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">    
                        <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors" onClick={() => handleForgotPassword()}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default ForgotPasswordDialog;