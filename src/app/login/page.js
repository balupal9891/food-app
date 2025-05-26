'use client';
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', { email, password, callbackUrl: '/' });

    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-red-600 text-4xl mb-4">
        Login
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="email" value={email}
          disabled={loginInProgress}
          onChange={ev => setEmail(ev.target.value)} />
        <input type="password" name="password" placeholder="password" value={password}
          disabled={loginInProgress}
          onChange={ev => setPassword(ev.target.value)} />
        <button disabled={loginInProgress} type="submit">Login</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex border-1 border-gray-600 py-2 px-16 rounded-xl gap-4 justify-center text-semibold mb-8">
          <Image className="inline-block mr-4" src={'/google.png'} alt={''} width={24} height={24} ></Image>
          Login with google
        </button>
      </form>
    </section>
  );
}