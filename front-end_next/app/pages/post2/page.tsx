import Author from "@/app/Components/Child/author";
import Related from "@/app/Components/Child/related";
import Format from "@/layout/format";
import Image from "next/image";

const Post2 = () => {
  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author>

          </Author>
        </div>

        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            Aqui, mergulhamos nos mistérios celestiais da inspiração e da
            sabedoria.

          </h1>
            <p className="text-gray-500 text-xl text-center">Muito longe, atrás da palavra montanhas, voe, então voe alto</p>

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

export default Post2;
