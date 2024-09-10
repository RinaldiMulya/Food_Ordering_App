import Image from "next/image";
import { ArrowRightCircleIcon as SolidIcon } from '@heroicons/react/24/solid';
import { ArrowRightCircleIcon as OutlineIcon } from '@heroicons/react/24/outline';

export default function Hero() {
    return (
        <section className="hero p-4 mt-10">
            <div className="py-8">
                <h1 className="text-4xl text-gray-300 font-normal capitalize">Everything is better with a <span className="text-primary font-extrabold">pizza</span></h1>
                <p className="my-4 text-gray-500 capitalize">
                    Our pizzas are crafted with the freshest ingredients, hand-tossed dough, and rich, flavorful sauces.
                    We offer a wide range of toppings, from traditional favorites to gourmet options.
                    Every pizza is made to order, ensuring that each bite is fresh and flavorful.
                </p>
                <div className="flex gap-8 my-4 items-center">
                    <button className="uppercase bg-primary rounded-full px-10 py-3  text-white flex items-center group relative overflow-hidden">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 transform transition-transform duration-1000 group-hover:translate-x-32 group-hover:text-gray-800 ">
                            <SolidIcon className="h-6 w-6" />
                        </span>
                        <span className="relative text-nowrap group-hover:text-gray-800">Order Now</span>
                    </button>
                    <button className="font-bold flex items-center gap-2 group text-gray-500">
                        <span className="transform transition-transform duration-1000 group-hover:translate-x-32 group-hover:text-primary">
                            <OutlineIcon className="h-6 w-6"/>
                        </span>
                        <span className="relative text-nowrap group-hover:text-primary">Learn More</span>
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image src="/pizza.png" alt="pizza" layout="fill" objectFit="contain" className="filter brightness-75 contrast-200" />
            </div>
        </section>
    );
}