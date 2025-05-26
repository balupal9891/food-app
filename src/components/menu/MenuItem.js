import { useContext } from "react";
import { CartContext } from "../AppContext";
import { useState } from "react";

export default function MenuItem(menuItem) {
    const { image, name, description, price }
        = menuItem;
    const [showPopup, setShowPopup] = useState(false);

    const { addToCart } = useContext(CartContext);

    async function handleAddToCartButtonClick() {
        addToCart(menuItem);
    }


    return (
        <>

            <div className="bg-gray-300 p-4 rounded-lg text-center my-4 hover:bg-white
        hover:shadow-md hover:shadow-black/75 transition-all">
                <div className="text-center px-auto">
                    <img src={image} alt="pizza" className="max-h-30 inline" />
                </div>
                <h4 className="font-semibold">{name}</h4>
                <p className="text-gray-500 text-sm max-h-[100px] overflow-clip">{description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iure laborum minus quod recusandae at voluptates corrupti totam modi inventore, dolores, consectetur nostrum adipisci, quidem veritatis quam ratione suscipit vero?</p>


                    <button
                        className="bg-red-600 mt-4 px-8 py-2 rounded-full"
                        onClick={() => handleAddToCartButtonClick()}>
                        Add to cart {price}
                    </button>
                


            </div>

        </>
    );
}