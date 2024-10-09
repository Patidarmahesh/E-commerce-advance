import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout/Layout";
import { useParams } from "react-router-dom";
import { getRequest } from "../Api-handler/Api-handler";
import CommenCard from "../Component/commencard";
import { Typography } from "@mui/material";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "../Context/Theme";

const CategoriesProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(true);
  const [theme] = useTheme();
  const params = useParams();

  const getProductBycategories = async () => {
    const response = await getRequest(
      `/api/product/product-categories/${params.slug}`
    );
    if (response) {
      setProducts(response.response);
      setCategory(response.category);
    } else {
    }
  };

  useEffect(() => {
    getProductBycategories();
  }, [params.slug]);

  return (
    <Layout>
      <div className="p-3">
        <div className="card p-4 gap-4" style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
          <div className="card p-4" style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
            <Fade direction="right">
              <div className="card_container6 d-flex justify-content-center">
                <div
                  className="card w-50 d-flex justify-content-center align-items-center flex-direction-column"
                  style={{ height: "150px",background:theme ? "white" : "black",}}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: "black",
                      display: "flex",
                      gap: "6px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textDecoration: "underline",
                      marginBottom: "8px",
                      color:theme ? "black" : "white"
                    }}
                  >
                    Single Category :
                    <Typography variant="h4" sx={{ fontWeight: "bold",color:theme ? "black" : "white"}}>
                      {category.name}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "10px",
                      color:theme ? "black" : "white"
                    }}
                  >
                    result :{" "}
                    <Typography
                      variant="h5"
                      sx={{ textDecoration: "none", color: "green" }}
                    >
                      ({products.length})
                    </Typography>
                  </Typography>
                </div>
              </div>
            </Fade>
          </div>
          <div className="card p-2" style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
            <div className="d-flex flex-wrap justify-content-start gap-4">
              {products?.map((values) => {
                const { name, description, slug, price, quantity } = values;
                return (
                  <CommenCard
                    name={name}
                    description={description}
                    slug={slug}
                    price={price}
                    _id={values._id}
                    show={show}
                    quantity={quantity}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesProduct;
