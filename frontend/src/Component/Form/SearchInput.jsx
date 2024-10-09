import React from "react";
import { useSearch } from "../../Context/Search";
import { getRequest } from "../../Api-handler/Api-handler";
import { useNavigate } from "react-router-dom";
import ThemeEComerec from "../theme-e-comerce/ThemeEComerec";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event) {
      const response = await getRequest(
        `/api/product/search/${search.keyword}`
      );
      setSearch({ ...search, results: response });
      navigate("/search");
    }
  };
  return (
    <form
      className="form-inline d-flex gap-2"
      style={{ width: "53%"}}
      onSubmit={handleSubmit}
    >
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search here...."
        aria-label="Search"
        style={{ fontSize: "18px",width:"60%"}}
        value={search.keyword}
        onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
      />
      <button
        style={{ width: "32%", fontSize: "18px" }}
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
      >
        Search
      </button>
      <ThemeEComerec/>
    </form>
  );
};

export default SearchInput;
