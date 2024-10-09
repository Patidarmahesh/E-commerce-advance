import React from "react";
import Layout from "../Component/Layout/Layout";
import HomeMiddleContent from "../Component/homemiddlecontent";
import HomeCategoryitem from "../Component/homecategoryitem/HomeCategoryitem";
import CarousalBanner from "../Component/carousalBanner/CarousalBanner";

const Home = () => {
  
  return (
    <Layout>
      <HomeCategoryitem />
      <CarousalBanner />
      <HomeMiddleContent/>
    </Layout>
  );
};

export default Home;
