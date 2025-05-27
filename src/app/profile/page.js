'use client';
import SuccessBox from "@/components/layout/SuccessBox";
// import EditableImage from "@/components/layout/EditableImage";
// import InfoBox from "@/components/layout/InfoBox";
// import SuccessBox from "@/components/layout/SuccessBox";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { resolve } from "styled-jsx/css";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(true);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    console.log(data.admin)
                    setProfileFetched(true);
                    // console.log(data)
                })
            });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: "PUT",
                body: JSON.stringify(data),
                header: { 'content-type': 'application/json' }
            })
           
            // console.log(response)
            if(response.ok){
                resolve()
            }
            else{
                reject()
            }
        })
         await toast.promise(savingPromise, {
          loading: 'Saving...',
          success: 'Profile saved!',
          error: 'Error',
        });


        

    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }


    return (
        <section className="mt-8 mb-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    );
}