import { LogOut, Save } from "lucide-react";

const ProfileActions = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-wrap gap-6 w-full">
      <button
        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
      >
        <Save size={18} />
        Guardar Alterações
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-6 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition"
      >
        <LogOut size={18} />
        Terminar Sessão
      </button>
    </div>
  );
};

export default ProfileActions;
