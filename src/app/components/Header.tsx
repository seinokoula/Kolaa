import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

export default function Header() {
    const [linkImg, setLinkImg] = useState<string | null>();

    return (
        <div className="mx-auto w-full px-6 sm:py-24 lg:px-12 h-screen flex lg:max-w-7xl">
            <div className="flex flex-col w-1/2 mt-32 gap-4">
                <h1 className="text-7xl font-black text text-primary_300">
                    Votre nouvelle veille techno
                </h1>
                <p className="">
                    Pour voir ce que les gens autour de vous ont trouvé et vous aussi.
                </p>
                <a
                    href="#feed"
                    className="border-gray-400 border-2 border-four_400 rounded-lg shadow-md p-2 w-fit"
                >
                    Voir les publications
                </a>
            </div>
            <div className="h-full w-3/5 flex justify-center overscroll-none items-center max-md:hidden">
                <Spline className="mb-32" scene="https://prod.spline.design/9i6cHACyl8NWozaQ/scene.splinecode" />
            </div>
        </div>
    );
}
