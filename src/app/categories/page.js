'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {

    const { loading: adminInfoLoading, data: profielData } = useProfile();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(response =>
            response.json().then(categories => {
                setCategories(categories);
            })
        )
        console.log(categories)

    }


    async function handleCategorySubmit(ev) {
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName };
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
            setCategoryName('');
            setEditedCategory(null)
            fetchCategories();
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(creationPromise, {
            loading: editedCategory ? "Updating the category" : "creating your new Category",
            success: editedCategory ? 'category updated' : "category created",
            error: "Error , sorry.."
        })


    }

    async function handleDelete(_id) {
        // ev.preventDefault();
        // console.log(_id)
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories', {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ _id })
            })
            fetchCategories();
            if (response.ok)
                resolve();
            else
                reject();
        });
    }

    if (adminInfoLoading == true) {
        return "Loading user info";
    }

    if (!profielData?.admin) {
        return "Not an admin";
    }

    return (
        <section className="mt-4 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="md:flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update Category' : 'New category name'}
                        </label>
                        <input type="text"
                            value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="flex gap-1">
                        <button type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button 
                        type="button"
                        className="py-1 h-10 mt-2"
                        onClick={ev => {
                            setEditedCategory(false)
                            setCategoryName('')
                        }}
                        >cancel</button>
                    </div>
                </div>
            </form>
            <div className="mb-4">
                <h2 className="text-gray-500 mt-4 ">Edit Categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div
                        key={c._id}
                        className="md:bg-gray-100 rounded-xl p-2 px-4 md:flex gap-1 mb-1 items-center">
                        <div className="grow sm:text-xl">
                            {c.name}
                        </div>
                        <div className="flex gap-1">
                            <button type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                }}
                            >
                                Edit
                            </button>
                            <DeleteButton label={'Delete'} onDelete={()=>handleDelete(c._id)} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}