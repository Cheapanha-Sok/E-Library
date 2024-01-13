import { getBestSelling } from "../homeSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function BestSellingHero() {

    const bestSelling = useSelector(getBestSelling);

    if (!bestSelling) {
        return null
    }
    const { image, description, bookId, categories, price, title } = bestSelling;

    return (

        <div className="bg-gradient-to-r from-white to-[#283d50]">
            <div className="flex flex-col md:flex-row justify-between items-center p-5 text-[#283d50]">
                <div className="flex flex-col gap-5 w-full md:w-1/2">
                    <div className="flex flex-col gap-5">
                        <p className="text-2xl font-extrabold tracking-tight leading-none md:text-4xl">
                            Best selling
                        </p>
                        <p className="font-extrabold text-md md:text-2xl">{title}</p>
                        <p className="text-md md:text-lg">{description}</p>
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <p>${price}</p>
                        <Link
                            to={`/book/${categories}/${bookId}`}
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                        >
                            Shop now &rarr;
                        </Link>
                    </div>
                </div>
                <div className="hidden lg:block w-1/4 overflow-hidden p-10">
                    <img
                        src={image}
                        alt="Bordered avatar"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
}
