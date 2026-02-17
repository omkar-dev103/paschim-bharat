// src/app/(auth)/login/page.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200"
          alt="Rajasthan Palace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-900/70" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-4xl font-bold mb-4">
                Discover the Soul of Western India
              </h1>
              <p className="text-white/80 text-lg">
                Sign in to save your favorite destinations, plan trips, and
                get personalized recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">प</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue to Paschim Bharat
            </p>
          </div>

          {/* Login Button */}
          <Button
            onClick={login}
            isLoading={isLoading}
            size="xl"
            className="w-full mb-4"
            variant="outline"
          >
            <Chrome className="w-5 h-5 mr-3" />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <a href="/terms" className="text-saffron-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-saffron-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}