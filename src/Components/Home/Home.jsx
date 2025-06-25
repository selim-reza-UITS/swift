import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Superpower from "./Superpower";
import bannerImg from "../../assets/bannerImage.png";
const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div   className="h-auto bg-center bg-cover   p-4"
      style={{ backgroundImage: `url(${bannerImg})` }}>
    <Banner></Banner>
      <Superpower></Superpower>
      </div>
  
    </div>
  );
};

export default Home;
