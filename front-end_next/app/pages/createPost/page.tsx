"use client";
import Format from "@/layout/format";
import axios from "axios";
import { useRef, SyntheticEvent } from "react";
import { ToastContainer, toast } from "react-toastify";

const CreatePost = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);

      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const response = await axios.post(
        "http://localhost:3333/createpost",
        formDataObject,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        formRef.current?.reset();

        const notifySucessCreatePost = () => {
          toast("Post criado com sucesso!");
        };

        notifySucessCreatePost();

        console.log(response.data);
      }
    } catch (error: any) {
      console.error("Alguns campos estão errados", error.message);
    }
  }

  return (
    <Format>
      <section className="container py-16 mx-auto md:px-2 md:w-10/12">
        <div className="containerNotify">
          <ToastContainer />
        </div>

        <form method="POST" onSubmit={handleSubmit} ref={formRef}>
          <div className="flex justify-center py-10">
            <h1 className="font-bold text-4xl text-center pb-5">
              Criar Novo Post
            </h1>
          </div>

          <div className="flex justify-center">
            <div className="pb-8 flex justify-between items-center">
              <label htmlFor="titule" className="text-lg font-semibold mx-5">
                Titulo do post
              </label>
              <input
                type="text"
                id="titule"
                name="titule"
                className="input-post mt-2 row-span-2"
                placeholder="Titulo do post"
              />
            </div>
          </div>

          <div className="container flex justify-center">
            <div className="w-2/4">
              <label
                htmlFor="description"
                className="text-lg font-semibold flex pb-4"
              >
                Descrição do post
              </label>
              <textarea
                className="mt-2 w-ful sm:w-full"
                id="description"
                name="content"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center py-10">
            <div className="flex items-center flex-col">
              <label className="text-lg pb-3">Importar imagem</label>
              <input type="file" id="image" className="mt-2" />
            </div>
          </div>

          <div className="flex justify-center py-5">
            <button type="submit" className="button-form">
              Criar Post
            </button>
          </div>
        </form>
      </section>
    </Format>
  );
};

export default CreatePost;
