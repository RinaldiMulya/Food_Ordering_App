import Image from "next/image";
import MenuItem from "../Menu/MenuItem";

export default function Menu() {
    return (
        <section className="">
            <div className="absolute right-0 left-0 w-full ">
                <div className="h-80 w-48 absolute -top-28 -right-3 -z-10">
                    <Image src={'/sallad2.png'} alt="sallad" layout={'fill'}
                        objectFit={'contain'} className="filter brightness-75 contrast-200" />
                </div>
                <div className="h-80 w-48 absolute top-14 -left-3 -z-10">
                    <Image src={'/sallad1.png'} alt="sallad" layout={'fill'}
                        objectFit={'contain'} className="filter brightness-75 contrast-200" />
                </div>
            </div>

            <div className="text-center mb-4111 ">
                <h3 className="uppercase text-gray-400 font-semibold leading-4">
                    Check Out
                </h3>
                <h2 className="text-4xl font-bold text-primary italic">
                    Our Best Sellers
                </h2>
            </div>
            
            <div className="grid grid-cols-4 p-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}