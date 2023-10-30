"use client";
import Author from "@/app/Components/Child/author";
import Related from "@/app/Components/Child/related";
import Format from "@/layout/format";
import axios from "axios";
import Image from "next/image";

import React, { useEffect, useState } from "react";

export default function PostSectionMostRecent({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [post, setPost] = useState({
    title: "",
    content: "",
    date_created: Date,
    date_chenge: Date,
    comments: "",
    user_id: "",
  });

  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3333/posts/${id}`);
          const responsePostData = response.data.rows;
          const responseImagePathData = response.data.imagePath;
          const baseUrl = `http://localhost:3333`;
          const imagePath = `${baseUrl}/${responseImagePathData}`;
          setPost(responsePostData);
          setImage(imagePath);
        }
      } catch (error: any) {
        console.log("Erro ao buscar detalhes da postagem:", error.message);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2 flex flex-col items-center">
        <div className="flex justify-center">
          <Author>
            
          </Author>
        </div>
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">{post.title}</h1>
        </div>
        <div className="py-10">
          {image && (
            <Image
              src={image}
              width={700}
              height={600}
              alt={"Imagem do post"}
            />
          )}
        </div>
        <div className="post py-10">
          <p className="content text-gray-600 text-lg flex flex-col gap-4">
            {post.content}
          </p>
        </div>
        <Related></Related>
      </section>
    </Format>
  );
}
