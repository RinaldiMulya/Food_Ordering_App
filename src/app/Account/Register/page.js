"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

export default function AccountPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState(null);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(null);

        // Validasi form
        if (!username || !email || !password) {
            setError("Silakan isi semua form");
            setCreatingUser(false);
            return;
        }

        // Submit data ke server
        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Form submitted:', data);
                setUsername('');
                setEmail('');
                setPassword('');
                setUserCreated(true);
                setCreatingUser(false);
                setShowSuccessMessage(true);

            })
            .catch(error => {
                console.error('Error:', error);
                setError("Terjadi kesalahan saat registrasi");
                setCreatingUser(false);
            });
    }

    useEffect(() => {
        if (showSuccessMessage) {
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000); // 5 detik
            return () => clearTimeout(timer);
        }
    }, [showSuccessMessage]);

    return (
        <section className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl italic font-bold mb-8 text-primary">Register Here !</h1>

            {error && (
                <div className="text-xl italic font-bold mb-8 text-red-500 text-center">
                    {error}
                </div>
            )}

            {showSuccessMessage && userCreated && (
                <div className="text-xl italic font-bold mb-8 text-white text-center">
                    User created successfully,<br /> now you can{' '}
                    <Link className="underline" href={'/Account/Login'}>Login</Link></div>
            )}

            <form className="block max-w-xl w-full mx-auto p-10 rounded-2xl custom-shadow bg-slate-800" onSubmit={handleFormSubmit}>
                {/* Username */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={creatingUser}
                        aria-label="Username"
                    />
                </div>
                {/* Email */}
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        placeholder="text@example.com"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={creatingUser}
                        aria-label="Email"
                    />
                </div>
                {/* Password */}
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        placeholder="password"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={creatingUser}
                        aria-label="Password"
                    />
                </div>
                {/* Group Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                    disabled={creatingUser}>
                    {creatingUser ? "Registering..." : "Register"}
                </button>
                <GoogleLoginButton />
                <p className="text-white text-center mt-4">Already have an account? <Link className="underline" href={'/Account/Login'}>Login here &raquo;</Link></p>
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