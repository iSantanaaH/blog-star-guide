import Link from "next/link";
import { ImFacebook, ImYoutube, ImTwitter } from "react-icons/im";
import Newslatter from "../Child/newslatter";


const ComponentFooter = () => {
    return (
        <section className="bg-gray-50">
            <Newslatter></Newslatter>
            <div className="container mx-auto flex justify-center py-12">
                <div className='py-5'>
                    <div className='flex gap-6 justify-center'>
                        <Link href={"/"}>
                            <ImFacebook color="#888888" />
                        </Link>
                        <Link href={"/"}>
                            <ImTwitter color="#888888" />
                        </Link>
                        <Link href={"/"}>
                            <ImYoutube color="#888888" />
                        </Link>
                    </div>

                    <p className="py-5 text-gray-400">&copy; Criado por Micael Santana</p>
                </div>
            </div>
        </section>
    )
}

export default ComponentFooter;