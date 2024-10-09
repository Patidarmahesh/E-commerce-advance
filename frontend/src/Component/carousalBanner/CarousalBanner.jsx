import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const data = [
//   {
//     image:"https://i.pinimg.com/originals/ef/80/83/ef8083bfe79088dc00bd8eca9c821cd5.jpg"
//   },
//   {
//     image:"https://1.bp.blogspot.com/-Q9IM-thLFhc/TbXkPVeJgXI/AAAAAAAABOs/wN3CEDxS8aA/s1600/iphone_banner.png"
//   },
//   {
//     image:"https://tse2.mm.bing.net/th?id=OIP.RYNeaXTVwGFLWXTvtR9-3gHaB6&pid=Api&P=0&h=180"
//   },
//   {
//     image:"https://tse2.mm.bing.net/th?id=OIP.RYNeaXTVwGFLWXTvtR9-3gHaB6&pid=Api&P=0&h=180"
//   }
// ]

const CarousalBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ border: "0px solid red",marginTop:"20px",width:"97.5%",marginLeft:"13px",marginBottom:"1.4rem"}}>
      <Slider {...settings}>
        <div style={{ width: "100%"}}>
          <div
            style={{ width: "100%", height: "260px"}}
          >
            <img
              src="https://i.pinimg.com/originals/ef/80/83/ef8083bfe79088dc00bd8eca9c821cd5.jpg"
              style={{ width: "100%", height: "100%" }}
              alt="error"
            />
          </div>
        </div>
        <div style={{ width: "100%"}}>
          <div
            style={{ width: "100%", height: "250px"}}
          >
            <img
              src="http://1.bp.blogspot.com/-VgYkNDeH_bI/TbXkQaUNjYI/AAAAAAAABOw/kwCB4Wm0yO0/s1600/iphone-banner.jpg"
              style={{ width: "100%", height: "100%" }}
              alt="error"
            />
          </div>
        </div><div style={{ width: "100%"}}>
          <div
            style={{ width: "100%", height: "250px"}}
          >
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.RYNeaXTVwGFLWXTvtR9-3gHaB6&pid=Api&P=0&h=180"
              style={{ width: "100%", height: "100%" }}
              alt="error"
            />
          </div>
        </div>
        <div style={{ width: "100%"}}>
          <div
            style={{ width: "100%", height: "250px"}}
          >
            <img
              src="https://luxurywatchbuyer.com/wp-content/uploads/2015/04/banner-2.png"
              style={{ width: "100%", height: "100%" }}
              alt="error"
            />
          </div>
        </div>
        
      </Slider>
    </div>
  );
};

export default CarousalBanner;
