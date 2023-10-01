import React from "react";
import Link from "next/link";
import Image from "next/image";
import Author from "../Child/author";

const SectionPosts = () => {
  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Mais recente</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
      </div>
    </section>
  );
};

export default SectionPosts;

const latestPost = () => {
  return (
    <div className="item">
      <div className="images">
        <Link href={"/"}>
          <Image
            src={"/images/img4.png"}
            width={300}
            height={350}
            alt="Picture Blog"
            className="rounded-sm"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4"></div>
      <div className="cat">
        <Link href={"/"}>
          <span className="text-orange-600 hover:text-orange-800">
            Criado em:
          </span>
        </Link>
        <Link href={"/"}>
          <span className="text-gray-800 hover:text-gray-600">
            {" "}
            Agosto, 28 2023
          </span>
        </Link>
      </div>
      <div className="title">
        <Link href={"/"}>
          <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
            Navegando Pelos Caminhos da Inspiração e Sabedoria
          </p>
        </Link>
        <p className="text-gray-500 py-3">
          Aqui, mergulhamos nos mistérios celestiais da inspiração e da
          sabedoria, trazendo-lhe histórias cativantes e reflexões profundas.
          Acompanhe-nos enquanto navegamos pelos intricados caminhos da
          criatividade, autoconhecimento e crescimento espiritual.
        </p>
        <Author>
          
        </Author>
      </div>
    </div>
  );
};
