import { Mail } from "lucide-react";
import UserModel from "../../models/UserModel";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useRoleFormatter } from "../../utils/UseRoleFormatter";


interface ProfileCardProps {
  user: UserModel;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const [open, setOpen] = useState(false);
  const { formattedRole } = useRoleFormatter();

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
      {/* Avatar mais polido */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-100 mb-4 border-4 border-white">
        {user?.firstName?.[0]}{user?.lastName?.[0]}
      </div>

      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800 leading-tight">
          {user.fullName}
        </h1>
        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full mt-1">
          {formattedRole()}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-slate-50 px-4 py-2 rounded-full">
        <Mail size={14} className="text-emerald-500" />
        <span className="truncate max-w-[200px]">{user.email}</span>
      </div>

      <button 
        className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
        onClick={handleOpen}
      >
        Editar Perfil
      </button>
      <EditProfileModal open={open} handleClose={handleClose} user={user} />
    </div>
  );
};

export default ProfileCard;
