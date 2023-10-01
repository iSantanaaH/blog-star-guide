"use client";
import Format from "@/layout/format";

const CreatePost = () => {
  return (
    <Format>
      <section className="container py-16 mx-auto md:px-2 md:w-10/12">
        <div className="flex justify-center py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            Criar Novo Post
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="pb-8 flex justify-between items-center">
            <label htmlFor="titulo" className="text-lg font-semibold mx-5">
              Titulo do post
            </label>
            <input
              type="text"
              id="titulo"
              className="input-post mt-2 row-span-2"
              placeholder="Titulo do post"
            />
          </div>
        </div>

        <div className="container flex justify-center">
          <div className="w-2/4">
            <label
              htmlFor="descricao"
              className="text-lg font-semibold flex pb-4"
            >
              Descrição do post
            </label>
            <textarea className="mt-2 w-ful sm:w-full" id="default"></textarea>
          </div>
        </div>

        <div className="flex justify-center py-10">
          <div className="flex items-center flex-col">
            <label htmlFor="imagem" className="text-lg pb-3">
              Importar imagem
            </label>
            <input type="file" id="imagem" className="mt-2" />
          </div>
        </div>

        <div className="flex justify-center py-5">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Criar Post
          </button>
        </div>
      </section>
    </Format>
  );
};

export default CreatePost;
