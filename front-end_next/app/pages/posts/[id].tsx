import Author from "@/app/Components/Child/author";
import Related from "@/app/Components/Child/related";
import Format from "@/layout/format";
import Image from "next/image";

import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  content: string;
  date_created: Date;
  date_change: Date;
  comments: string;
  user_id: number;
}

const SectionMostRecent = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get("http://localhost:3333/posts/${id}");

          if (response.status === 200) {
            const postData = response.data;
            setPost(postData);
          }
        } catch (error: any) {
          console.error("Fala no fetch:", error.message);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return (
      <div>
        <p>Carregando...</p>
      </div>
    );
  }

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
            {post.title};
          </h1>
          <p className="text-gray-500 text-xl text-center">
            {/* Muito longe, atrás da palavra montanhas, voe, então voe alto */}
            {post.content}
          </p>

          <div className="py-10">
            <Image src={"/images/img1.png"} width={900} height={600} alt={""} />
          </div>

          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
            <p>
              Lorem ipsum dolor sit amet. Aut eveniet doloremque et blanditiis
              nisi sit ducimus aliquam! Aut itaque asperiores sit exercitationem
              voluptatem sit nostrum placeat id impedit corporis et quod
              temporibus est magnam natus.
            </p>
          </div>
        </div>

        <Related></Related>
      </section>
    </Format>
  );
};

export default SectionMostRecent;
