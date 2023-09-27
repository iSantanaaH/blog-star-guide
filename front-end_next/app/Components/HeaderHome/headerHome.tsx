import React from "react";
import { ImFacebook, ImYoutube, ImTwitter } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const header = () => {
  return (
    <header className="my-0 bg-slate-100 z-10 w-full py-4">
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center">
        <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
          <input type="text" className="input-text" placeholder="Search..." />
        </div>
        <div className="shrink w-80 sm:order-2">
          <a className="font-bold uppercase text-3xl text-blue-600 underline">
            A estrela guia
          </a>
        </div>
        <div className="w96 order-3 flex justify-center">
          <div className="flex gap-6 sm:mr-4">
            <Link href={"/pages/login"}>
              <FaUserCircle color="#888888" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;