// lib/auth.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
    async signUp(userData) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
    },

    async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    return response.json();
    },

    // Redirección a la ruta de Google de tu API
    loginWithGoogle() {
    window.location.href = `${API_URL}/login/google`;
    }
};