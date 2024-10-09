import React, { useState } from "react";
import { useSearch } from "../Context/Search";
import Layout from "../Component/Layout/Layout";
import "../Pages/OfferDetails/offer.css";
import CommenCard from "../Component/commencard";
import { Fade } from "react-awesome-reveal";

const SearchData = () => {
  const [search] = useSearch();
  const [show, setShow] = useState(true);
  return (
    <Layout>
      <div className="search_container">
        <div className="card card_middle_content">
          <div className="card card_single text-center">
            <Fade direction="left"><h1
              style={{
                color: "white",
                textShadow:
                  "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
                  textDecoration:"underline"
              }}
            >
              Search Product For Name
            </h1>
            </Fade>
            <div className="card_single">
              {search?.results?.map((values) => {
                const { name, description, slug, price, quantity, _id } =
                  values;
                return (
                  <CommenCard
                    key={_id}
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

export default SearchData;
