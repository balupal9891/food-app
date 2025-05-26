'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import Link from "next/link";
import Left from "@/components/icons/Left";
import {redirect} from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function newMenuItemPage() {

    const { loading, data } = useProfile();
      const [redirectToItems, setRedirectToItems] = useState(false);
    

    // const [menuItem, setMenuItem] = useState([]);

    
    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data.image = data.image? data.image: "https://res.cloudinary.com/balupal/image/upload/v1748218774/mlkuboudceqwefc7zenk.png";
        console.log(data.category)
        data.category = data.category.length>0 ? data.category: null;
        console.log(data.category)
        // const data = { image, name, description, price }
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved',
            error: 'Error',
        });

        setRedirectToItems(true)
    }

    if (redirectToItems) {
    return redirect('/menu-items');
  }

    if (loading) {
        return "Loading user Info";
    }

    if (!data.admin) {
        redirect('/menu-items')
    }


    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="  flex  mt-8 max-w-lg mx-auto gap-2">
                <Link href={'/menu-items'} className=" button inline-flex">Show all Menu items  <Left /> </Link>
                 
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={null}  />
        </section>
    );
}