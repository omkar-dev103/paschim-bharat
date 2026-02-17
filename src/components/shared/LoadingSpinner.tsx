// src/components/shared/LoadingSpinner.tsx
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "border-4 border-gray-200 dark:border-gray-700 border-t-saffron-500 rounded-full animate-spin",
          sizes[size]
        )}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center mb-4 mx-auto animate-pulse">
          <span className="text-white font-bold text-2xl">प</span>
        </div>
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">
          Loading amazing destinations...
        </p>
      </div>
    </div>
  );
}