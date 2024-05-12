import "../home.css";
import Intro from "../components/Intro";
import FeaturePost from "../components/FeaturePost";
import GoNext from "../components/GoNext";
import Slider from "../components/Slider";
import RelatedPost from "../components/RelatedPost";


function Home() {
  return (
    <div className="App">
      <Intro />
      <div className="list_post">
        <FeaturePost />
        
      </div>
      <GoNext />
      <Slider/>
      <RelatedPost />
    </div>
  );
}

export default Home;
