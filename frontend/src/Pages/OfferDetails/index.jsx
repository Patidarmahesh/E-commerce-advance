import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import { useParams } from "react-router-dom";
import OfferCard from "./OfferCard";

const data = [
  {
    _id: 1,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/50379f65f7b59622.png?q=100",
    name: "Top Offers",
  },
  {
    _id: 2,
    image1:
      "https://cdn.wccftech.com/wp-content/uploads/2021/03/iPhone-13-Pro-matte-black-3.jpg",
    name: "Mobile Phones Big Saving Days",
    image2:
      "https://www.thaqfny.com/wp-content/uploads/2021/07/%D9%85%D9%88%D8%A7%D8%B5%D9%81%D8%A7%D8%AA-iphone-13-pro-max-2.jpg",
    image3: "https://i.ytimg.com/vi/5bgWxMGnlvc/maxresdefault.jpg",
    image4: "https://dktechhindi.in/wp-content/uploads/2020/11/iphone-13.png",
    image5:
      "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/03/iPhone-13-1TB.png",
    image6:
      "https://static.jumia.com.ng/cms/external/pet/AP044MT1EWAWANAFAMZ/ddd2bf77997019f578ac3c354e645f6b.jpg",
    image7:
      "https://rukminim2.flixcart.com/fk-p-flap/844/140/image/f3528e0c6093609b.jpg?q=50",
  },
  {
    _id: 3,
    image1:
      "https://www.freewebheaders.com/wp-content/gallery/computer/girl-and-laptop-computer-technology-website-header.jpg",
    name: "Big Saving Days - Electronics Store Sale",
    image2:
      "https://www.apemockups.com/wp-content/uploads/edd/2020/09/Free-MacBook-iPad-and-iPhone-Mockup-1.png",
    image3: "https://i.pinimg.com/originals/fa/4c/b4/fa4cb43bd7174da77acd8ed31db1971f.jpg",
    image4: "https://i1.wp.com/techpatio.com/wp-content/uploads/2016/02/apple-devices-macbook-laptop-ipad-tablet-iphone-smartphone-desk.jpg",
    image5:
      "https://i.pinimg.com/originals/d9/f6/09/d9f6095a9990e4fb40e6a8566aa5d54e.jpg",
    image6:
      "https://s.yimg.com/hz/en_us/Finance/US_AFTP_SILICONALLEY_H_LIVE/Apple_could_make_the_iPad-aed07479d602b2b77a5f80dc0b105102",
    image7:
      "https://i0.wp.com/fashionandstylepolice.com/wp-content/uploads/2016/10/computer-823613_1280.jpg?ssl=1",
  },
  {
    _id: 4,
    image1:
      "https://hisense.dclook.com/assets/listing_banner/uled-8k-tv-u80g-banner.jpg",
    name: "TVs & Appliances",
    image2:
      "https://www.lg.com/ph/images/TV/features/OLED-and-SuperUHD-Web-Banner-v1.jpg",
    image3: "https://allindiaservicecentre.in/wp-content/uploads/2018/03/LED-TV-Banner.jpg",
    image4: "http://www.lg.com/sg/images/TV/features/Alpha9_Banner_D.jpg",
    image5:
      "https://www.sony.com.au/microsite/iptv2/images/IPTV_banner_15.jpg",
    image6:
      "http://www.rokuki.com/wp-content/uploads/2018/05/2018TCLlineup.jpg",
    image7:
      "https://i.pinimg.com/originals/2d/9b/cd/2d9bcd94ecc4861fb3eb4d60c3130ea1.jpg",
  },
  {
    _id: 5,
    image1:
      "https://www.designhill.com/design-blog/wp-content/uploads/2017/07/fashion-banner.jpg",
    name: "Fashion Of Man And Women",
    image2:
      "https://3.bp.blogspot.com/-AcY0y1_2Tj0/X1gCorMCBxI/AAAAAAAAAGc/pf2-mG0D7902_PaukCkGuu2gCO9UgJDWQCK4BGAYYCw/s1600/banner2.jpg",
    image3: "https://www.urbanebox.com/wp-content/uploads/2016/12/tamara-1.jpg",
    image4: "https://wallpapercave.com/wp/wp357124.jpg",
    image5:
      "https://2.bp.blogspot.com/-IeJq331PvX4/UptACkYWtwI/AAAAAAAAER8/AKeqHWtkOr0/s1600/Oxford-Winter-Dresses-Collection-2013-14-for-Men-and-Women-Fashion+(3).jpg",
    image6:
      "https://www.stylewithheart.com/wp-content/uploads/thought-clothing-sustainable-style-banner-2017.jpg",
    image7:
      "https://i.pinimg.com/originals/ec/6c/5a/ec6c5ab94ee1ee6c3a2a4fb9d56843e2.jpg",
  },
  {
    _id: 6,
    image1:
      "https://i.pinimg.com/originals/36/c3/0e/36c30e1b0ed6769d5d424f1f6375f22a.jpg",
    name: "Beauty For Man And Women",
    image2:
      "https://tse1.mm.bing.net/th?id=OIP.DbBqsStO9PgTNvw08B-VWwHaDc&pid=Api&P=0&h=180",
    image3: "https://thumbs.dreamstime.com/z/cosmetics-beauty-series-ads-premium-body-cream-skin-care-template-design-banners-vector-illustration-poster-placard-89886173.jpg",
    image4: "https://img.freepik.com/free-vector/natural-cosmetics-skin-care-lotion-banner_33099-1957.jpg?size=626&ext=jpg",
    image5:
      "https://img.freepik.com/free-vector/natural-beauty-banner-template_23-2148967085.jpg?size=626&ext=jpg",
    image6:
      "http://ww1.prweb.com/prfiles/2016/07/29/13587007/GIRA_BANNER_-_Lorita_Dillon_--_Amazing_Beauty_Products_REV1_APPROVED.jpg",
    image7:
      "https://static.vecteezy.com/system/resources/previews/000/962/811/original/cosmetic-advertising-banner-with-3d-bottle-set-vector.jpg",
  },
  {
    _id: 7,
    image1:
      "https://thumbs.dreamstime.com/b/coffee-banner-ads-d-illustratin-latte-woodcut-style-decorations-kraft-paper-background-coffee-banner-ads-d-197266556.jpg",
    name: "Grocery For Good Health",
    image2:
      "https://image.freepik.com/free-psd/coffee-banner-template_23-2148584138.jpg",
    image3: "https://www.pngkalas.com/wp-content/uploads/2021/06/Grocery-Banner-Design-Template-1.jpg",
    image4: "https://image.freepik.com/free-psd/super-grocery-sale-web-banner_120329-270.jpg",
    image5:
      "https://image.freepik.com/free-psd/coffee-shop-drink-menu-promotion-web-banner-template_159024-243.jpg",
    image6:
      "https://s3.envato.com/files/231930533/1200x627.jpg",
    image7:
      "https://media.istockphoto.com/vectors/laundry-detergent-banner-blank-bottle-filled-by-detergent-with-water-vector-id1211964575?k=20&m=1211964575&s=170667a&w=0&h=HTJr4v5utoNXUc8MMTLbrJDN45lPBqAWw0cAyVj59nU=",
  },
  {
    _id: 8,
    image1:
      "https://waltonbd.com/image/catalog/new_website/category_banner/eap/fan/ceiling_fan/ceiling-fan-banner.jpg",
    name: "Furniture For Home And Decor",
    image2:
      "https://i.pinimg.com/originals/44/54/be/4454be65e10033a600f68b69310c8fa6.png",
    image3: "https://img.freepik.com/free-psd/modern-furniture-web-banner-template_157884-482.jpg?size=626&ext=jpg",
    image4: "https://image.freepik.com/free-psd/furniture-banner-template-style_23-2148646142.jpg",
    image5:
      "https://img.freepik.com/free-psd/minimal-furniture-web-banner-template_237398-121.jpg?size=626&ext=jpg",
    image6:
      "https://graphicsfamily.com/wp-content/uploads/edd/2020/12/Furniture-Web-Banner-Design-1180x664.jpg",
    image7:
      "https://media.gettyimages.com/vectors/home-decor-furniture-banner-vector-id1140569385",
  },
];

const OfferDetails = () => {
  const [filterData, setFilterData] = useState([]);
  const params = useParams();

  const offerFilterData = () => {
    let offer = data.find((values) => values._id == params.id);
    setFilterData([offer]);
    console.log(filterData);
  };

  useEffect(() => {
    offerFilterData();
  }, [params.id]);

  return (
    <Layout>
      <div
        style={{
          width: "100%",
          padding: "8px",
        }}
      >
        {filterData?.map((values) => {
          const {
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
            image7,
            name,
          } = values;
          return (
            <OfferCard
              image1={image1}
              image2={image2}
              image3={image3}
              image4={image4}
              image5={image5}
              image6={image6}
              image7={image7}
              name={name}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default OfferDetails;
