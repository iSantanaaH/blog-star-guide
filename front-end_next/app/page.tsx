import Format from '@/layout/format';
import Section1 from './Components/Section1/section1';
import SectionPosts from './Components/Section2/sectionPosts';
import MostPopular from './Components/MostPopular/mostPopular';


export default function Home() {
  return (
    <Format>
      <Section1></Section1>
      <SectionPosts></SectionPosts>
      <MostPopular></MostPopular>
    </Format>
  )
};