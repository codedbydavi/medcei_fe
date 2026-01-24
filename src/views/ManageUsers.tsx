import React, { useEffect, useState } from "react";
import User from "../models/UserModel";
import UserTable from "../components/UserTable";
import BackgroundDecoration from "../utils/BackgroundDeco";
import { userService } from "../apis/User";
import { Users, ShieldCheck, Search } from "lucide-react";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.id.toString().includes(searchTerm) ||
      u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await userService.toggleUserStatus(id);
      setUsers(
        users.map((u) =>
          u.id === id
            ? { ...u, status: response.new_status }
            : u,
        ),
      );

      toast.success(`Status atualizado para ${response.new_status}`);
    } catch (error) {
      toast.error("Erro ao alterar status");
    }
  };

  const handleChangeRole = async (id: string, role: string) => {
    try {
      await userService.changeUserRole(id, role);
      setUsers(users.map((u) => (u.id === id ? { ...u, role } : u)));
      toast.success("Cargo do utilizador atualizado!");
    } catch (error) {
      toast.error("Erro ao alterar cargo");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col p-4 md:p-8 bg-slate-50/50">
      <BackgroundDecoration />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="text-teal-600" size={28} />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Gerenciar Utilizadores
              </h1>
            </div>
            <p className="text-gray-500 text-sm">
              Administre permissões e estados de acesso da plataforma.
            </p>
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Procurar utilizador..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Container da Tabela com Tamanho Fixo e Scroll */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-xl overflow-hidden flex flex-col flex-grow min-h-[500px]">
          {/* Header da Tabela (Fixo) */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white/50">
            <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Users size={16} /> Total: {filteredUsers.length}
            </span>
          </div>

          {/* Área de Scroll da Tabela */}
          <div className="overflow-x-auto overflow-y-auto flex-grow custom-scrollbar">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm animate-pulse">
                  A carregar utilizadores...
                </p>
              </div>
            ) : (
              <UserTable
                users={filteredUsers}
                onToggleStatus={handleToggleStatus}
                onChangeRole={handleChangeRole}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
