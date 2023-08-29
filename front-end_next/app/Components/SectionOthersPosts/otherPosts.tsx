import Link from "next/link"
import Image from "next/image"
import Author from "../Child/author"

const Posts = () => {
    return (
        <div className="flex gap-5">
            <div className="image flex flex-col justify-start">
                <Link href={"/"}>
                    <Image
                        src={"/images/img1.jpg"}
                        width={300}
                        height={250}
                        alt="Picture Blog"
                        className="rounded"
                    />
                </Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link href={"/"}>
                        <span className="text-orange-600 hover:text-orange-800">
                            Spiritual Reflections
                        </span>
                    </Link>
                </div>
                <div className="title">
                    <Link href={"/"}>
                        <p className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
                            You can be better every day if you let it.
                        </p>
                    </Link>
                </div>
                <Author>

                </Author>
            </div>
        </div>
    )
}


const OtherPosts = () => {
    return (
        <section className="container mx-auto md:px-20 py-16">
            <div className="grid lg:grid-cols-2">
                <div className="item">
                    <h1 className="font-bold text-4xl py-12 text-center">Others Posts</h1>
                    <div className="flex flex-col gap-6">
                        {Posts()}
                    </div>
                </div>
                <div className="item">

                </div>
            </div>
        </section>
    )
}

export default OtherPosts;