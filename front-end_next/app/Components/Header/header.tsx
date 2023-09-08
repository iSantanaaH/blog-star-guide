import React from "react";
import { ImFacebook, ImYoutube, ImTwitter } from "react-icons/im";
import Link from "next/link";

const header = () => {
  return (
    <header className="bg-white fixed z-10 w-full">
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
        <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
          <input type="text" className="input-text" placeholder="Search..." />
        </div>
        <div className="shrink w-80 sm:order-2">
          <a className="font-bold uppercase text-3xl">A estrela guia</a>
        </div>
        <div className="w96 order-3 flex justify-center">
          <div className="flex gap-6 sm:mr-4">
            <Link href={"/"}>
              <ImFacebook color="#888888" />
            </Link>
            <Link href={"/"}>
              <ImTwitter color="#888888" />
            </Link>
            <Link href={"/"}>
              <ImYoutube color="#888888" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
