import { createContext, useContext, useEffect, useState } from "react";
import User from "../models/UserModel";
import { authService } from "../apis/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { userService } from "../apis/User";

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("role", role);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await userService.getCurrentUser();

          login({
            id: response.user.id || "",
            email: response.user.email,
            fullName: response.user.fullName,
            firstName: response.user.first_name,
            lastName: response.user.last_name,
            status: response.user.status,
            role: response.user.role,
          });

          setRole(response.user.role);
        } catch (err) {
          console.log(
            "Erro ao buscar /me, mas usuário Firebase está logado:",
            err,
          );
        }
      } else {
        setUser(null);
        setRole(null);
        console.log("entri no else");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function login(user: User) {
    setUser(user);
    setRole(user.role || "");
  }

  async function logout() {
    await authService.logout();
    setUser(null);
    setRole(null);
  }

  function updateUser(userData: any) {
    login({
      id: userData.id || "",
      email: userData.email,
      fullName: userData.fullName,
      firstName: userData.first_name,
      lastName: userData.last_name,
      status: userData.status,
      role: userData.role,
    });
  }

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
