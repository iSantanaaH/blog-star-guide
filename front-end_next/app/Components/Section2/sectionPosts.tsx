"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Author from "../Child/author";
import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: number;
  titule: string;
  content: string;
  date_created: string;
  data_change: string;
  comments: string;
  user_id: string;
}

const SectionPosts = () => {
  const [latestPostState, setLatestPostState] = useState<Post[]>([]);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await axios.get("http://localhost:3333/latestpost");
        if (response.status === 200) {
          const responseData = response.data;
          setLatestPostState(responseData);
        }
      } catch (error: any) {
        console.error("Erro ao obter o último post", error.message);
      }
    };
    fetchLatestPost();
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-10 sml:p-4 sml639:p-4 sm639:p-4 md:p-4">
      <h1 className="font-bold text-4xl py-12 text-center">Mais recente</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {latestPostState.map((post) => (
          <div key={post.id}>
            <LatestPost post={post} />
          </div>
        ))}

        {/* {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()} */}
      </div>
    </section>
  );
};

export default SectionPosts;

const LatestPost = ({ post }: { post: Post }) => {
  return (
    <div className="item sml:flex sml:flex-col sml:justify-center sml:items-center">
      <div className="images">
        <Link href={"/"}>
          <Image
            src={"/images/img4.png"}
            width={450}
            height={350}
            alt="Picture Blog"
            className="rounded-sm"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4 sml:py-2"></div>

      <div className="title">
        <div className="cat sml:pb-1 sml:flex sml:justify-start sml:items-start">
          <Link href={"/"}>
            <span className="text-orange-600 hover:text-orange-800">
              Criado em:
            </span>
          </Link>
          <Link href={"/"}>
            <span className="text-gray-800 hover:text-gray-600">
              {" "}
              {/* Agosto, 28 2023 */}
              {post.date_created}
            </span>
          </Link>
        </div>
        <Link href={"/"}>
          <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
            {/* Navegando Pelos Caminhos da Inspiração e Sabedoria */}
            {post.titule}
          </p>
        </Link>
        <p className="text-gray-500 py-3">
          {/* Aqui, mergulhamos nos mistérios celestiais da inspiração e da
          sabedoria, trazendo-lhe histórias cativantes e reflexões profundas.
          Acompanhe-nos enquanto navegamos pelos intricados caminhos da
          criatividade, autoconhecimento e crescimento espiritual. */}
          {post.content}
        </p>
        <Author>

        </Author>
      </div>
    </div>
  );
};
