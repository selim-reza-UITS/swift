import React from "react";
import NavbarShare from "../Shared/NavbarShare";
import PrivacyHeader from "./PrivacyHeader";
import PrivacyandPolicy from "./PrivacyandPolicy";
import Footer from "../Home/Footer";
import bannerImg from "../../assets/bannerImage.png";
const Privacy = () => {
  return (
    <div className="">
      <NavbarShare></NavbarShare>
      <div
        className="h-auto bg-center bg-cover   p-4"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <PrivacyHeader></PrivacyHeader>
        <PrivacyandPolicy></PrivacyandPolicy>
        {/* <ResourceBanner></ResourceBanner> */}
      </div>

      {/* <ResourcesSection></ResourcesSection>
              
         */}
      <Footer></Footer>
    </div>
  );
};

export default Privacy;
