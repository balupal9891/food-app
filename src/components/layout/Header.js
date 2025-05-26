"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import Bars2 from "../icons/Bars2";
import { useState } from "react";

function AuthLinks({status, userName}) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2">
          Logout
        </button>
      </>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
    const session = useSession();
    // console.log(session);
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const status = session.status;
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }
    const { cartProducts } = useContext(CartContext)
    const [mobileNavOpen, setMobileNavOpen] = useState(false);




    return (
        <>

            <header className="">

                <div className="flex items-center md:hidden justify-between">
                    <Link className="text-primary font-semibold text-2xl" href={'/'}>
                        ST PIZZA
                    </Link>
                    <div className="flex gap-8 items-center">
                        <Link href={'/cart'} className="relative">
                            <ShoppingCart />
                            {cartProducts?.length > 0 && (
                                <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                                    {cartProducts.length}
                                </span>
                            )}
                        </Link>
                        <button
                            className="p-1 border"
                            onClick={() => setMobileNavOpen(prev => !prev)}>
                            <Bars2 />
                        </button>
                    </div>
                </div>
                {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/#about'}>About</Link>
          <Link href={'/#contact'}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}

<div className="flex justify-between items-center">
                <nav className="hidden md:flex items-center gap-8 text-gray-500">
                    <Link className="text-red-600 font-semibold" href="/">BP PIZZA</Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/#contact'}>Contacts</Link>
                </nav>
                <nav className="hidden md:flex text-ceneter  items-center gap-4">

                    {status === 'authenticated' && (
                        <>
                            <Link href={"/profile"} className="text"> {userName}</Link>
                            <button onClick={() => { signOut() }} className="bg-red-600 rounded-full text-white px-6 py-2" >Logout</button>
                        </>
                    )}
                    {status !== "authenticated" && (
                        <>
                            <Link href={'/login'}>Login</Link>
                            <Link href={'/register'} className="bg-red-600 rounded-full text-white px-6 py-2" >Register</Link>
                        </>)
                    }

                    {cartProducts?.length > 0 && (
                        <Link href={'/cart'} className="relative">
                            <ShoppingCart />
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-3xl text-xs">
                                {cartProducts.length}
                            </span>
                        </Link>
                    )}

                </nav>
                </div>
            </header>
        </>
    );
}