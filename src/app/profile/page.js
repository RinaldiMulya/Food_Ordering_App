"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

function ProfilePage() {
    const { data: session, status } = useSession();
    const [name, setName] = useState(session?.user?.name || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [postcode, setPostcode] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    function handleProfileUpdate(e) {
        e.preventDefault();
        fetch("/api/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phoneNumber, postcode, }),
        })
    }









    useEffect(() => {
        if (session) {
            setName(session.user.name || "");
            setEmail(session.user.email || "");
        }
    }, [session]);

    if (status === "loading") {
        return "Loading...";
    }
    if (status === "unauthenticated") {
        return redirect("/login");
    }
    const userImage = session?.user?.image;

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Menghapus karakter non-angka
        setPhoneNumber(value);
    };
    const handlePostcodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Menghapus karakter non-angka
        setPostcode(value);
    };

    // menampilkan peringatan
    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value !== session?.user?.name) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-8">Profile</h1>
            <div className="max-w-4xl mx-auto p-6 rounded-3xl shadow-5xl grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                {/* Bagian Gambar */}
                <div className="flex flex-col w-1/2 ml-24 items-center justify-center space-y-8">
                    <Image
                        src={userImage || '/images/default-avatar.png'}
                        alt="avatar"
                        width={200}
                        height={200}
                        className="rounded-full"
                        priority
                        key={session?.user?.image}
                    />
                    <button
                        type="button"
                        className="px-4 py-2 bg-secondary whitespace-nowrap text-accent rounded-lg hover:bg-rose-600 transition duration-500"
                    >
                        Change Profile Picture
                    </button>
                </div>

                {/* Bagian Form */}
                <form className="space-y-4 grow text-primary" onSubmit={handleProfileUpdate}>
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="w-full px-4 py-2 border border-dark rounded-lg focus:outline-none focus:border-primary"
                            placeholder="First and Last Name"
                        />
                        {/* Tampilkan peringatan jika user mencoba mengubah nama */}
                        {showWarning && (
                            <p className="text-sm text-red-500 mt-2">
                                Ini merupakan nama penerima pesanan.
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            readOnly
                            type="email"
                            value={email}
                            disabled={true}
                            className="w-full px-4 py-2 border border-dark rounded-lg focus:outline-none focus:border-primary cursor-disabled"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="w-full px-4 py-2 border border-dark rounded-lg focus:outline-none focus:border-primary"
                            placeholder="08 123 456 789"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-primary rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Street address"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <input
                                type="text"
                                value={postcode}
                                onChange={handlePostcodeChange}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className="w-full px-4 py-2 border border-dark rounded-lg focus:outline-none focus:border-primary"
                                placeholder="Enter postcode"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-primary rounded-lg focus:outline-none focus:border-primary"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-primary rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Country"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-primary text-accent rounded-lg hover:bg-rose-600 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ProfilePage;
