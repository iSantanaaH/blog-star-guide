import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type AuthorProps = {
  children: ReactNode;
};

const Author = ({ children }: AuthorProps) => {
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
          <span className="text-md font-bold text-gray-800 hover:text-gray-600 ">
            Autor
          </span>
        </Link>
        <span className="text-sm text-gray-500">Escrevendo...</span>
        {children}
      </div>
    </div>
  );
};

export default Author;
