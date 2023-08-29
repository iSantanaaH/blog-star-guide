import Format from '@/layout/format';
import Section1 from './Components/Section1/sectionIntroBlogSlide';
import SectionPosts from './Components/Section2/sectionPosts';
import MostPopular from './Components/MostPopular/sectionMostPopular';
import OtherPosts from './Components/SectionOthersPosts/otherPosts';


export default function Home() {
  return (
    <Format>
      <Section1></Section1>
      <SectionPosts></SectionPosts>
      <MostPopular></MostPopular>
      <OtherPosts></OtherPosts>
    </Format>
  )
};