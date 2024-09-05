"use client"
import Image from "next/image";
import { useState } from "react";

export default function AccountPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    function handleFormSubmit(ev){
        ev.preventDefault()
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { "Content-Type": "application/json" }
        })
    }
    return (
        <section className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl italic font-bold mb-8 text-white">Register Here !</h1>
            <form className="block max-w-xl w-full mx-auto p-8 rounded-2xl custom-shadow" onSubmit={handleFormSubmit}>
                {/* Username */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                {/* email */}
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        placeholder="text@example.com"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* password */}
                <div className="mb-4">
                    <input 
                        type="password"
                        value={password}
                        placeholder="password"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {/* group-button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mb-4">
                    Register
                </button>
                <button className="justify-center flex gap-4 p-2 text-white">
                    <Image src="/google.png" alt="google" width={24} height={24} />Login With Google
                </button>
            </form>
        </section>
    );
}