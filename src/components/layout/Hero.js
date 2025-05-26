import Image from "next/image";
import Right from "../icons/Right";

export default function Hero(){
    return(
        <section className="hero">
            <div className="py-12">
                <h1 className=" text-4xl font-semibold sm:text-lg">
                    Everything is <br />
                    better with <br />
                    <span className="text-red-700">Pizza</span>
                </h1>
                <p className="my-4 text-gray-500">
                    Pizza is the missing piece that make every day complete, a simple yet delicious joy in life
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="bg-red-600 uppercase items-center flex gap-2 text-white px-8 py-2 rounded-full">
                        Order now
                        <Right />
                    </button>
                    <button className="flex items-center gap-2 px-2 border-0 rounded-2xl text-gray-900 font-semibold">
                        Learn more
                        <Right />
                    </button>
                </div>
            </div>
            <div className="relative hidden md:block">
            <Image src={'/pizza.png'}  layout={'fill'} objectFit={'contain'}  alt={'pizza'} ></Image>
            </div>
        </section>
    );
}