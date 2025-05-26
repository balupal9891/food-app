"use client"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function ResigterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            setUserCreated(true);
        }
        else {
            setError(true);
        }
        setCreatingUser(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-red-600 text-4xl">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br />
                    Now you can{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br />
                    Please try again later
                </div>
            )}
            <form onSubmit={handleFormSubmit} className="block max-w-xs mx-auto">
                <input type="email" name="" id="" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser} />
                <input type="password" name="" id="" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={creatingUser} />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="text-center my-4">
                    login with provider
                </div>
                <button className="flex border-1 border-gray-600 py-2 px-16 rounded-xl gap-4 justify-center text-semibold mb-8">
                    <Image className="inline-block mr-4" src={'/google.png'} alt={''} width={24} height={24} ></Image>
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    );
}