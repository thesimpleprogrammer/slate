// export default function Clients() {
//   return (
//     <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Our Clients</h1>
//       <p className="text-lg text-gray-700 mb-4">
//         We are proud to work with a diverse range of clients across various industries.
//       </p>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Example client cards */}
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div key={index} className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold mb-2">Client {index + 1}</h2>
//             <p className="text-gray-600">Description of client {index + 1}.</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import Image from "next/image";

import image1 from "../../public/client-logo-1.png";
import image2 from "../../public/client-logo-2.png";
import image3 from "../../public/client-logo-3.png";
import image4 from "../../public/client-logo-4.png";
import image5 from "../../public/client-logo-5.png";
import image6 from "../../public/client-logo-6.png";
import image7 from "../../public/client-logo-7.png";
import image8 from "../../public/client-logo-8.png";
// import logo from "../../../public/logo.png";

export default function Clients() {
  type ImageType = {
    image: any;
    alt: string;
  };

  const imagesA: ImageType[] = [
    { image: image1, alt: "" },
    { image: image2, alt: "" },
    { image: image3, alt: "" },
    { image: image4, alt: "" },
    { image: image5, alt: "" },
    { image: image6, alt: "" },
    { image: image7, alt: "" },
    { image: image8, alt: "" },
  ];

//   const imagesB: ImageType[] = [
//     { image: image5, alt: "" },
//     { image: image6, alt: "" },
//     { image: image7, alt: "" },
//     { image: image8, alt: "" },
//   ];

  return (
    <div id="Clients" className="relative flex-col items-center text-center w-full mt-36 mb-20 overflow-x-hidden">
      {/* <div className="w-[200px] mx-auto">
        <Image src={logo} alt={"Panaco logo"} className="w-full" />
      </div> */}

      <h1 className="text-[2rem] text-[#BEBEBE] font-bold mt-5 mb-16">
        Trusted by 500+ global companies
      </h1>
      <div className="relative w-[364.1%] group h-[75px]">
        <div className="flex w-[100%] h-full loop-scroll-animation">
          <div className="flex flex-row h-full gap-16 mr-16">
          {imagesA.map((image, index) => (
            <Image
              key={index}
              src={image.image}
              alt={image.alt}
              className=""
            />
          ))}
          </div>
        <div className="flex flex-row gap-16 mr-16 h-full">
          {imagesA.map((image, index) => (
            <Image
              key={imagesA.length+index}
              src={image.image}
              alt={image.alt}
              className=""
            />
          ))}
        </div>
        </div>
      </div>
      <div className="h-[75px] w-52 absolute bottom-0 left-0 z-10 bg-gradient-to-r from-[#141414] from-50% to-transparent" />

        <div className="h-[75px] w-52 absolute bottom-0 right-0 z-10 bg-gradient-to-l from-[#141414] from-50% to-transparent" />
    </div>
  );
}
