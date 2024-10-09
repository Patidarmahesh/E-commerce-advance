import React, { useEffect, useState } from "react";
import { Checkbox, Radio } from "antd";
import { price } from "../Price/Price.js";
import { Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import CommenCard from "../commencard";
import { PostRequest, getRequest } from "../../Api-handler/Api-handler";
import { useTheme } from "../../Context/Theme.js";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";


const HomeMiddleContent = () => {
  const [products, setProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [show, setShow] = useState(true);
  const [head, setHead] = useState(false);
  const [totel, setTotel] = useState(0);
  const [page, setTPage] = useState(1);
  const [theme] = useTheme();

  // GETALLPRODUCTCOUNT || GETALLPRODUCTCOUNT
  const getCountProduct = async () => {
    const response = await getRequest("/api/product/count-product");
    if (response) {
      setTotel(response);
    } else {
    }
  };
  // GETALLPRODUCTCOUNT || GETALLPRODUCTCOUNT

  // GETALLPRODUCT || GETALLPRODUCT
  const getAllProduct = async () => {
    const response = await getRequest(`/api/product/product-list/${page}`);
    if (response) {
      setProducts((prev) => [...prev, ...response]);
      setTPage((prev) => prev + 1); 
    } else {
    }
  };

  // useEffect(() => {
  //   if (!Checked.length || !radio.length) getAllProduct();
  // }, [Checked.length, radio.length, page]);
  // GETALLPRODUCT || GETALLPRODUCT

  // GETALLCATEGORY || GETALLCATEGORY
  const getAllCategory = async () => {
    const response = await getRequest("/api/category/get-category");
    if (response) {
      setCategory(response);
    } else {
    }
  };

  useEffect(() => {
    getAllCategory();
    getCountProduct();
  }, []);

  // GETALLCATEGORY || GETALLCATEGORY

  // FILTERDATABYCATEGORY || FILTERDATABYCATEGORY
  const filterData = (event, id) => {
    let allData = [...Checked];
    if (event) {
      allData.push(id);
    } else {
      allData = allData.filter((value) => value !== id);
    }
    setChecked(allData);
  };
  // FILTERDATABYCATEGORY || FILTERDATABYCATEGORY

  const PostFilterData = async () => {
    const response = await PostRequest(
      "/api/product/filter-product",
      { Checked, radio },
      head
    );
    if (response) {
      setProducts(response?.data?.response);
    } else {
      console.log("error something is wrong");
    }
  };

  useEffect(() => {
    if (Checked.length || radio.length) PostFilterData();
  }, [Checked, radio]);

  return (
    <div className="row mt-3 w-100 pb-5">
      <div className="col-md-3">
        <div
          class="card h-100"
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            marginLeft: ".5rem",
            background: theme ? "white" : "black",
          }}
        >
          <div class="card" style={{ width: "18rem",marginTop:"4rem"}}>
            <h4 class="card-header">Filter By Category</h4>
            <ul class="list-group list-group-flush">
              {Category?.map((values, index) => {
                return (
                  <li
                    key={index}
                    class="list-group-item"
                    style={{
                      background: theme ? "white" : "black",
                      color: theme ? "black" : "white",
                      border: theme ? "" : "none",
                    }}
                  >
                    <Checkbox
                      key={values._id}
                      onChange={(event) =>
                        filterData(event.target.checked, values._id)
                      }
                      style={{ color: theme ? "black" : "white" }}
                    >
                      {values.name}
                    </Checkbox>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="d-flex flex-column gap-4">
            <div class="card" style={{ width: "18rem" }}>
              <h4 class="card-header">Filter By Price</h4>
              <ul class="list-group list-group-flush">
                <Radio.Group onChange={(event) => setRadio(event.target.value)}>
                  {price?.map((values, index) => {
                    return (
                      <li
                        key={index}
                        class="list-group-item"
                        style={{
                          background: theme ? "white" : "black",
                          color: theme ? "black" : "white",
                          border: theme ? "" : "none",
                        }}
                      >
                        <div key={values._id}>
                          <Radio
                            style={{ color: theme ? "black" : "white" }}
                            value={values.array}
                          >
                            {values.name}
                          </Radio>
                        </div>
                      </li>
                    );
                  })}
                </Radio.Group>
              </ul>
            </div>
            <button
              style={{ width: "100%", fontSize: "18px" }}
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={() => window.location.reload()}
            >
              Clear All Filter
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div
          className="card pb-4"
          style={{
            background: theme ? "white" : "black",
            color: theme ? "black" : "white",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              marginLeft: "2.4rem",
              textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
            }}
          >
            All Products
          </Typography>
          <InfiniteScroll
            pageStart={page}
            loadMore={getAllProduct}
            hasMore={products.length < totel ? true : false}
            loader={
              <Stack sx={{ color: "grey.500",display:"flex",justifyContent:"center"}} spacing={2} direction="row">
                <CircularProgress color="secondary" />
                <CircularProgress color="success" />
                <CircularProgress sx={{color:"brown"}} />
              </Stack>
            }
          >
            <div
              className="d-flex flex-wrap justify-content-center gap-4"
              style={{
                background: theme ? "white" : "black",
                color: theme ? "black" : "white",
              }}
            >
              {products?.map((values, index) => {
                const { name, description, slug, price, quantity } = values;
                return (
                  <CommenCard
                    key={index}
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
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default HomeMiddleContent;
