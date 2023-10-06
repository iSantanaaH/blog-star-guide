"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import Author from "../Child/author";

const MostPopular = () => {
  return (
    <section className="container mx-auto md:px-20 py-16 sml:p-4 sml639:p-4 sm639:p-4 md:p-4">
      <h1 className="font-bold text-4xl py-12 text-center">Mais popular</h1>

      <Swiper spaceBetween={50} slidesPerView={1}>
        <SwiperSlide>{SlideListMostPopular()}</SwiperSlide>
        <SwiperSlide>{SlideListMostPopular()}</SwiperSlide>
        <SwiperSlide>{SlideListMostPopular()}</SwiperSlide>
        <SwiperSlide>{SlideListMostPopular()}</SwiperSlide>
      </Swiper>
    </section>
  );
};

export default MostPopular;

const SlideListMostPopular = () => {
  return (
    <div className="item">
      <div className="images">
        <Link href={"/"}>
          <Image
            src={"/images/img3.png"}
            width={600}
            height={400}
            alt="Picture Blog"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4"></div>
      <div className="cat">
        <Link href={"/"}>
          <span className="text-orange-600 hover:text-orange-800">
            Criado em:
          </span>
        </Link>
        <Link href={"/"}>
          <span className="text-gray-800 hover:text-gray-600">
            {" "}
            Agosto, 28 2023{" "}
          </span>
        </Link>
      </div>
      <div className="title">
        <Link href={"/"}>
          <p className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
            Navegando Pelos Caminhos da Inspiração e Sabedoria
          </p>
        </Link>
        <p className="text-gray-500 py-3">
          Aqui, mergulhamos nos mistérios celestiais da inspiração e da
          sabedoria, trazendo-lhe histórias cativantes e reflexões profundas.
          Acompanhe-nos enquanto navegamos pelos intricados caminhos da
          criatividade, autoconhecimento e crescimento espiritual.
        </p>
        <Author>
          
        </Author>
      </div>
    </div>
  );
};
