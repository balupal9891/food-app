'use client';
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
// import newMenuItemPage from "./new/page";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function MenuItemsPage() {

  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setMenuItems(menuItems);
        // console.log(menuItems)
      });
    })
  }, []);

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="button  max-w-md mx-auto my-8 bg-gray-300 gap-2">
        <Link className="inline-flex" href={'menu-items/new'}>
          Create New Item
        </Link>
        <Right />
      </div>

      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid md:grid-cols-3 gap-2 mb-8">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/' + item._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-center">
                {item.image ? <Image
                  className="rounded-md"
                  src={
                    item.image ?
                      item.image : ''} alt={''} width={200} height={200} /> : <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                  No image
                </div>
                }
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}