import api from "./Api";
import User from "../models/UserModel";

export const userService = {
  // Obtem sessão atual
  getCurrentUser: async () => {
    const response = await api.get("/user/me", { withCredentials: true });
    return response.data;
  },

  // POST /user/profile - Obtém os dados do utilizador logado
  getProfile: async () => {
    const response = await api.post<{ user: User }>("/user/profile", {
    });
    return response.data.user;
  },

  // PATCH /user/edit - Atualiza dados básicos
  updateProfile: async (data: Partial<User>) => {
    const response = await api.patch<{ user: User }>("/user/edit", data, {
    });
    return response.data;
  },

  // GET /user/all_users - Lista todos (Apenas Admin)
  getAllUsers: async () => {
    const response = await api.get<{ users: User[] }>("/user/all_users", {
    });
    return response.data.users;
  },

  // DELETE /user/delete/:id - Remove utilizador (Apenas Admin)
  deleteUser: async (userId: string | number) => {
    const response = await api.delete(`/user/delete/${userId}`, {
    });
    return response.data;
  },

  // PATCH /user/change_status/:id - Alterna entre ACTIVE/INACTIVE (Apenas Admin)
  toggleUserStatus: async (userId: string | number) => {
    const response = await api.patch(`/user/change_status/${userId}`, {
    });
    return response.data;
  },

  // PATCH /user/change_role/:id - Altera o tipo de utilizador (Apenas Admin)
  changeUserRole: async (userId: string | number, role: string) => {
    console.log("userId", userId);
    const response = await api.patch(
      `/user/change_role/${userId}`,
      {
        role: role,
      },
    );
    return response.data;
  },
};
