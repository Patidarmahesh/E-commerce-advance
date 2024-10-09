import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Pages/OfferDetails/offer.css";
import { useCart } from "../../Context/Cart";
import { useTheme } from "../../Context/Theme";

const CommenCard = ({
  name,
  description,
  slug,
  price,
  _id,
  show,
  quantity,
}) => {
  const Navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [theme, setTheme] = useTheme();

  return (
    <div
      className="card m-2 flip-cardssss"
      style={{
        width: "20rem",
        background: theme ? "white" : "black",
        color: theme ? "black" : "white",
      }}
    >
      <div style={{ width: "100%", height: "280px" }}>
        <img
          className="card-img-top"
          src={`http://localhost:8000/api/product/product-photo/${_id}`}
          alt={name}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="card-body">
        <Typography id="texthedaing">
          Name :<Typography>{name}</Typography>{" "}
        </Typography>
        <Typography id="texthedaing">
          Description :<Typography>{description.substring(0, 15)}</Typography>{" "}
        </Typography>
        <Typography id="texthedaing">
          Quantity :<Typography>{quantity}</Typography>{" "}
        </Typography>
        <Typography id="texthedaing">
          Price :
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "red", fontSize: "22px" }}>$</span>
            {price}
          </Typography>
        </Typography>
        <div className="d-flex justify-content-center gap-4">
          {show ? (
            <button
              className="btn btn-primary w-50"
              onClick={() => Navigate(`/card-details/${slug}`)}
            >
              More Details
            </button>
          ) : (
            <button
              className={`btn btn-primary  ${show ? "w-50" : "w-100"}`}
              onClick={() => Navigate(`/card-details/${slug}`)}
            >
              More Details
            </button>
          )}
          {show && (
            <button
              class={`btn btn-secondary ${show ? "w-50" : "w-100"}`}
              onClick={() => {
                setCart([
                  ...cart,
                  { name, description, slug, price, quantity, _id },
                ]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([
                    ...cart,
                    { name, description, slug, price, quantity, _id },
                  ])
                );
              }}
            >
              Add To Cart
            </button>   
          )}
        </div>
      </div>
    </div>
  );
};

export default CommenCard;
