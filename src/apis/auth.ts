import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import User from "../models/user_model";

const provider = new GoogleAuthProvider();

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

type loginPayload = Pick<User, "email" | "password">;
type registerPayload = Pick<
  User,
  "firstName" | "lastName" | "email" | "password"
>;

export const Login = async (user: loginPayload) => {
  try {
    const firebase = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password!
    );

    if (!firebase.user.emailVerified) {
      await auth.signOut();
      throw new Error("Por favor, verifique seu e-mail antes de fazer login.");
    }

    const idToken = await firebase.user.getIdToken();
    const response = await api.post(
      "/auth/login",
      {},
      {
        headers: { Authorization: `Bearer ${idToken}` },
        withCredentials: true,
      }
    );
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", response.data["role"]);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const LoginWithGoogle = async () => {
  try {
    const firebase = await signInWithPopup(auth, provider);
    const idToken = await firebase.user.getIdToken();
    const response = await api.post(
      "/login",
      {},
      {
        headers: { Authorization: `Bearer ${idToken}` },
        withCredentials: true,
      }
    );
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", response.data["role"]);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Register = async (user: registerPayload) => {
  try {
    const firebase = await createUserWithEmailAndPassword(auth, user.email, user.password!);
    const idToken = await firebase.user.getIdToken();

    await sendEmailVerification(firebase.user);
    const response = await api.post(
      "/auth/register",
      { first_name: user.firstName, last_name: user.lastName },
      {
        headers: { Authorization: `Bearer ${idToken}` },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
