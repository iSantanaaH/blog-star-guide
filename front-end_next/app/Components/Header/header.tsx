"use client";
import React, { useEffect, useRef, useState } from "react";
import { ImFacebook, ImYoutube, ImTwitter } from "react-icons/im";
import { RxExit } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const HeaderComponent = () => {
  const [dropdown, setDropdown] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [showNameUser, setShowNameUser] = useState(false);
  const [firstNameUser, setFirstNameUser] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let token = null;

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("blogstarguide.token=")) {
        token = cookie.substring("blogstarguide.token=".length, cookie.length);
        break;
      }
    }

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const user_permission_id = decodedToken.user_permission_id;

        if (!token || user_permission_id !== 1) {
          setNewPost(false);
          setShowNameUser(false);
        } else {
          setNewPost(true);
          setShowNameUser(true);
        }

        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const firstNameUser = decodedToken.name;
          setFirstNameUser(firstNameUser);
          setShowNameUser(true);
        }
      } catch (error) {}
    }
  }, []);

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
    <header className="bg-slate-100 z-10 w-full sm639:pb-4 p-5">
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center">
        <div className="md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0">
          <input type="text" className="input-text" placeholder="Search..." />
        </div>
        <div className="shrink w-80 sm:order-2 sm639:pt-4">
          <a href="/" className="font-bold uppercase text-3xl">
          </a>
        </div>
        <div className="w96 order-3 flex justify-center sml:pb-4 sm639:pb-4">
          <div className="flex items-center gap-6 sm:mr-4">
            <span title="Facebook">
              <Link href={"/"}>
                <ImFacebook color="#888888" />
              </Link>
            </span>
            <span title="Twitter">
              <Link href={"/"}>
                <ImTwitter color="#888888" />
              </Link>
            </span>
            <span title="Youtube">
              <Link href={"/"}>
                <ImYoutube color="#888888" title="Youtube" />
              </Link>
            </span>

            <div className="relative">
              <div ref={dropdownRef} onClick={enableDropdown} className="">
                <div className="relative">
                  <span title="Conta">
                    <FaUserCircle color="#888888" />
                  </span>

                  {showNameUser && (
                    <div className="absolute left-0 mt-2">
                      <span>{firstNameUser}</span>
                    </div>
                  )}
                </div>

                {dropdown && (
                  <div
                    className={`flex flex-col absolute right-2 top-5 bg-slate-200 p-3 rounded-md w-28`}
                  >
                    <div className="absolute right-0 top-0 w-4 h-4 border-t-2 border-r-2 border-solid border-zinc-500 border-opacity-75"></div>
                    <Link
                      className="links-navBar w-full mb-1"
                      href={"/pages/login"}
                    >
                      Login
                    </Link>
                    <Link
                      className="links-navBar mb-1"
                      href={"/pages/register"}
                    >
                      Cadastrar
                    </Link>
                    {newPost && (
                      <Link className="links-navBar" href={"/pages/createpost"}>
                        Novo Post
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <span title="Sair">
                <Link href={"/"}>
                  <RxExit color="#888888" />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
