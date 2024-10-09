import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout/Layout";
import ItemsCarousel from "react-items-carousel";
import { useParams } from "react-router-dom";
import { getRequestOfSingleProduct } from "../Api-handler/Api-handler";
import { Typography } from "@mui/material";
import { Button } from "@nextui-org/react";
import "./OfferDetails/offer.css";
import { Fade } from "react-awesome-reveal";
import CommenCard from "../Component/commencard";
import { useTheme } from "../Context/Theme";
import { useCart } from "../Context/Cart";

const CardDetail = () => {
  const [product, setProduct] = useState([]);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [show, setShow] = useState(true);
  const params = useParams();
  const [theme] = useTheme();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 50;
  const [cart, setCart] = useCart();

  const slides2 = [
    {
      slug: "iphone-13-pro-max",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "iphone-13-pro-max",
      image:
        "https://gocdkeys.com/images/captures/iphone-13-pro-max-smartphone-1.jpg",
    },
    {
      slug: "iphone-13-pro-max",
      image: "https://i.ytimg.com/vi/Vj_aWLOzgMY/maxresdefault.jpg",
    },
    {
      slug: "iphone-14-pro-max",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "iphone-14-pro-max",
      image:
        "https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2021/06/13/iPhone-13-Pro-Max-phien-ban-hong-ruc-bat-ngo-xuat-hien_1.jpg",
    },
    {
      slug: "iphone-14-pro-max",
      image:
        "https://img.android.com.pl/images/user-images/2021/06/Purple-iPhone-12-Pro-Max-2048x2048.jpeg",
    },
    {
      slug: "iphone-12-pro-max",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "iphone-12-pro-max",
      image:
        "https://m-cdn.phonearena.com/images/article/130912-wide-two_1600/Apples-iPhone-13-5G-is-still-on-track-for-a-September-release.jpg",
    },
    {
      slug: "iphone-12-pro-max",
      image:
        "https://img.android.com.pl/images/user-images/2021/06/Purple-iPhone-12-Pro-Max-2048x2048.jpeg",
    },
    {
      slug: "iphone-12-mini",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "iphone-12-mini",
      image:
        "https://m-cdn.phonearena.com/images/article/130912-wide-two_1600/Apples-iPhone-13-5G-is-still-on-track-for-a-September-release.jpg",
    },
    {
      slug: "iphone-12-mini",
      image:
        "https://img.android.com.pl/images/user-images/2021/06/Purple-iPhone-12-Pro-Max-2048x2048.jpeg",
    },
    {
      slug: "iphone-11-pro",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "iphone-11-pro",
      image:
        "https://m-cdn.phonearena.com/images/article/130912-wide-two_1600/Apples-iPhone-13-5G-is-still-on-track-for-a-September-release.jpg",
    },
    {
      slug: "iphone-11-pro",
      image:
        "https://img.android.com.pl/images/user-images/2021/06/Purple-iPhone-12-Pro-Max-2048x2048.jpeg",
    },
    {
      slug: "iphone-10",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "iphone-10",
      image:
        "https://m-cdn.phonearena.com/images/article/130912-wide-two_1600/Apples-iPhone-13-5G-is-still-on-track-for-a-September-release.jpg",
    },
    {
      slug: "iphone-10",
      image:
        "https://img.android.com.pl/images/user-images/2021/06/Purple-iPhone-12-Pro-Max-2048x2048.jpeg",
    },
    {
      slug: "Apple-MacBook-Air",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Apple-MacBook-Air",
      image:
        "https://dygtyjqp7pi0m.cloudfront.net/i/40779/35026833_1.jpg?v=8D76DFF8F99E490",
    },
    {
      slug: "Apple-MacBook-Air",
      image:
        "https://static.decalgirl.com/assets/items/mb318/800/mb318-wht-marble.5.jpg",
    },
    {
      slug: "ASUS-Vivobook-S-15-2022",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "ASUS-Vivobook-S-15-2022",
      image:
        "https://ru.gecid.com/data/nouts/201912020800-58132/img/01_asus_vivobook_15_x512fl.jpg",
    },
    {
      slug: "ASUS-Vivobook-S-15-2022",
      image:
        "https://www.asus.com/us/site/vivobook/assets/images/img/vivo/kv-1.png",
    },
    {
      slug: "Dell-Inspiron-7420",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Dell-Inspiron-7420",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/7/KH/EJ/JV/3630597/dell-inspiron-7420-2-in-1-500x500.jpeg",
    },
    {
      slug: "Dell-Inspiron-7420",
      image:
        "https://techstoriesindia.in/wp-content/uploads/2022/06/Dell-Inspiron-7420-D560829WIN9S-Laptop.jpeg",
    },
    {
      slug: "ASUS-TUF-Gaming-F15",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "ASUS-TUF-Gaming-F15",
      image:
        "https://pccircle.com/wp-content/uploads/2021/05/dash2-1200x120016Apr210028.jpg",
    },
    {
      slug: "ASUS-TUF-Gaming-F15",
      image:
        "https://cdn.shopify.com/s/files/1/0192/2088/9664/products/img5360.jpg?v=1621964714",
    },
    {
      slug: "HP-Victus-Gaming-Laptop",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "HP-Victus-Gaming-Laptop",
      image:
        "https://www.lowyat.net/wp-content/uploads/2021/08/hp-victus-16-malaysia-05.jpg",
    },
    {
      slug: "HP-Victus-Gaming-Laptop",
      image:
        "https://i0.wp.com/laptopmedia.com/wp-content/uploads/2021/09/71Bn0AfyTpL._AC_SL1500_.jpg?fit=1500%2C1255&ssl=1",
    },
    {
      slug: "MacBook-Pro-Laptop-M2",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "MacBook-Pro-Laptop-M2",
      image:
        "https://www.ilounge.com/wp-content/uploads/2021/01/macbook-pro-m1-2020-hero-scaled.jpg",
    },
    {
      slug: "MacBook-Pro-Laptop-M2",
      image: "https://i.ebayimg.com/images/g/wvAAAOSwnmxfiyab/s-l640.jpg",
    },
    {
      slug: "WebOS-Smart-LED-TV",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "WebOS-Smart-LED-TV",
      image: "https://www.bdstall.com/asset/product-image/giant_77779.jpg",
    },
    {
      slug: "WebOS-Smart-LED-TV",
      image:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6344/6344507_rd.jpg",
    },
    {
      slug: "Redmi-108-cm",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Redmi-108-cm",
      image:
        "https://images.firstpost.com/wp-content/uploads/2021/03/redmi-tv-1280.jpg",
    },
    {
      slug: "Redmi-108-cm",
      image:
        "https://trashbox.ru/ifiles/1110317_32783c_hype-ru-mi-tv-4s8-5pej2gbs5zn0un4mtjamzrk/2019-07-26-redmi-tv-certification-3.jpeg",
    },
    {
      slug: "HUIDI-140-cm",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "HUIDI-140-cm",
      image: "https://m.media-amazon.com/images/I/51Io4batQGL.jpg",
    },
    {
      slug: "HUIDI-140-cm",
      image: "https://m.media-amazon.com/images/I/71KDd4zsIaL._SL1440_.jpg",
    },
    {
      slug: "Kodak-80-cm",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Kodak-80-cm",
      image:
        "https://buydekhke.com/wp-content/uploads/2019/12/kodak-80cm-32-inch-hd-ready-led-tv32hdx900s.jpeg",
    },
    {
      slug: "Kodak-80-cm",
      image: "https://cdn.shopclues.com/images/detailed/42367/3_1491295674.jpg",
    },
    {
      slug: "Samsung-108-cm",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Samsung-108-cm",
      image:
        "https://cdn.shopclues.com/images1/detailed/109994/150810811-109994464-1601038490.jpg",
    },
    {
      slug: "Samsung-108-cm",
      image:
        "https://www.jiomart.com/images/product/420x420/492166127/samsung-108-cm-43-inch-wondertainment-series-full-hd-led-smart-tv-ua43te50aakxxl-titan-gray-2020-model-digital-o492166127-p590442120-12-202204042010.jpeg",
    },
    {
      slug: "Acer-127-cm",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Acer-127-cm",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Acer-127-cm",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Apple-Watch-SE-(2nd-Gen)",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Apple-Watch-SE-(2nd-Gen)",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Apple-Watch-SE-(2nd-Gen)",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Fire-Boltt-Phoenix-Pro-1.39",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Fire-Boltt-Phoenix-Pro-1.39",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Fire-Boltt-Phoenix-Pro-1.39",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Noise-Pulse-2-Max-1.85",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Noise-Pulse-2-Max-1.85",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Noise-Pulse-2-Max-1.85",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Samsung-Galaxy-Watch4",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Samsung-Galaxy-Watch4",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Samsung-Galaxy-Watch4",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "beatXP-Marv-Neo-1.85",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "beatXP-Marv-Neo-1.85",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "beatXP-Marv-Neo-1.85",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Fastrack-New-FS1",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Fastrack-New-FS1",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Fastrack-New-FS1",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "The-Hidden-Hindu",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "The-Hidden-Hindu",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "The-Hidden-Hindu",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Think-and-Grow-Rich",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Think-and-Grow-Rich",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Think-and-Grow-Rich",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "The-Pursuit-of-Happiness",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "The-Pursuit-of-Happiness",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "The-Pursuit-of-Happiness",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Memory",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Memory",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Memory",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "The-Mastery",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "The-Mastery",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "The-Mastery",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
    {
      slug: "Before-You-Start-Up",
      image: `http://localhost:8000/api/product/product-photo/${product._id}`,
    },
    {
      slug: "Before-You-Start-Up",
      image:
        "https://media1.popsugar-assets.com/files/thumbor/VA4XqxQR71fbB6uEUShT5Wvyz0A/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2020/11/27/789/n/1922794/fb59f0de514b8d1b_netimgQ9qyq9/i/Acer-Nitro-VG271-Pbmiipx-27-Inches-Full-HD-TV.jpg",
    },
    {
      slug: "Before-You-Start-Up",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71%2By9eQnBOL._AC_SL1500_.jpg",
    },
  ];

  //_____________GETSINGLE_PRODUCT_____________
  const getSingleProduct = async () => {
    const response = await getRequestOfSingleProduct(
      `/api/product/single-product/${params.slug}`
    );
    if (response) {
      setProduct(response);
      getSimelarProduct(response?._id, response?.category?._id);
    } else {
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params?.slug]);
  //_____________GETSINGLE_PRODUCT_____________

  //_____________GETSINGLE_PRODUCT_____________
  const getSimelarProduct = async (pid, cid) => {
    const response = await getRequestOfSingleProduct(
      `/api/product/similar-product/${pid}/${cid}`
    );
    if (response) {
      setSimilarProduct(response);
    } else {
    }
  };
  //_____________GETSINGLE_PRODUCT_____________

  // ____________SLIDER2_FILTER_DATA____________
  const filterData = slides2.filter((value) => {
    return value.slug === params.slug;
  });
  // ____________SLIDER2_FILTER_DATA____________

  console.log("/////", product);
  const { name, description, price, quantity, slug, _id } = product;

  return (
    <Layout>
      <div style={{ padding: "14px" }}>
        <div
          className="card p-4 gap-4"
          style={{
            background: theme ? "white" : "black",
            color: theme ? "black" : "white",
          }}
        >
          <div
            className="card"
            style={{
              background: theme ? "white" : "black",
              color: theme ? "black" : "white",
            }}
          >
            <div className="d-flex">
              <div className="carousal-container">
                <div style={{ padding: `0 ${chevronWidth}px` }}>
                  <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={1}
                    gutter={20}
                    leftChevron={
                      <button className="carousal-button1">{"<"}</button>
                    }
                    rightChevron={
                      <button className="carousal-button">{">"}</button>
                    }
                    outsideChevron
                    chevronWidth={chevronWidth}
                  >
                    {filterData?.map((values, index) => {
                      return (
                        <div key={index} className="card p-2 single-card">
                          <img
                            src={values.image}
                            alt="name"
                            className="card-image"
                          />
                        </div>
                      );
                    })}
                  </ItemsCarousel>
                </div>
              </div>
              <div
                style={{
                  height: "415px",
                  width: "60%",
                  padding: "14px",
                }}
              >
                <div
                  className="card card-deatilsss"
                  style={{
                    background: theme ? "white" : "black",
                    color: theme ? "black" : "white",
                  }}
                >
                  <Fade direction="right">
                    <Typography
                      variant="h3"
                      sx={{
                        color: "white",
                        textShadow:
                          "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
                      }}
                    >
                      .................Products Details...................
                    </Typography>
                  </Fade>

                  <div className="p-4" id="card-div">
                    <Typography id="texthedaing">
                      Name :<Typography>{product.name}</Typography>{" "}
                    </Typography>
                    <Typography id="texthedaingdiscription">
                      Description :
                      <Typography>{product.description}</Typography>
                    </Typography>
                    <Typography id="texthedaing">
                      Price :
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <span style={{ color: "red", fontSize: "22px" }}>
                          $
                        </span>
                        {product.price}
                      </Typography>
                    </Typography>
                    {/* <Typography id="texthedaing">
                      Category :{" "}
                      <Typography>{product.category.slug}</Typography>
                    </Typography> */}
                    <Typography id="texthedaing">
                      Quantity : <Typography>{product.quantity}</Typography>
                    </Typography>
                    <Button
                      color="gradient"
                      auto
                      ghost
                      css={{ width: "260px", height: "50px", fontSize: "20px" }}
                      onClick={() => {
                        setCart([...cart, { name, description, price, quantity, slug, _id }]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, { name, description, price, quantity, slug, _id }])
                        );
                      }}
                    >
                      Add Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card"
            style={{
              background: theme ? "white" : "black",
              color: theme ? "black" : "white",
            }}
          >
            <Fade direction="left">
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  textShadow:
                    "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
                  marginTop: "10px",
                }}
              >
                .....................................Simelar
                Products...........................................
              </Typography>
            </Fade>
            <div className="d-flex flex-wrap justify-content-between p-4">
              {similarProduct?.map((values) => {
                const { name, description, slug, price } = values;
                return (
                  <Fade direction="right">
                    <CommenCard
                      name={name}
                      description={description}
                      slug={slug}
                      price={price}
                      _id={values._id}
                      show={show}
                    />
                  </Fade>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CardDetail;
