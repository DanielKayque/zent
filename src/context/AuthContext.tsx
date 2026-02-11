"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { redirect, useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      setLoading(false);
      console.log(currentUser);
      redirect('/dashboard')
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children} 
      {/* Opcional: Renderizar um "Loading..." enquanto verifica */}
      {loading && <div className="h-screen flex items-center justify-center">Carregando...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);