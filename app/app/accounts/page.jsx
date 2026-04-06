'use client';
import { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
export default function Accounts() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const {name,value} = e.target;
        setForm(prev => ({...prev,[name]:value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario al backend
        console.log('Formulario enviado:', form);
    }


    return(
        <div className="flex justify-center items-center min-h-screen bg-[var(--bg)]">
            <div className="shadow-xl bg-[var(--card)] px-8 py-6 md:px-12 md:py-6 rounded-3xl flex flex-col md:flex-row gap-10 ">

                {/* HERO */}
                <div className="flex items-center justify-between gap-2 flex-col">

                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--txt)] tracking-tight">
                    Bienvenido a <br />
                    <span className="text-[var(--accentL)]">FinKaan</span>
                    </h1>

                    <p className="mt-2 text-sm text-[var(--txtSec)] max-w-sm leading-relaxed">
                    Controla tus finanzas, simula escenarios y toma mejores decisiones con datos reales.
                    </p>
                </div>

                {/* Imagen */}
                <div className="relative flex-shrink-0">
                    <img
                    src="/pig_completo.svg"
                    alt="FinKaan"
                    className="h-36 md:h-40 w-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.12)]"
                    />

                    <div className="absolute inset-0 -z-10 blur-2xl opacity-40 bg-[var(--accentDim)] rounded-full scale-110" />
                </div>

                </div>

                
                <div className="md:min-w-96 flex flex-col gap-4">
                    {/* FORM */}
                    <form className="flex flex-col justify-center gap-5">

                        <label htmlFor="email" className="flex flex-col text-sm text-[var(--txtSec)] gap-1">
                            Correo electrónico
                            <input
                            className="px-3 py-2 bg-[var(--card2)] border border-[var(--divider)] rounded-lg text-[var(--txt)] outline-none focus:border-[var(--accent)] transition"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            />
                        </label>

                        <label htmlFor="password" className="flex flex-col text-sm text-[var(--txtSec)] gap-1">
                            Contraseña
                            <input
                            className="px-3 py-2 bg-[var(--card2)] border border-[var(--divider)] rounded-lg text-[var(--txt)] outline-none focus:border-[var(--accent)] transition"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            />
                        </label>

                        <button
                            type="submit"
                            className="mt-1 bg-[var(--accent)] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
                        >
                            Iniciar sesión
                        </button>

                    </form>

                    <button className="border border=[var(--accent)] rounded-xl py-2">
                        Crear Cuenta
                    </button>

                    <div className="flex flex-col gap-2 items-center"> 
                        <p className="text-sm">Iniciar sesión con</p>
                        <div className="flex gap-2">
                            <FaGoogle  className="text-2xl text-[var(--accent)]"/>
                            <FaFacebookF  className="text-2xl text-[var(--accent)]"/>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    );
}
