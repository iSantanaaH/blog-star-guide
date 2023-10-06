import Format from "@/layout/format";
import Section1 from "./Components/Section1/sectionIntroBlogSlide";
import SectionPosts from "./Components/Section2/sectionPosts";
import MostPopular from "./Components/MostPopular/sectionMostPopular";
import OtherPosts from "./Components/SectionOthersPosts/othersPosts";
import { AuthProvider } from "./contexts/AuthContext";

export default function Home() {
  return (
    <div className="sml:overflow-hidden">
      <Format>
        <AuthProvider>
          <Section1></Section1>
          <SectionPosts></SectionPosts>
          <MostPopular></MostPopular>
          <OtherPosts></OtherPosts>
        </AuthProvider>
      </Format>
    </div>
  );
}
