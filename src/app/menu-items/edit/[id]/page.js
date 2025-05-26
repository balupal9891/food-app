'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
// import EditableImage from "@/components/layout/EditableImage";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { useParams } from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";


export default function EditMenuItemPage() {

    const { loading, data } = useProfile();

    const [menuItem, setMenuItem] = useState('');

    const [redirectToItems, setRedirectToItems] = useState(false);

    const { id } = useParams()

    useEffect(() => {
        fetch('/api/menu-items').then(res =>
            res.json().then(items => {
                const item = items.find(i => i._id == id);
                setMenuItem(item);
            })
        )
    }, [])


    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        // const data = { image, name, description, price }
        const _id = menuItem._id;
        data.image = data.image? data.image: "https://res.cloudinary.com/balupal/image/upload/v1748218774/mlkuboudceqwefc7zenk.png";
        console.log(data.category)
        data.category = data.category.length>0 ? data.category: null;
        // data.price = Number(data.price)
        console.log(data)
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify({_id, ...data}),
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
        setRedirectToItems(true);
    }

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE',
            });
            if (res.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return "Loading user Info";
    }

    if (!data.admin) {
        return "not an admin";
    }


    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="  flex  mt-8 max-w-lg mx-auto gap-2">
                <Link href={'/menu-items'} className=" button inline-flex">Show all Menu items  <Left /> </Link>

            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
            <div className="max-w-md  mx-auto">
                <div className="max-w-xs ml-auto pl-2">
                    <DeleteButton label={'Delte this menu item'} onDelete={handleDeleteClick} />
                </div>
            </div>
        </section>
    );

}