import React from "react";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./homecategory.css";
import { useTheme } from "../../Context/Theme";

const data = [
  {
    _id: 1,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/50379f65f7b59622.png?q=100",
    name: "Top Offers",
  },
  {
    _id: 2,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0a0243119f02f7a5.png?q=100",
    name: "Mobiles & Tablets",
  },
  {
    _id: 3,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/da4491af4ee551d6.png?q=100",
    name: "Electronics",
  },
  {
    _id: 4,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/3a39bad95503b051.png?q=100",
    name: "TVs & Appliances",
  },
  {
    _id: 5,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/f7b2a4eeb35a8c9f.png?q=100",
    name: "Fashion",
  },
  {
    _id: 6,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e83a5f27b01d9a7e.png?q=100",
    name: "Beauty",
  },
  {
    _id: 7,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/aecfaba5969b96dd.png?q=100",
    name: "Grocery",
  },
  {
    _id: 8,
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/4e0bdf8567ecb960.png?q=100",
    name: "Furniture",
  },
];

const HomeCategoryitem = () => {
  const [theme] = useTheme();
  return (
    <div
      style={{
        border: "0px solid red",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        justifyItems: "center",
        width: "100%",
        boxShadow: "0 8px 6px -6px gray",
        webkitBoxShadow: theme ? "0 8px 6px -6px gray" : "",
        borderBottom: "0.3px solid gray !important",
        background: theme ? "white" : "black",
      }}
      // className="bg-light"
    >
      <div className="grocery_container">
        {data.map((values) => {
          return (
            <NavLink
              to={`/offer/${values._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="hovercard">
                <Avatar
                  src={values.image}
                  sx={{ width: "100px", height: "100px" }}
                />
                <Typography
                  sx={{ fontWeight: "bold", color: theme ? "black" : "white" }}
                >
                  {values.name}
                </Typography>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCategoryitem;
