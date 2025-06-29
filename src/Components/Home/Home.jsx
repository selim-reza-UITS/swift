import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Superpower from "./Superpower";
import bannerImg from "../../assets/bannerImage.png";
import Pay from "./Pay";
import Footer from "./Footer";
import bannerImg2 from "../../assets/backgroundImage-3.png";
import bannerImg3 from "../../assets/bg-banner3.png";
import Contact from "./Contact";
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div
        className="h-auto bg-center bg-cover   p-4"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <Banner></Banner>
        <Superpower></Superpower>
      </div>
      <div
        className="h-auto bg-center bg-cover   p-4"
        style={{ backgroundImage: `url(${bannerImg3})` }}
      >
        <Pay></Pay>
      </div>
            <div
        className="h-auto bg-center bg-cover   p-4"
        style={{ backgroundImage: `url(${bannerImg2})` }}
      >
      <Contact></Contact>
      </div>
  
      <Footer></Footer>
    </div>
  );
};

export default Home;
