import Format from '@/layout/format';
import Section1 from './Components/Section1/sectionIntroBlogSlide';
import SectionPosts from './Components/Section2/sectionPosts';
import MostPopular from './Components/MostPopular/sectionMostPopular';
import OtherPosts from './Components/SectionOthersPosts/othersPosts';
import HeaderHome from './Components/HeaderHome/headerHome';

export default function Home() {
  return (
    <Format>
      <HeaderHome />
      <Section1></Section1>
      <SectionPosts></SectionPosts>
      <MostPopular></MostPopular>
      <OtherPosts></OtherPosts>
    </Format>
  )
};