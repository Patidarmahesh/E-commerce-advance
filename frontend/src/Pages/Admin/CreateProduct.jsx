import React, { useEffect, useState } from "react";
import AdminMenu from "../../Component/Layout/AdminMenu";
import Layout from "../../Component/Layout/Layout";
import { PostRequest, getRequest } from "../../Api-handler/Api-handler";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/Auth";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const { Option } = Select;

const CreateProduct = () => {
  const [category, setCategory] = useState([]);
  // const [head, setHead] = useState(true);
  const navegate = useNavigate();
  const [auth] = useAuth();
  const {
    register,
    reset,
    control,
    handleSubmit,
  } = useForm();

  // GETDATA || GETDATA
  const getdata = async () => {
    const response = await getRequest("/api/category/get-category");
    if (response) {
      setCategory(response);
    } else {
    }
  };
  // GETDATA || GETDATA

  // ADDDATA || ADDDATA
  const addProduct = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("photo", values.photo[0]);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("shiping", values.shiping);
    const response = await PostRequest(
      "/api/product/create-product",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: auth.token,
        },
      }
    );
    if (response) {
      Swal.fire({
        icon: "Good job!",
        title: "You clicked the button!",
        icon: "success",
        timer: 1500,
      });
      reset();
      getdata();
      navegate("/dashbored/admin/product");
    } else {
    }
  };
  // ADDDATA || ADDDATA

  useEffect(() => {
    getdata();
  }, []);

  return (
    <Layout>
      <div>
        <div className="m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1
                style={{
                  color: "white",
                  textShadow:
                    "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
                }}
              >
                Create Product For Admin
              </h1>
              <div
                className="m-1 w-75"
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  background: "gray",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                <form onSubmit={handleSubmit(addProduct)}>
                  <Controller
                    render={({ field: { ...restField } }) => (
                      <Select
                        bordered={false}
                        placeholder="Select A Category"
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        name="category"
                        {...restField}
                      >
                        {category.map((values) => {
                          return (
                            <Option value={values._id} key={values._id}>
                              {values.name}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                    name="category"
                    control={control}
                  />
                  <div className="mb-3">
                    <label className="btn btn-outline-secondry border-black col-md-12">
                      <input
                        type="file"
                        name="photo"
                        {...register("photo")}
                        accept="images/*"
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className="form-control"
                      name="name"
                      {...register("name")}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter Description"
                      className="form-control"
                      name="description"
                      {...register("description")}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      placeholder="Enter Price"
                      className="form-control"
                      name="price"
                      {...register("price")}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      placeholder="Enter Quantity"
                      className="form-control"
                      name="quantity"
                      {...register("quantity")}
                    />
                  </div>
                  <Controller
                    render={({ field: { ...restField } }) => (
                      <Select
                        bordered={false}
                        placeholder="Select A Shiping"
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        name="shipping"
                        {...restField}
                      >
                        <Option value="0">NO</Option>
                        <Option value="1">YES</Option>
                      </Select>
                    )}
                    name="category"
                    control={control}
                  />
                  <div
                    className="mb-3 d-flex"
                    style={{
                      border: "0px solid red",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button className="btn btn-primary w-50" type="submit">
                      CREATE PRODUCT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
