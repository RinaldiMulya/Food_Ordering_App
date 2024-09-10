"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from "next-auth/react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const [error, setError] = useState(null);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoggingIn(true);
        setError(null);

        // Validasi form
        if (!email || !password) {
            setError("Silakan isi semua form");
            setLoggingIn(false);
            return;
        }

        // Submit data ke server
        await signIn('credentials', { email, password })
        setLoggingIn(false);
    }

    return (
        <section className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl font-bold mb-8 text-white">LOGIN</h1>

            {error && (
                <div className="text-xl italic font-bold mb-8 text-red-500 text-center">
                    {error}
                </div>
            )}

            <form className="block max-w-xl w-full mx-auto p-10 rounded-2xl custom-shadow bg-slate-800" onSubmit={handleFormSubmit} >
                {/* Email */}
                <div className="mb-4">
                    <input
                        name='email'
                        type="email"
                        value={email}
                        placeholder="text@example.com"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loggingIn}
                        aria-label="Email"
                    />
                </div>
                {/* Password */}
                <div className="mb-4">
                    <input
                        name='password'
                        type="password"
                        value={password}
                        placeholder="password"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loggingIn}
                        aria-label="Password"
                    />
                </div>
                {/* Group Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                    disabled={loggingIn}>
                    {loggingIn ? "Logging in..." : "Login"}
                </button>
                <GoogleLoginButton />
                <p className="text-white text-center mt-4"> Don`t have an account yet? {' '}<Link className="underline" href={'/Account/Register'}>Register here &raquo; </Link></p>
            </form>
        </section>
    );
}

const GoogleLoginButton = () => {
    return (
        <button
            type='button'
            onClick={() => signIn('google')}
            className="justify-center flex gap-4 p-2 text-white">
            <Image src="/google.png" alt="google" width={24} height={24} />Login With Google
        </button>
    );
};

export default LoginPage;