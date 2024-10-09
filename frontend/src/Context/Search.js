import React, { createContext, useContext, useState, useEffect } from "react";

export const Search = createContext();

const SearchContext = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });
  return (
    <Search.Provider value={[search, setSearch]} >{children}</Search.Provider>
  );
};

export const useSearch = () => useContext(Search);

export default SearchContext;
