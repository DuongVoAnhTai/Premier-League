import { login, logout, register } from "@/lib/api";
import { User } from "@/lib/types";
import { getToken, getUser, removeToken, removeUser, setToken, setUser } from "@/utils/localStorage";
import { useEffect, useState } from "react"

export const useAuth = () => {
    const [user, setUserState] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = getUser();
        const storedToken = getToken();

        if(storedUser && storedToken) {
            setUserState(storedUser);
            setTokenState(storedToken);
        }
    }, []); 

    const handleLogin = async (email: string, password: string) => {
        const { user, token } = await login(email, password);
        setUser(user);
        setToken(token);
        setUserState(user);
        setTokenState(token);
    };

    const handleRegister = async (name: string, email: string, password: string, role: string) => {
        const { user, token } = await register(name, email, password, role);
        setUser(user);
        setToken(token);
        setUserState(user);
        setTokenState(token);
    };

    const handleLogout = async () => {
        await logout();
        removeUser();
        removeToken();
        setUserState(null);
        setTokenState(null);
    };

    return {
        user,
        token,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
    };
};