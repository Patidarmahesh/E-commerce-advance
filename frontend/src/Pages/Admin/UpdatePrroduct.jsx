import React, { useEffect, useState } from "react";
import AdminMenu from "../../Component/Layout/AdminMenu";
import Layout from "../../Component/Layout/Layout";
import {
  PutRequest,
  deleteRequest,
  getRequest,
  getRequestOfSingleProduct,
} from "../../Api-handler/Api-handler";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/Auth";
import { Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const { Option } = Select;

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
});

const UpdatePrroduct = () => {
  const [category, setCategory] = useState([]);
  const [id, setId] = useState("");
  const [count, setCount] = useState(3);
  const params = useParams();
  const navegate = useNavigate();
  const [auth] = useAuth();
  const { register, reset, control, handleSubmit, setValue } = useForm();

  // GETSINGLEPRODUCT || GETSINGLEPRODUCT
  const getSingleProduct = async () => {
    const response = await getRequestOfSingleProduct(
      `/api/product/single-product/${params.slug}`
    );
    if (response) {
      setValue("name", response.name);
      setValue("category", response.category._id);
      setValue("description", response.description);
      setValue("price", response.price);
      setValue("quantity", response.quantity);
      setValue("photo", response.photo);
      setId(response._id);
    } else {
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  // GETSINGLEPRODUCT || GETSINGLEPRODUCT

  // GETDATA || GETDATA
  const getdata = async () => {
    const response = await getRequest("/api/category/get-category");
    if (response) {
      setCategory(response);
    } else {
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  // GETDATA || GETDATA

  // UPDATEPRODUCT || UPDATEPRODUCT
  const updateProduct = async (values) => {
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("photo", values.photo[0]);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("shiping", values.shiping);
    const response = await PutRequest(
      `/api/product/product-update/${id}`,
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
        title: "You clicked the button Update Product!",
        icon: "success",
        timer: 1500,
      });
      reset();
      getdata();
      navegate("/dashbored/admin/product");
    } else {
    }
  };
  // UPDATEPRODUCT || UPDATEPRODUCT

  // DELETEPRODUCT || DELETEPRODUCT
  const deleteProduct = async () => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this Product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteRequest(
            "/api/product/product-delete/",
            id,
            auth.token
          );
          if (response) {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
            getdata();
            navegate("/dashbored/admin/product");
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  // DELETEPRODUCT || DELETEPRODUCT

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
                Update Product For Admin
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
                <form onSubmit={handleSubmit(updateProduct)}>
                  <Controller
                    render={({ field: { ...restField } }) => (
                      <Select
                        bordered={false}
                        placeholder="Select A Category"
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        name="category"
                        value={category?.name}
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
                        placeholder="Select A Category"
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
                      gap: "4rem",
                    }}
                  >
                    <button className="btn btn-dark w-50 p-2" type="submit">
                      UPDATE PRODUCT
                    </button>
                    <button
                      className="btn btn-dark w-50"
                      onClick={deleteProduct}
                    >
                      DELETE PRODUCT
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

export default UpdatePrroduct;
