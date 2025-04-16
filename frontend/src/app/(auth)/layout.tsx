"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
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