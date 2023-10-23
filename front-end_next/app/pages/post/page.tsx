import Author from "@/app/Components/Child/author";
import Related from "@/app/Components/Child/related";
import Format from "@/layout/format";
import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function PostSectionMostRecent() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({ title: "", content: "", date_created: Date, date_chenge: Date, comments: "", user_id: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3333/posts/${id}`)
          const responseData = response.data;
          setPost(responseData);
        }
      } catch (error: any) {
        console.log("Erro ao buscar detalhes da postagem:", error.message);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author>

          </Author>
        </div>

        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            {/* Aqui, mergulhamos nos mistérios celestiais da inspiração e da
            sabedoria. */}
            {post.title}
          </h1>
            <p className="text-gray-500 text-xl text-center">
              {/* Muito longe, atrás da palavra montanhas, voe, então voe alto */}
              {post.content}
              </p>

            <div className="py-10">
                <Image src={'/images/img1.png'} width={900} height={600} alt={''} />
            </div>

            <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            <p>Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem voluptatem sit nostrum placeat id impedit corporis et quod temporibus est magnam natus.</p>
            </div>
        </div>

        <Related></Related>
      </section>
    </Format>
  );
};

export default PostSectionMostRecent;
