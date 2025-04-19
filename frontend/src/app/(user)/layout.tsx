"use client"

import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        {/* Offset for fixed header: Adjust based on header height */}
        <div className="pt-32">
          {children}
        </div>
      </div>
    </QueryClientProvider>

  );
}