'use client';
import {useContext, createContext, useState } from 'react'
import { useRouter } from "next/navigation";

const AuthContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = async (data) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: "include" // 🔥 necesario
        });

        const user = await res.json();

        setUser({
            id: user.user_id,
            name: user.name
        });

    };

    const value = {
        login
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};