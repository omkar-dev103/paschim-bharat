// src/hooks/useAuth.ts
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { onAuthChange, signInWithGoogle, signOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAuth() {
  const {
    user,
    userData,
    isLoading,
    isAuthenticated,
    setUser,
    setUserData,
    setLoading,
    logout,
  } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Fetch user data from our backend
        try {
          const response = await fetch(`/api/users/${firebaseUser.uid}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserData, setLoading]);

  const login = async () => {
    try {
      setLoading(true);
      const { user } = await signInWithGoogle();
      toast.success(`Welcome, ${user.displayName}!`);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      logout();
      toast.success("Signed out successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return {
    user,
    userData,
    isLoading,
    isAuthenticated,
    login,
    logout: handleLogout,
  };
}