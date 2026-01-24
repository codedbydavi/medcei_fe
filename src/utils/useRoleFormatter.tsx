import { useAuth } from "../context/AuthContext";

export const useRoleFormatter = () => {
  const { role } = useAuth();

  const formattedRole = () => {
    switch (role) {
      case "user":
        return "Utilizador";
      case "admin":
        return "Admin";
      default:
        return "Convidado";
    }
  };

  return { formattedRole, role }; 
};



