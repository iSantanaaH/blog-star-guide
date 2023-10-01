import Link from "next/link";
import Image from "next/image";
import Author from "./author";

const Related = () => {
  return (
    <section className="pt-20">
      <h1 className="font-bold text-3xl py-10">Relacionados</h1>
      <div className="flex flex-col gap-10">
        {Posts()}
        {Posts()}
        {Posts()}
        {Posts()}
      </div>
    </section>
  );
};

export default Related;

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
