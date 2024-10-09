import React, { useEffect, useState } from "react";
import { getRequest } from "../Api-handler/Api-handler";

const useCategory = () => {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    const response = await getRequest("/api/category/get-category");
    if (response) {
      setCategory(response);
    } else {
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  return category;
};

export default useCategory;
