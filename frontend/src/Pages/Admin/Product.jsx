import React, { useEffect, useState } from "react";
import AdminMenu from "../../Component/Layout/AdminMenu";
import Layout from "../../Component/Layout/Layout";
import { getRequest } from "../../Api-handler/Api-handler";
import { Link } from "react-router-dom";
import CommenCard from "../../Component/commencard";
import { Typography } from "@mui/material";
import { useTheme } from "../../Context/Theme";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [theme] = useTheme();

  const getdata = async () => {
    const response = await getRequest("/api/product/get-product");
    if (response) {
      setProducts(response);
    } else {
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <Layout>
      <div className="row mt-3 w-100 pb-5 p-4">
      <div className="col-md-3 card" style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
      <AdminMenu />
      </div>
      <div className="col-md-9">
        <div className="card pb-4" style={{background:theme ? "white" : "black",color:theme ? "black" : "white"}}>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              marginLeft: "2.4rem",
              textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
            }}
          >
            All Product List
          </Typography>
         
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {products?.map((values) => {
              const { name, description, slug, price, quantity } = values;
              return (
                <Link
                  key={values._id}
                  to={`/dashbored/admin/product/${slug}`}
                  style={{ textDecoration: "none", color: "black !importent" }}
                >
                  <CommenCard
                    name={name}
                    description={description}
                    slug={slug}
                    price={price}
                    _id={values._id}
                    show={show}
                    quantity={quantity}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Product;
