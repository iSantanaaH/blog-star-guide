import React from "react";
import Link from "next/link";
import Image from "next/image";

const SectionPosts = () => {
  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Post</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
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
            width={600}
            height={600}
            alt="Picture Blog"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        
      </div>
    </div>
  );
};
