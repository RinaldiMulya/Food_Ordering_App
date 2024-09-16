"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

function ProfilePage() {
    const { data: session, status } = useSession();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        if (session?.user?.email) {
            async function fetchUserData() {
                try {
                    const response = await fetch(`/api/profile?email=${session.user.email}`);
                    if (response.ok) {
                        const userData = await response.json();
                        setUsername(userData.username || "");
                        setEmail(userData.email || "");
                        setPhoneNumber(userData.phoneNumber || "");
                        setPostCode(userData.postCode || "");
                        setAddress(userData.address || "");
                        setCity(userData.city || "");
                        setCountry(userData.country || "");
                    } else {
                        console.error("Failed to fetch user data:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
            fetchUserData();
        }
    }, [session?.user?.email]);

    async function handleProfileUpdate(e) {
        e.preventDefault();
        try {
            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    phoneNumber,
                    address,
                    city,
                    country,
                    postCode,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                console.error("Failed to update profile:", data.message);
                alert('Profile update failed!');
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Profile update failed!');
        }
    }

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        redirect("/login");
    }

    const userImage = session?.user?.image;

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPhoneNumber(value);
    };

    const handlePostcodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPostCode(value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value !== session?.user?.username) {
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
                        src={userImage || '/pizza.png'}
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
                            value={username}
                            onChange={handleUsernameChange}
                            className="w-full px-4 py-2 border border-dark rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Username"
                        />
                        {/* Show warning if username is changed */}
                        {showWarning && (
                            <p className="text-sm text-red-500 mt-2">
                                ini nama penerima pesanan
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            readOnly
                            type="email"
                            value={email}
                            disabled
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-2 border border-primary rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Street address"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div>
                            <input
                                type="text"
                                value={postCode}
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
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-2 border border-primary rounded-lg focus:outline-none focus:border-primary"
                                placeholder="City"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
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
