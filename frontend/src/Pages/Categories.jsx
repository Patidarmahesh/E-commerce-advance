import React from "react";
import Layout from "../Component/Layout/Layout";
import useCategory from "../hooks/useCategory";
import "../Pages/OfferDetails/offer.css";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "../Context/Theme";

const Categories = () => {
  const category = useCategory();
  const Navigate = useNavigate();
  const [theme] = useTheme();
  return (
    <Layout>
      <div className="cateegories_container">
        <div className="card p-4" style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
            <Fade direction="right"><Typography
              variant="h3"
              sx={{
                color: "white",
                textShadow:
                  "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
                  textDecoration:"underline",
                  textAlign:"center",
                  marginBottom:"14px"
              }}
            >
              All Categories
            </Typography>
            </Fade>
          <div className="card p-4" style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
            <div className="categories_rap_content">
              {category.map((value) => {
                return (
                  <div
                    className="card card_design"
                    onClick={() => Navigate(`/categories/${value.slug}`)}
                  >
                    {value.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
