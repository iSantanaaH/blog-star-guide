import Format from "@/layout/format";

const CreatePost = () => {
  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-10/12">
        <div className="flex justify-center py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            Criar Novo Post
          </h1>
        </div>

        <div className="flex justify-center py-10 flex-wrap">
          <div className="px-4 md:flex md:justify-center md:items-center">
            <form action="">
            <input type="text" className="input-text" placeholder="Titulo do post" />
            <input type="text" className="input-text" placeholder="Descrição do post" />
            <label>Importar imagem</label>
            <input type="file"  />
            </form>
          </div>
        </div>
      </section>
    </Format>
  );
};

export default CreatePost;
