'use client'

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export const Navbar = () => {
    const { user, logout } = useAuth(); //

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-x1 font-bold">
                    Football Championship
                </Link>
                <div className="space-x-4">
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link href="/admin/tournaments" className="hover:underline">
                                    Admin Dashboard
                                </Link>
                            )}
                            {user.role === 'coach' && (
                                <Link href="/coach/tournaments" className="hover:underline">
                                    Coach Dashboard
                                </Link>
                            )}
                            <button onClick={logout} className="hover:underline">
                                Logout
                            </button>
                        </>
                    ): (
                        <>
                            <Link href="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link href="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};