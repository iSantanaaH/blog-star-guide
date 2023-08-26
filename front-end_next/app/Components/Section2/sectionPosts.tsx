import React from "react";
import Link from "next/link";
import Image from "next/image";
import Author from "../Child/author";

const SectionPosts = () => {
  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Post</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
        {latestPost()}
      </div>
    </section>
  );
};

export default SectionPosts;

const latestPost = () => {
  return (
    <div className="item">
      <div className="images">
        <Link href={"/"}>
          <Image
            src={"/images/img1.jpg"}
            width={500}
            height={350}
            alt="Picture Blog"
            className="rounded-sm"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4"></div>
      <div className="cat">
        <Link href={"/"}>
          <span className="text-orange-600 hover:text-orange-800">
            Spiritual Reflections
          </span>
        </Link>
      </div>
      <div className="title">
        <Link href={"/"}>
          <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
            You can be better every day if you let it.
          </p>
        </Link>
        <p className="text-gray-500 py-3">
          even the almighty pointing unchecked over the blind texts is an almost
          unorthographic life one day however a small line of blind text by the
          name of Lorem ipsum decided to depart for the distant world of grammar
        </p>
        <Author>

        </Author>
      </div>
    </div>
  );
};
