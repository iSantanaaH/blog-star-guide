import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Author from "@/app/Components/Child/author";
import Related from "@/app/Components/Child/related";
import Format from "@/layout/format";

export default function PostSectionMostRecent({ params }: { params: { id: string } }) {
  const { id } = params;
  const [post, setPost] = useState({
    title: "",
    content: "",
    date_created: Date,
    date_change: Date,
    comments: "",
    user_id: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3333/posts/${id}`);
          const responseData = response.data.rows;
          setPost(responseData);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          if (error.response.data && error.response.data.error) {
          }
          console.log("Erro ao buscar detalhes da postagem:", error.message);
        }
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author>
            
          </Author>
        </div>

        <div className="post py-10">
          <div className="py-10">
            <Image src={"/images/img1.png"} width={900} height={600} alt={""} />
          </div>
          <h1 className="font-bold text-4xl text-center pb-5">{post.title}</h1>
          <p className="text-gray-500 text-xl text-center">{post.content}</p>
        </div>

        <Related></Related>
      </section>
    </Format>
  );
}
