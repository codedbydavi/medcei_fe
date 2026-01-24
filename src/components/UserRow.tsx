import React from "react";
import User from "../models/UserModel";
import ToggleSwitch from "./ToggleSwitch";
import { Mail, Shield, User as UserIcon } from "lucide-react";

interface UserRowProps {
  user: User;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onChangeRole: (id: string, role: string) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onToggleStatus, onChangeRole }) => {
  const isActive = user.status === "active";

  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.fullName) {
      return user.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    }
    return "??";
  };

  return (
    <tr className="group hover:bg-slate-50 transition-colors border-b border-gray-50">
      {/* COLUNA: UTILIZADOR (Avatar + Nome) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm border-2 border-white shadow-sm">
            {getInitials()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-gray-800">
              {user.firstName ? `${user.firstName} ${user.lastName}` : (user.fullName || "Utilizador Sem Nome")}
            </div>
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">
              ID: {user.id?.toString().slice(0, 8) || "---"}
            </div>
          </div>
        </div>
      </td>

      {/* COLUNA: CONTACTO (Email) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-600">
          <div className="p-1.5 bg-gray-50 rounded-md mr-3 text-gray-400 group-hover:bg-white group-hover:text-teal-500 transition-colors">
            <Mail size={14} />
          </div>
          {user.email || "Sem email"}
        </div>
      </td>

      {/* COLUNA: ESTADO (Toggle) */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex justify-center">
          <ToggleSwitch
            enabled={isActive}
            onToggle={() => onToggleStatus(user.id, !isActive)}
          />
        </div>
      </td>

      {/* COLUNA: CARGO (Select) */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          {user.role === 'admin' && <Shield size={14} className="text-purple-500" />}
          <select
            value={user.role}
            onChange={(e) => onChangeRole(user.id, e.target.value)}
            className={`
              text-xs font-bold py-1.5 px-3 rounded-lg border outline-none transition-all cursor-pointer
              ${user.role === 'admin' 
                ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' 
                : 'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100'}
              focus:ring-2 focus:ring-opacity-50 focus:ring-teal-400
            `}
          >
            <option value="user">Utilizador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;