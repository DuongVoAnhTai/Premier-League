"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient();

export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter();

    // Check for auth token
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
          router.push("/admin/dashboard");
      }
  }, [router]);
  
    return (
      <QueryClientProvider client={queryClient}>
        <div className="h-screen flex">
          <div className="w-full overflow-scroll">
            {children}
          </div>
        </div>
      </QueryClientProvider>
    )
  }