import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type AuthorProps = {
  children: ReactNode;
};

const Author = ({ children }: AuthorProps) => {
  return (
    <div className="author flex py-5">
      <Image src={'/images/author/author1.jpg'} width={80} height={60} alt="" className="rounded-full" />
      <div className="flex flex-col justify-center px-4">
        <Link href={'/'}>
          <span className="text-md font-bold text-gray-800 hover:text-gray-600 ">
            Flying High
          </span>
        </Link>
        <span className="text-sm text-gray-500">Writing</span>
        {children}
      </div>
    </div>
  )
}

export default Author;