"use client";
import React, { useEffect, useRef, useState } from "react";
import { ImFacebook, ImYoutube, ImTwitter } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const HeaderComponent = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  function enableDropdown() {
    setDropdown((prevState) => !prevState);
  }

  useEffect(() => {
    function disableDropdown(event: MouseEvent) {
      event.stopPropagation();
      const clickedElement = event.target as HTMLElement;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(clickedElement) &&
        !clickedElement.classList.contains("dropdown-link")
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", disableDropdown);

    return () => {
      document.removeEventListener("mousedown", disableDropdown);
    };
  }, []);

  return (
    <header className="bg-slate-100 z-10 w-full sm639:pb-4 p-4">
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center">
        <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
          <input type="text" className="input-text" placeholder="Search..." />
        </div>
        <div className="shrink w-80 sm:order-2 sm639:pt-4">
          <a href="/" className="font-bold uppercase text-3xl">
            A estrela guia
          </a>
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
            <div className="relative">
              <div
                ref={dropdownRef}
                onClick={enableDropdown}
                className="relative" // Adicionei esta classe para aplicar estilos relativos
              >
                <FaUserCircle color="#888888" />
                {dropdown && (
                  <div className="bg-slate-200 p-3 rounded-md absolute flex flex-col top-5 right-3 w-30">
                    {/* Seta para cima no canto superior direito */}
                    <div className="absolute right-0 top-0 w-4 h-4 border-t-2 border-r-2 border-solid border-zinc-500 border-opacity-75"></div>
                    <Link className="links-navBar mb-1 dropdown-link" href={"/"}>
                      Home
                    </Link>
                    <Link className="links-navBar w-full mb-1" href={"/pages/login"}>
                      Login
                    </Link>
                    <Link className="links-navBar mb-1" href={"/pages/register"}>
                      Cadastrar
                    </Link>
                    <Link className="links-navBar" href={"/pages/createpost"}>
                      Criar post
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
