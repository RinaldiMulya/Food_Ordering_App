import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function MenuItem() {
    return (
        <div className="w-11/12 p-4 rounded-lg flex flex-col text-center bg-gray-200 group hover:bg-white hover:shadow-xl hover:shadow-black/25 transition-all cursor-pointer">
            <div className="w-40 h-36 mx-auto">
                <img
                    src="/pizza.png"
                    alt="pizza"
                    className="transition-all duration-300 ease-in-out transform group-hover:brightness-75 group-hover:contrast-200 group-hover:scale-105"
                />
            </div>
            <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
            <div className="items-center text-sm px-2 mt-2">
                <div className="border border-gray-800" />
                <div className="text-gray-500 font-semibold flex justify-between text-nowrap gap-5 my-2">
                    <p>60 Calories</p>
                    <ul className="list-disc">
                        <li>4 person</li>
                    </ul>
                </div>
                <div className="border border-gray-800" />
            </div>

            <button className="flex justify-around items-center gap-8 px-1 mt-4">
                <p className="font-semibold">$12.99</p>
                <PlusCircleIcon className="h-8 w-8 text-primary" />
            </button>
        </div>
    );
}
