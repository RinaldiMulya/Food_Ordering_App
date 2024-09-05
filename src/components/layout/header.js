import Link from "next/link";
import Image from 'next/image';
import { ShoppingCartIcon, UserPlusIcon } from "@heroicons/react/24/outline";

export default function Header() {
    return (
        <>
            <header className="h-20 w-full px-5 flex items-center justify-between text-gray-200">
                <nav className="flex items-center gap-4 font-extralight">
                    <Link href="/menu">Menu</Link>
                    <Link href="/offer">Offer</Link>
                    <Link href="/order-track">Order Track</Link>
                    <Link href="/find-restaurant">Find Restaurant</Link>
                </nav>
                <a href="/">
                    <Image src="/Fornelio.png" alt="logo" width={200} height={100}/>
                </a>
                <nav className="flex items-center gap-4">
                    <Link href="/Account">
                        <UserPlusIcon className="h-6 w-6" />
                    </Link>
                    <Link href="/cart">
                        <ShoppingCartIcon className="h-6 w-6" />
                    </Link>
                </nav>
            </header>
        </>
    );
}
