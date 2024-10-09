import React from "react";
import "./offer.css";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "../../Context/Theme";

const OfferCard = ({
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  name,
}) => {
  const [theme] = useTheme();
  return (
    <div
      class="card gap-3 p-3"
      style={{
        background: theme ? "white" : "black",
        color: theme ? "black" : "white",
      }}
    >
      <Fade direction="left">
        <h1 className="heading">{name}</h1>
      </Fade>
      <Fade cascade damping={0.5}>
        <div className="card_container">
          <img src={image1} alt="error" className="card_image" />
        </div>
      </Fade>
      <Fade cascade damping={0.5}>
        <div className="image_container">
          <div className="single_card">
            <img src={image2} alt="error" className="card_image" />
          </div>

          <div className="single_card">
            <img src={image3} className="card_image" alt="error" />
          </div>
        </div>
      </Fade>
      <Fade cascade damping={0.5}>
        <div style={{ display: "flex", gap: "14px" }}>
          <div className="single_card">
            <img src={image4} className="card_image" alt="error" />
          </div>
          <div className="single_card">
            <img src={image5} className="card_image" alt="error" />
          </div>
        </div>
      </Fade>
      <Fade cascade damping={0.5}>
        <div className="heading_card">
          <img src={image6} className="card_image" alt="error" />
        </div>
      </Fade>
      <Fade cascade damping={0.5}>
        <div className="heading_card">
          <img src={image7} className="card_image" alt="error" />
        </div>
      </Fade>
    </div>
  );
};

export default OfferCard;
