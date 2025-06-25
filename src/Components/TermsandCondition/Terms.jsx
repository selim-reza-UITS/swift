import React from "react";
import Navbar from "../Home/Navbar";
import TermsHeader from "./TermsHeader";
import Footer from "../Home/Footer";
import NavbarShare from "../Shared/NavbarShare";
import TermsandCondition from "./TermsandCondition";
import bannerImg from "../../assets/bannerImage.png";

const Terms = () => {
  return (
    <div className="">
      <NavbarShare></NavbarShare>
      <div
        className="h-auto bg-center bg-cover   p-4"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <TermsHeader></TermsHeader>
        <TermsandCondition></TermsandCondition>
        {/* <ResourceBanner></ResourceBanner> */}
      </div>

      {/* <ResourcesSection></ResourcesSection>
              
         */}
      <Footer></Footer>
    </div>
  );
};

export default Terms;
