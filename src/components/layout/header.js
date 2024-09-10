"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon, UserPlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession(); // Destructuring
    const isAuthenticated = status === "authenticated";

    return (
        <header className="h-20 w-full px-5 flex items-center justify-between text-gray-200">
            {/* Navigation Links */}
            <nav className="flex items-center gap-4 font-extralight">
                <Link href="/menu" className="hover:text-white">Menu</Link>
                <Link href="/offer" className="hover:text-white">Offer</Link>
                <Link href="/order-track" className="hover:text-white">Order Track</Link>
                <Link href="/find-restaurant" className="hover:text-white">Find Restaurant</Link>
            </nav>

            {/* Logo */}
            <Link href="/">
                <Image src="/Fornelio.png" alt="logo" width={200} height={100} />
            </Link>

            {/* User Actions */}
            <nav className="flex items-center gap-4 relative">
                {/* Conditional Rendering Based on Authentication Status */}
                {isAuthenticated ? (
                    <div className="relative group">
                        <Link href="/Account/Profile" className="flex items-center gap-2 hover:text-white" aria-haspopup="true" aria-expanded="false">
                            <UserCircleIcon className="h-6 w-6" />
                            <span>Profile</span>
                        </Link>

                        {/* Dropdown Menu */}
                        <div
                            className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                            role="menu"
                            aria-label="Profile options">
                            <button
                                onClick={() => signOut()}
                                className="w-full px-4 py-2 text-sm text-center text-white hover:bg-rose-600 hover:text-gray-700 rounded-lg"
                                role="menuitem"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link href="/Account/Register">
                            <UserPlusIcon className="h-6 w-6 hover:text-white" />
                        </Link>
                    </>
                )}

                {/* Cart Icon */}
                <Link href="/cart">
                    <ShoppingCartIcon className="h-6 w-6 hover:text-white" />
                </Link>
            </nav>
        </header>
    );
}
