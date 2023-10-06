import Link from "next/link";
import Image from "next/image";
import Author from "../Child/author";

const OtherPosts = () => {
  return (
    <section className="container mx-auto md:px-20 py-16 sml:pl-2">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">Outros posts</h1>
          <div className="flex flex-col gap-6">
            {Posts()}
            {Posts()}
            {Posts()}
            {Posts()}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">
            Linha do tempo
          </h1>
          <div className="flex flex-col gap-6">
            {Posts()}
            {Posts()}
            {Posts()}
            {Posts()}
          </div>
        </div>
      </div>
    </section>
  );
};
export default OtherPosts;

const Posts = () => {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={"/"}>
          <Image
            src={"/images/img5.png"}
            width={300}
            height={250}
            alt="Picture Blog"
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={"/"}>
            <span className="text-orange-600 hover:text-orange-800">
              Criado em:
            </span>
          </Link>
          <Link href={"/"}>
            <span className="text-gray-800 hover:text-gray-600">
              {" "}
              Agosto, 28 2023{" "}
            </span>
          </Link>
        </div>
        <div className="title">
          <Link href={"/"}>
            <p className="text-xl font-bold text-gray-800 hover:text-gray-600 mr-6">
              Navegando Pelos Caminhos da Inspiração e Sabedoria
            </p>
          </Link>
        </div>
        <Author>
            
        </Author>
      </div>
    </div>
  );
};
