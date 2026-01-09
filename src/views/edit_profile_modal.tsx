import { Modal, Box } from "@mui/material";
import { X } from "lucide-react";
import User from "../models/user_model";

interface EditProfileModalProps {
  open: boolean;
  handleClose: () => void;
  user: User;
}

const EditProfileModal = ({ open, handleClose, user }: EditProfileModalProps) => {

    const handleSaveChanges = () => {
      // Lógica para salvar as alterações do perfil
      // Pode incluir validação e chamadas à API
      console.log("Alterações salvas");
      handleClose();
    }

    
  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      className="flex items-center justify-center p-4"
    >
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-8 outline-none relative">
        {/* Botão de fechar opcional no canto */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Informações de Conta
        </h2>

        <form className="space-y-5">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Nome Completo
              </label>
              <input 
                type="text" 
                defaultValue={`${user.firstName} ${user.lastName}`}
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Email
              </label>
              <input 
                type="email" 
                defaultValue={user.email}
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Especialização
              </label>
              <input 
                type="text" 
                defaultValue="Saúde Pública"
                className="w-full bg-gray-50 border-none rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <button 
              type="button"
              onClick={handleClose}
              className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-100"
            >
              Salvar Alterações
            </button>
            
            <button 
              type="button"
              onClick={handleClose}
              className="w-full bg-transparent text-gray-400 font-medium py-2 hover:text-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;