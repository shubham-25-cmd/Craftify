import {
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

const AppContext = createContext(undefined);

export function AppContextProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const value = {
    user,
    setUser,
    loadingUser,
    setLoadingUser,
  };

  const checkSession = async () => {
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/api/auth/login", {
        email,
        password,
      });

      setUser(data.user);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      console.log("Login Failed:", err);

      const errMsg =
        err?.response?.data?.error || "Invalid email or password";

      toast.error(errMsg);
      throw new Error(errMsg);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setUser(data.user);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.log("Registration Failed:", err);

      const errMsg =
        err?.response?.data?.error || "Registration failed";

      toast.error(errMsg);
      throw new Error(errMsg);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loadingUser,
        login,
        register,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(
      "useAppContext must be used within an AppContextProvider"
    );
  }

  return context;
}