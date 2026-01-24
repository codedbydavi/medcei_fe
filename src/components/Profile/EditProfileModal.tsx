import { Modal } from "@mui/material";
import { X, User as UserIcon, Mail } from "lucide-react";
import User from "../../models/UserModel";
import { userService } from "../../apis/User";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

interface EditProfileModalProps {
  open: boolean;
  handleClose: () => void;
  user: User;
}

const EditProfileModal = ({
  open,
  handleClose,
  user,
}: EditProfileModalProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [newEmail, setNewEmail] = useState(user.email);
  const authContext = useAuth();

  const handleSaveChanges = async () => {
    try {
      if (!validateFields()) {
        toast.error("Verifique os campos e insira um e-mail válido.");
        return;
      }

      const emailChanged = newEmail !== user.email;
      const nameChanged =
        firstName !== user.firstName || lastName !== user.lastName;

      if (!emailChanged && !nameChanged) {
        toast.info("Nenhuma alteração detectada.");
        handleClose();
        return;
      }

      if (emailChanged) {
        await verifyBeforeUpdateEmail(auth.currentUser!, newEmail).then(() => {
          toast.info(
            "Um e-mail de verificação foi enviado para o novo endereço. Por favor, verifique sua caixa de entrada.",
          );
        });

        const res = await userService.updateProfile({
          firstName,
          lastName,
          email: newEmail,
        });

        if (res?.user) {
          authContext.updateUser(res.user);
          toast.success("Perfil atualizado!");
        }
      }

      const res = await userService.updateProfile({
        firstName,
        lastName,
      });

      if (res?.user) {
        authContext.updateUser(res.user);
        toast.success("Perfil atualizado!");
      }
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        toast.error("Para mudar o e-mail, você precisa fazer login novamente.");
      } else {
        toast.error("Ocorreu um erro ao atualizar o perfil.");
      }
    } finally {
      handleClose();
    }
  };

  const validateFields = () => {
    return (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newEmail)
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all"
    >
      <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl p-8 outline-none relative animate-in slide-in-from-bottom sm:zoom-in duration-300">
        <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6 sm:hidden" />

        <button
          onClick={handleClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <header className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Editar Perfil
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Mantenha os seus dados de contacto atualizados.
          </p>
        </header>

        <form className="space-y-6">
          <div className="space-y-4">
            {/* Campo Nome */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                <UserIcon size={12} className="text-emerald-500" />
                Primeiro Nome
              </label>
              <input
                type="text"
                defaultValue={user.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-gray-700 font-medium focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
              />
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                <UserIcon size={12} className="text-emerald-500" />
                Último Nome
              </label>
              <input
                type="text"
                defaultValue={user.lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-gray-700 font-medium focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                <Mail size={12} className="text-emerald-500" />
                Endereço de E-mail
              </label>
              <input
                type="email"
                defaultValue={user.email}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 text-gray-700 font-medium focus:bg-white focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="w-full bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 active:scale-[0.98]"
            >
              Confirmar Alterações
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2 text-gray-400 text-sm font-semibold hover:text-gray-600 transition-colors"
            >
              Descartar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
