"use client";
import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "¿Cuál es tu  situación actual?",
    options: [{
        value:1,
        text:'Soy estudiante',
        subText:'Sin ingreso fijos, pero con muchas ganas de aprender'

    },{
        value:2,
        text:'Primer trabajo',
        subText:'Recién empece a trabajar'  
    },
    {
        value:3,
        text:'Trabajo independiente',
        subText:'Ingresar variables o freelance, sin ingresos fijos'

    },{
        value:4,
        text:'Apoyo familiar',
        subText:'Recibo dinero de mi familia, sin ingresos propios'  
    },
    ],
  },
{
    id: 2,
    question: "¿Cuál es tu objetivo?",
    options: [{
        value:1,
        text:'Quiero empezar a ahorrar',
        subText:'Crear un fondo y buenos habitos.'

    },{
        value:2,
        text:'Salir de deudas',
        subText:'Tarjetas, créditos informal, etc.'  
    },
    {
        value:3,
        text:'Abrir mi primera cuenta',
        subText:'Entender el sistema bancario.'

    },{
        value:4,
        text:'Hacer crecer mi dinero',
        subText:'CETES, ahorro e inversión básica.'  
    },
    ],
  },
  {
    id: 3,
    question: "¿Cuánto sabes de Finanzas?",
    options: [{
        value:1,
        text:'Soy principiante',
        subText:'Nunca he llevado un presupuesto.'

    },{
        value:2,
        text:'Tengo algo de experiencia',
        subText:'Conozco lo básico, quiero mejorar.'  
    },
    {
        value:3,
        text:'Tengo algo de experiencia',
        subText:'Conozco lo básico, quiero mejorar.'  

    }
    ],
  },

];

export default function Register() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setForm(prev=>({...prev,[name]:value}));

    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('Submit', form);    
    }

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (current < questions.length) {
      setCurrent(current + 1);
      console.log("Respuestas:", newAnswers,current,questions.length-1);
    } else {
      console.log("Respuestas:", newAnswers,current,questions.length);

    }
  };

  const q = questions[current];

return (
    <div className="h-screen bg-white text-black">
        { current < questions.length &&
            <div className="w-full h-full flex flex-col ">
                
            {/* Contenido centrado */}
            <div className="flex-1 flex flex-col items-center justify-center">

                {/* Pregunta */}
                <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center max-w-2xl">
                {q.question}
                </h1>

                {/* Opciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
                {q.options.map((op) => (
                    <button
                    key={op.value}
                    onClick={() => handleAnswer(op.text)}
                    className="p-5 rounded-2xl hover:bg-gray-100 border border-gray-200 transition text-left shadow-sm hover:shadow-md"
                    >
                    <p className="font-medium">{op.text}</p>
                    <span className="text-xs text-gray-500">
                        {op.subText}
                    </span>
                    </button>
                ))}
                </div>
                
            </div>

            {/* Indicador abajo */}
            <div className="flex gap-2 h-1 mb-6">
                {questions.map((_, i) => (
                <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                    i <= current ? "bg-[var(--accentL)]" : "bg-gray-300"
                    }`}
                />
                ))}
            </div>

            </div>
        }

        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col w-3xl p-6  rounded-2xl shadow-2xl gap-4">
                {/* Imagen */}
                <div className="relative flex-shrink-0">
                    <img
                    src="/pig_completo.svg"
                    alt="FinKaan"
                    className="h-12 md:h-16 w-auto drop-shadow-[0_12px_25px_rgba(0,0,0,0.12)]"
                    />

                    <div className="absolute inset-0 -z-10 blur-2xl opacity-40 bg-[var(--accentDim)] rounded-full scale-110" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold leading-tight text-[var(--txt)] ">
                    Bienvenido a <span className="text-[var(--accentL)]">FinKaan</span>
                    </h1>

                    <p className="mt-2 text-sm text-[var(--txt)]">
                        Controla tus finanzas, simula escenarios y toma mejores decisiones con datos reales.
                    </p>
                </div>




                
                <div className="md:min-w-96 flex flex-col gap-2">
                    {/* FORM */}
                    <form className="flex flex-col justify-center gap-5">
                        <div className="flex  gap-4">
                            <label htmlFor="name" className="flex-1 flex flex-col text-lg text-[var(--txt)] gap-1">
                                Nombre
                                <input
                                className="px-3 py-2 border border-[var(--divider)] rounded-lg text-[var(--txt)] outline-none focus:border-[var(--accent)]  text-base transition"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nombre"
                                value={form.name}
                                onChange={handleChange}
                                />
                            </label>

                            <label htmlFor="email" className="flex-1 flex flex-col text-lg text-[var(--txt)] gap-1">
                                Correo electrónico
                                <input
                                className="px-3 py-2 border border-[var(--divider)] rounded-lg text-[var(--txt)] outline-none focus:border-[var(--accent)] text-base transition"
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={form.email}
                                onChange={handleChange}
                                />
                            </label>
                        </div>

                        <label htmlFor="password" className="flex-1 flex flex-col text-lg text-[var(--txt)] gap-1">
                            Contraseña
                            <input
                            className="px-3 py-2  border border-[var(--divider)] rounded-lg text-[var(--txt)] outline-none focus:border-[var(--accent)] text-base transition"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa una contraseña segura"
                            value={form.password}
                            onChange={handleChange}
                            />
                        </label>
                        
                        <label htmlFor="confirmPassword" className="flex-1 flex flex-col text-lg text-[var(--txt)] gap-1">
                            Confirmar contraseña
                            <input
                            className="px-3 py-2 border border-[var(--divider)] rounded-lg text-[var(--txt)] outline-none focus:border-[var(--accent)] text-base transition"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirma tu contraseña"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            />
                        </label>

                        <button
                            type="submit"
                            className="mt-1 text-base bg-[var(--accent)] text-white py-2 rounded-xl font-semibold hover:opacity-90 transition"
                            onClick={handleSubmit}
                        >
                            Listo
                        </button>

                    </form>
                    <button className="ring text-sm rounded-2xl py-2 ">
                        Ya tengo una cuenta
                    </button>
                </div>
            </div>
        </div>
  </div>
);
}