import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthGate = ({ children }: { children: ReactNode }) => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner/>; 
  }

  return <>{children}</>;
};

export default AuthGate;
