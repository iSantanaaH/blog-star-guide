"use client"
import Image from 'next/image';
import Link from 'next/link';
import Author from '../Child/author';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const section1 = () => {

    SwiperCore.use([Autoplay])

    const bg = {
        background: "url('images/banner.png')no-repeat",
        backgroundPosition: "right"
    }

    return (
        <section className='py-16' style={bg}>
            <div className='container mx-auto md:px20'>
                <h1 className='font-bold text-4xl pb-12 text-center'>Star Blog</h1>

                <Swiper
                    speed={700}
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
    )
}

export default section1;

const Slide = () => {
    return (
        <div className='grid md:grid-cols-2 sm:gap-10'>
            <div className='image'>
                <Link href={'/'}>
                    <Image src={'/images/img1.jpg'} width={600} height={600} alt='Picture Blog' />
                </Link>
            </div>
            <div className='info flex justify-center flex-col'>
                <div className='cat'>
                    <Link href={'/'}>
                        <span className='text-orange-600 hover:text-orange-800'>Spiritual Reflections</span>
                    </Link>
                </div>
                <div className='title'>
                    <Link href={'/'}>
                        <p className='text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600'>You can be better every day if you let it.</p>
                    </Link>
                </div>
                <p className='text-gray-500 py-3'>
                    even the almighty pointing unchecked over the blind texts is an almost unorthographic life one day however a small line of blind text by the name of Lorem ipsum decided to depart for the distant world of grammar
                </p>
                <Author>

                </Author>
            </div>
        </div>
    )
}