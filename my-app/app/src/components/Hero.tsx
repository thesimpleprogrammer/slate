import Image from "next/image";
import heroBg from "../../../public/hero-coast.jpg";
import SignOutUser from "./signOutUser"

export default function Hero() {
  return (
    <div className="w-full h-[50vh] relative">
      <div className="absolute top-5 right-5">
        <SignOutUser />
      </div>
      <Image
        className="-z-10"
        src={heroBg}
        alt="Wooden boat on a rocky shore at golden hour"
        // objectFit="cover"
        // layout="fill"
        style={{ objectFit: "cover" }}
        fill
      />

      <div className="w-[500px] h-[200px] absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 ">
        <svg
          className="w-[30%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        //   width="969"
        //   height="931"
          viewBox="0 0 969 931"
          fill="none"
        >
          <path
            d="M732.917 49.0222C817.665 79.4197 903.758 120.363 942.769 186.121C981.107 251.258 971.018 340.589 952.858 421.236C935.37 501.261 909.138 571.982 872.818 640.841C837.17 709.701 790.761 776.699 724.173 826.948C658.258 876.577 571.493 909.455 476.656 923.724C381.147 937.992 276.894 934.27 208.961 885.262C141.029 836.253 109.416 741.959 86.5481 658.211C63.6796 575.084 49.555 503.122 29.377 419.374C8.52636 336.247 -17.705 242.573 16.5976 177.436C50.9002 112.299 145.737 76.3179 234.52 48.4019C322.631 20.4859 404.015 0.0141359 485.4 0.0141359C567.457 -0.60622 648.842 19.2452 732.917 49.0222Z"
            fill="white"
          />
          <mask
            id="mask0_1_8"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="21"
            y="22"
            width="929"
            height="891"
          >
            <path
              d="M722.992 69.305C804.136 98.362 886.568 137.5 923.92 200.358C960.628 262.623 950.968 348.015 933.58 425.105C916.836 501.602 891.72 569.204 856.944 635.027C822.812 700.85 778.376 764.894 714.62 812.927C651.508 860.367 568.432 891.796 477.628 905.435C386.18 919.074 286.36 915.516 221.316 868.669C156.272 821.822 126.004 731.686 104.108 651.631C82.212 572.169 68.688 503.381 49.368 423.326C29.404 343.864 4.28804 254.321 37.132 192.056C69.976 129.791 160.78 95.397 245.788 68.712C330.152 42.027 408.076 22.458 486 22.458C564.568 21.865 642.492 40.841 722.992 69.305Z"
              fill="#FF0066"
            />
          </mask>
          <g mask="url(#mask0_1_8)">
            <rect
              x="-90"
              y="-73"
              width="1093"
              height="1083"
              fill="url(#pattern0_1_8)"
            />
          </g>
          <defs>
            <pattern
              id="pattern0_1_8"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_1_8"
                transform="matrix(0.000919488 0 0 0.000927978 -0.838975 -0.112034)"
              />
            </pattern>
            <image
              id="image0_1_8"
              width="2000"
              height="1333"
              preserveAspectRatio="none"
              xlinkHref="/hero-photographer.jpg"
            />
          </defs>
        </svg>

      </div>
    </div>
  );
}
