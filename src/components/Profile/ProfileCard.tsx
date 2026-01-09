import { Mail } from "lucide-react";
import UserModel from "../../models/user_model";

interface ProfileCardProps {
  user: UserModel;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4">
      
      <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl font-semibold">
        {user.firstName[0]}
        {user.lastName[0]}
      </div>

      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-sm text-gray-500">Médico saúde pública</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Mail size={16} />
        {user.email}
      </div>

      <button className="mt-2 w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition">
        Editar Perfil
      </button>
    </div>
  );
};

export default ProfileCard;
