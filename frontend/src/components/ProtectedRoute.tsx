'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    role: 'admin' | 'coach';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const { user } = useAuth(); // Assuming you have a useAuth hook to get the user
    const router = useRouter();

    useEffect(() => {
        if(!user) {
            router.push('/login');
        }
        else if(user.role !== role) {
            router.push(user.role === 'admin' ? '/admin/tournaments' : '/coach/tournaments');
        }
    }, [user, role, router]);

    if(!user || user.role !== role) {
        return null;
    }

    return <>{children}</>;
}