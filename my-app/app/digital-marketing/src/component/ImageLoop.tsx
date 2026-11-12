import Image from "next/image";
import { useEffect, useState } from "react";
import loop1 from "../../../../public/marketing-1.jpg";
import loop2 from "../../../../public/marketing-2.jpg";
import loop3 from "../../../../public/marketing-3.jpg";

export default function ImageLoop() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesLoop = [
  {image: loop1},
  {image: loop2},
  {image: loop3},
];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesLoop.length);
    }, 3000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

    return (
        <div className="w-full lg:w-1/2 h-[80vh] md:h-auto bg-amber-600 relative">
        {imagesLoop.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 top-0 left-0 transition-all duration-[1500ms] ${
            index === currentImageIndex ? 'transform scale-[1] opacity-100' : 'transform scale-[0.92] opacity-0'
          }`}
          style={{ zIndex: index === currentImageIndex ? 2 : 1 }}
        >
          <Image
            className="object-cover"
            src={image.image}
            fill
            alt={`Image ${index}`}
            priority
          />
        </div>
      ))}
      </div>
    )
}