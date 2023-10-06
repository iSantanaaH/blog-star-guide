"use client";
import Image from "next/image";
import Link from "next/link";
import Author from "../Child/author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const section1 = () => {
  SwiperCore.use([Autoplay]);

  const bg = {
    background: "url('images/banner3.png')no-repeat transparent",
    backgroundPosition: "right",
  };

  return (
    <section className="py-16 sm:bg-none sml:p-2">
      <div className="container mx-auto md:px20">
        <h1 className="font-bold text-4xl py-10 text-center">
          Reflexão do dia
        </h1>

        <Swiper
          speed={1000}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>{Slide()}</SwiperSlide>
          <SwiperSlide>{Slide()}</SwiperSlide>
          <SwiperSlide>{Slide()}</SwiperSlide>
          <SwiperSlide>{Slide()}</SwiperSlide>
          <SwiperSlide>{Slide()}</SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default section1;

const Slide = () => {
  return (
    <div className="grid md:grid-cols-2 sm:gap-10">
      <div className="image">
        <Link href={"/"}>
          <Image
            src={"/images/img1.png"}
            width={600}
            height={600}
            alt="Picture Blog"
            priority
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
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
            <p className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600 ">
              Navegando Pelos Caminhos da Inspiração e Sabedoria
            </p>
          </Link>
        </div>
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
