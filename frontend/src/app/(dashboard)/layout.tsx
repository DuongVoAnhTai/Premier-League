"use client"

import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logout } from "@/lib/api";

// Create a client
const queryClient = new QueryClient();

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter();

    // Check for auth token
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
          router.push("/admin/login");
      }
  }, [router]);

    return (
      <QueryClientProvider client={queryClient}>
        <div className="h-screen flex">
          {/* LEFT */}
          <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-blue-500">
            <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 p-4">
              <Image src="/logo.png" alt="logo" width={32} height={32} />
              <span className="hidden lg:block text-lg font-bold">Premier League</span>
            </Link>
            <Menu/>
          </div>

          {/* RIGHT */}
          <div className="w-[86%] md:w-[92%] lg:w-[84%] xd:w-[86%] overflow-scroll">
            <Navbar/>
            {children}
          </div>
        </div>
      </QueryClientProvider>
    )
  }