
export const Newslatter = () => {
  return (
    <section className="bg-grayd-50 mt-20">
        <div className="container mx-auto md:px-20 py-16 text-center">
            <h1 className="font-bold text-3xl">Receba as Novidades</h1>

            <div className="py-4">
                <input type="text" className="shadow border rounded w-9/12 px-3
                p-2
                text-gray-700 focus:outline-none focus:shadow-blue-500" placeholder="Digite seu Email"/>
            </div>
            
            <button className="bg-blue-400 px-20 py-3 rounded-full text-gray-50 text-xl">Enviar</button>
        </div>
    </section>
  )
}

export default Newslatter;