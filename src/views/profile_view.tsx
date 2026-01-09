import { NavBar } from "../components/NavBar";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileSection from "../components/Profile/ProfileSection";
import { getCurrentUser } from "../hooks/current_user_hook";
import { LogOut } from "lucide-react";
import { useState } from "react";

const ProfileView = () => {
  const user = getCurrentUser() ?? {
    firstName: "Diogo",
    lastName: "Silva",
    email: "diogo@medcei.com",
  };

  const handleLogout = () => {
    // Lógica de logout aqui
    console.log("Logout efetuado");
  };

  return (
    <div className="min-h-screen bg-[#EAF4F1]">
      <NavBar />

      <div className="max-w-[1600px] mx-auto px-10 py-10">
        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-10">
            {/* Coluna esquerda */}
            <div className="flex flex-col gap-8">
              <ProfileCard user={user} />

              {/* Estatísticas */}
              <ProfileStats />
            </div>

            {/* Coluna direita */}
            <div className="flex flex-col gap-8">
              <ProfileSection title="Informações de Conta">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">Nome Completo</p>
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Especialização</p>
                    <p className="font-medium">Saúde Pública</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Instituição</p>
                    <p className="font-medium">Hospital de Santa Marta</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Número da Licença</p>
                    <p className="font-medium">MEDCEI - 2026 - 12345</p>
                  </div>
                </div>
              </ProfileSection>

              <ProfileSection title="Atividades Recentes">
                <div className="space-y-4 text-sm">
                  <div className="border rounded-xl p-4">
                    Nova simulação completa
                  </div>
                  <div className="border rounded-xl p-4">
                    Perfil atualizado com sucesso
                  </div>
                  <div className="border rounded-xl p-4">
                    Simulação agendada
                  </div>
                </div>
              </ProfileSection>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition width-fit mt-4 max-w-xs"
              >
                <LogOut size={18} />
                Terminar Sessão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
