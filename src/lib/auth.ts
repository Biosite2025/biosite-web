import React from "react";
import { redirect } from "next/navigation";

// Utility to check auth status (client and server)
export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("biosite-auth") === "true";
  }
  // On server, always return false (no SSR session)
  return false;
}

// Server-side redirect if not authenticated
export function requireAuth() {
  if (typeof window === "undefined") {
    // SSR: skip (Next.js App Router will handle client-side)
    return;
  }
  if (!isAuthenticated()) {
    redirect("/login");
  }
}

// Client-side hook for protected pages
// Returns [isAuthenticated, isLoading]
export function useAuthGuard(): [boolean, boolean] {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const authed = localStorage.getItem("biosite-auth") === "true";
      setIsAuth(authed);
      setLoading(false);
      if (!authed) {
        window.location.replace("/login");
      }
    }
  }, []);
  return [isAuth, loading];
}

// Logout utility
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("biosite-auth");
    window.location.replace("/login");
  }
}
