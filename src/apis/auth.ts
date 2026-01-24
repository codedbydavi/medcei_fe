import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import User from "../models/UserModel";
import api from "./api";

const provider = new GoogleAuthProvider();

type loginPayload = Pick<User, "email" | "password">;
type registerPayload = Pick<
  User,
  "firstName" | "lastName" | "email" | "password"
>;

export const authService = {
  // POST /auth/login - Login do utilizador
  login: async (user: loginPayload) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const firebase = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password!,
      );

      if (!firebase.user.emailVerified) {
        await auth.signOut();
        throw new Error("EMAIL_NOT_VERIFIED");
      }

      const idToken = await firebase.user.getIdToken();
      const response = await api.post(
        "/auth/login",
        {},
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 403) {
          await auth.signOut();
          throw new Error(
            error.response.data.error || "Acesso proibido: conta inativa.",
          );
        }
      }
      if (error.code === "auth/invalid-credential") {
        throw new Error("Email ou palavra-passe incorretos.");
      }

      throw new Error(error.message || "Ocorreu um erro inesperado.");
    }
  },

  // POST /auth/login/google - Login com Google
  loginWithGoogle: async () => {
    try {
      const firebase = await signInWithPopup(auth, provider);
      const idToken = await firebase.user.getIdToken();
      const response = await api.post(
        "/login",
        {},
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", response.data.user.role);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST /auth/register - Registo do utilizador
  register: async (user: registerPayload) => {
    try {
      const firebase = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password!,
      );
      const idToken = await firebase.user.getIdToken();

      await sendEmailVerification(firebase.user);
      const response = await api.post(
        "/auth/register",
        { first_name: user.firstName, last_name: user.lastName },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST /auth/refresh_token - Refresh token
  refreshToken: async () => {
    const response = await api.post("/auth/refresh", {});
    return response.data;
  },

  // POST /auth/logout - Saida do Utilizador
  logout: async () => {
    try {
      await auth.signOut();
      const response = await api.post("/auth/logout", {});
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  },

  sendVerificationAgain: async (email: string, password: string) => {
    const firebase = await signInWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(firebase.user);
    await auth.signOut();
  },
};
