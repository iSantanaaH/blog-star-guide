"use client"
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";

type AuthorProps = {
  children: ReactNode;
};

const Author = ({ children }: AuthorProps) => {
  // const [userName, setUserName] = useState(null);

  // useEffect(() => {
  //   const cookies = document.cookie.split(";");
  //   let token = null;

  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].trim();

  //     if (cookie.startsWith("blogstarguide.token=")) {
  //       token = cookie.substring("blogstarguide.token=".length, cookie.length);
  //       break;
  //     }
  //   }

  //   if (token) {
  //     try {
  //       const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //       const user_permission_id = decodedToken.user_permission_id;

  //       if (!token || user_permission_id !== 1) {
  //       } else {
  //       }

  //       if (token) {
  //         const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //         const fullNameUser = decodedToken.fullName;
  //         setUserName(fullNameUser);
  //       }
  //     } catch (error) {}
  //   }
  // }, []);

  return (
    <div className="author flex py-5">
      <figure>
        <Image
          src={"/images/author/author2.jpg"}
          width={50}
          height={60}
          style={{ width: "auto", height: "auto" }}
          alt="Imagem do autor"
          className="rounded-full"
        />
      </figure>

      <div className="flex flex-col justify-center px-4">
        <Link href={"/"}>
        <span className="text-md font-bold text-gray-800 hover:text-gray-600 ">Ana Karita</span>
        </Link>
        <span className="text-sm text-gray-500">...</span>
        {/* <Link href={"/"}>
          
            {userName !== null ? (
              <>
          <span className="text-md font-bold text-gray-800 hover:text-gray-600 ">
            {userName}
          </span>
              </>
            ) : (
              <span className="text-md font-bold text-gray-800 hover:text-gray-600 ">Desconhecido</span>
            )}
        </Link>

        {userName !== null ? (
          <>
          <span className="text-sm text-gray-500">Fundador</span>
          </>
        ) : (
          <span className="text-sm text-gray-500">...</span>
        )} */}
        {children}
      </div>
    </div>
  );
};

export default Author;
