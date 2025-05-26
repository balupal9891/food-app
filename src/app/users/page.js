'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UserPage() {
    const { loading, data } = useProfile();
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers();
    }, [])

    function fetchUsers(){
        fetch('/api/users').then(res =>
            res.json().then(users => {
                setUsers(users);
            })
        )
    }

     async function handleUserDelete(_id){
        // console.log(_id);
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/users?id='+_id, {
                method: "DELETE",
                // body: JSON.stringify({_id}),
                header: { 'content-type': 'application/json' }
            })
            // console.log(response)
            fetchUsers();
            if(response.ok){
                resolve()
            }
            else{
                reject()
            }
        })
        await toast.promise(savingPromise, {
          loading: 'Deleting...',
          success: 'User Deleted',
          error: 'Error',
        });
     }


    if (loading) {
        return "Loading user Info";
    }

    if (!data.admin) {
        return "not an admin";
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div
                        key={user._id}
                        className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                            <div className="text-gray-900">
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div className=" flex gap-2">
                            <Link className="button" href={'/users/' + user._id}>
                                Edit
                            </Link>
                            <div className="w-22 text-white">

                        <button type="button" 
                        className=" bg-red-600 "
                        onClick={()=>handleUserDelete(user._id)}
                         >Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}