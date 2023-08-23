import React from 'react'
import Image from 'next/image';

const section1 = () => {
  return (
    <section className='py-16'>
        <div className='container mx-auto md:px20'>
            <h1 className='font-bold text-4xl pb-12 text-center'>Trending</h1>
            {Slide()}
        </div>
    </section>
  )
}

export default section1;

const Slide = () => {
    return (
      <div className='grid md:grid-cols-2'>
        <div className='image'>
        <Image src={'/images/img1.jpg'} width={600} height={600} alt='Picture Blog' />
        </div>
        <div className='info'>

        </div>
      </div>  
    )
}