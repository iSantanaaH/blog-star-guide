"use client";
import Format from "@/layout/format";
import axios from "axios";
import { useRef, SyntheticEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const ContentTextareaRef = useRef<HTMLTextAreaElement | null>(null);


  function notifySucessCreatePost() {
    toast("Postagem concluída!");
  }

  function notifyErrorCreatePost(message: string) {
    toast.error(`Erro: ${message}`);
  }

  
  function handleResizeContentTextarea() {
    const textarea = ContentTextareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let token = null;

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("blogstarguide.token=")) {
        token = cookie.substring("blogstarguide.token=".length, cookie.length);
        break;
      }
    }

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      const formData = new FormData(formRef.current as HTMLFormElement);

      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const cookies = document.cookie.split(";");
      let token = null;

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("blogstarguide.token=")) {
          token = cookie.substring(
            "blogstarguide.token=".length,
            cookie.length
          );
          break;
        }
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.post(
        "http://localhost:3333/createpost",
        formDataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        // formRef.current?.reset();
        notifySucessCreatePost();

      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        if (error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
          notifyErrorCreatePost(errorMessage);
        }
      }
    }
  }

  return (
    <Format>
      <section className="container py-16 mx-auto md:px-2 md:w-10/12">
        <div className="containerNotify">
          <ToastContainer />
        </div>

        <form
          method="POST"
          onSubmit={handleSubmit}
          ref={formRef}
          className="bg-slate-200 rounded-2xl"
          encType="multipart/form-data"
        >
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
                name="title"
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
                ref={ContentTextareaRef}
                onChange={handleResizeContentTextarea}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center py-10">
            <div className="flex items-center flex-col">
              <label className="text-lg pb-3">Importar imagem</label>
              <input type="file" name="image" id="image" className="mt-2" />
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
