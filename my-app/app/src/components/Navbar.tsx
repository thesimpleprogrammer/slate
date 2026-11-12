"use client";

import SignOutButton from "./SignOutButton";
import { useState } from "react";

export default function Navbar({ user_page, links }: any) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="text-white absolute top-0 left-0 w-full z-80 px-10 sm:px-15 md:px-20 py-10">
          <div className="relative flex flex-row justify-between items-center w-full">
            <a
              href="#"
              className="text-5xl font-bold hover:text-slate-200 transition-colors duration-300 hover:cursor-pointer"
            >
              Ifiok&apos;s Gallery
            </a>
            <>
              <div className={`hidden text-white transform top-0 translate-y-0 lg:flex flex-row justify-between items-center w-[40%]`}>
                {links.map((link:any, index:any) => (
                  <a
                    key={index}
                    className={`w-full text-center py-3 rounded-md bg-slate-200 hover:bg-slate-400 lg:bg-transparent lg:hover:text-slate-400 lg:hover:bg-transparent lg:py-0 lg:border-0 lg:w-fit transition-colors duration-300`}
                    href={link.url}
                  >
                    {link.name}
                  </a>
                ))}
                </div>
                
              <div className={`transition-all duration-300 ease-in-out transform origin-top scale-y-0 opacity-0 ${isOpen && `scale-y-100 opacity-100` } absolute -bottom-5 transform translate-y-[100%] gap-1 p-1 rounded-md bg-white lg:bg-transparent lg:text-white text-black lg:static lg:transform lg:top-0 lg:translate-y-0 w-full flex flex-col lg:flex-row justify-between items-center lg:w-[40%] lg:hidden`}>
                {links.map((link: any, index: any) => (
                  <a
                    key={index}
                    className={`w-full text-center py-3 rounded-md bg-slate-200 hover:bg-slate-400 lg:bg-transparent lg:hover:text-slate-400 lg:hover:bg-transparent lg:py-0 lg:border-0 lg:w-fit transition-colors duration-300`}
                    href={link.url}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex flex-col bg-slate-200 rounded-md w-full gap-3 items-center p-3 lg:hidden">
                <a href="#" className="w-full rounded-md">
                  <button className="bg-slate-900 text-white hover:bg-slate-700 rounded-md w-full px-4 py-2 transition-colors duration-300 hover:cursor-pointer">
                    Talk to Us
                  </button>
                </a>
                {user_page.user && <SignOutButton user={user_page} />}{" "}
                {/*What I was doing was to make the sign out button only show when the user is logged in cuz on production (vercel) it wasn't like that*/}
              </div>
              </div>
              <div className="lg:flex hidden flex-row gap-3 items-center">
                <a href="#">
                  <button className="border border-white hover:bg-white hover:text-black px-4 py-2 transition-colors duration-300 hover:cursor-pointer">
                    Talk to Us
                  </button>
                </a>
                {user_page.user && <SignOutButton user={user_page} />}{" "}
                {/*What I was doing was to make the sign out button only show when the user is logged in cuz on production (vercel) it wasn't like that*/}
              </div>
            </>
            {isOpen ?
            (<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 lg:hidden hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>) :
              (<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 lg:hidden hover:cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>)
            }
          </div>
        </div>
  );
}
