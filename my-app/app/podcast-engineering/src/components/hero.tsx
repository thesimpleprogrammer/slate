import Image from "next/image";
import NavbarContainer from "./navBarContainer";
import bgImage from "../../../../public/podcast-studio.jpg"

export default function Hero() {
    return (
        <div className="w-full relative h-fit px-20 py-15 overflow-y-hidden">
            <NavbarContainer />
            <Image
            src={bgImage}
            alt=""
            fill
            className="bg-cover w-full absolute top-0 left-0 -z-10 object-cover"
            />
            <div className="absolute top-0 left-0 bg-gray-800 opacity-50 z-10 w-full h-full" />
            <div className="flex flex-col w-full lg:w-[50%] mx-auto relative z-20 text-center text-6xl md:text-8xl gap-5 py-20">
                <h1 className="underline underline-offset-1 text-white"><i>The</i></h1>
                <h1 className="underline underline-offset-1 text-white">Worlds <i>Best</i></h1>
                <h1 className="underline underline-offset-1 text-white">Podcast</h1>
                <h1 className="underline underline-offset-1 text-white"><i>with</i> Ifiok</h1>
            </div>
        </div>
    )
}