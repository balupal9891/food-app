'use client'
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext } from "react";
import CartProduct from "@/components/menu/CartProduct";
import { useState, useEffect } from "react";
import { useProfile } from "@/components/UseProfile";
import AddressInputs from "@/components/layout/AddressInputs";
import toast from "react-hot-toast";

export default function CartPage() {

    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = useProfile();

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, city, postalCode, country } = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);


    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += p.price;
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();
        // address and shopping cart products

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts,
                }),
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        });

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later',
        })
    }


    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader={'Cart'} />
            </div>
            <div className="mt-4 md:grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={index}
                            index={index}
                            product={product}
                            onRemove={removeCartProduct}
                        />
                    ))}
                    <div className="py-2 pr-16 flex justify-end items-center">
                        <div className="text-gray-500">
                            Subtotal:<br />
                            Delivery:<br />
                            Total:
                        </div>
                        <div className="font-semibold pl-2 text-right">
                            ${subtotal}<br />
                            $5<br />
                            ${subtotal + 5}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type="submit">Pay ${subtotal + 5}</button>
                    </form>
                </div>
            </div>

        </section >
    )
}