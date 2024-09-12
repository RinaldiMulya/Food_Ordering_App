"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBagIcon, UserPlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useSession, signOut } from "next-auth/react";

// Navigation Component
function Navigation() {
    return (
        <nav className="flex items-center gap-4 font-extralight text-primary">
            <Link href="/menu" className="hover:font-semibold">Menu</Link>
            <Link href="/offer" className="hover:font-semibold">Offer</Link>
            <Link href="/order-track" className="hover:font-semibold">Order Track</Link>
            <Link href="/find-restaurant" className="hover:font-semibold">Find Restaurant</Link>
        </nav>
    );
}

// Logo Component
function Logo() {
    return (
        <Link href="/">
            <Image src="/Fornelio.png" alt="logo" width={200} height={100} />
        </Link>
    );
}

// User Actions Component
function UserActions({ isAuthenticated, userName }) {
    return (
        <nav className="flex items-center gap-4 relative">
            {isAuthenticated ? (
                <div className="relative group">
                    <Link href="/profile" className="flex items-center gap-2" aria-haspopup="true" aria-expanded="false">
                        <UserCircleIcon className="h-6 w-6" strokeWidth={2} />
                        <span>{userName}</span>
                    </Link>

                    {/* Dropdown Menu */}
                    <div
                        className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-lg text-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                        role="menu"
                        aria-label="Profile options">
                        <a href="/profile">
                            <button
                                type="button"
                                className="w-full px-4 py-2 text-sm text-white hover:bg-secondary rounded-lg"
                                role="menuitem">
                                {userName}
                            </button>
                        </a>
                        <button
                            onClick={() => signOut()}
                            type="button"
                            className="w-full px-4 py-2 text-sm text-white hover:bg-rose-600 hover:text-gray-700 rounded-lg"
                            role="menuitem">
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <Link href="/Account/Register">
                    <UserPlusIcon className="h-6 w-6" />
                </Link>
            )}
            {/* Cart Icon */}
            <Link href="/cart" className="bg-secondary opacity-70 border-2 border-primary rounded-md p-1">
                <ShoppingBagIcon className="h-4 w-4 text-primary" strokeWidth={2} />
            </Link>
        </nav>
    );
}

// Main Header Component
export default function Header() {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";

    let userName = session?.user?.name;
    if (userName && userName.includes(" ")) {
        userName = userName.split(" ")[0];
    }

    return (
        <header className="h-20 w-full px-5 flex items-center justify-between text-primary">
            <Navigation />
            <Logo />
            <UserActions isAuthenticated={isAuthenticated} userName={userName} />
        </header>
    );
}
