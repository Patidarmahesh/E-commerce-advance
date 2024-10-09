import React from "react";
import { useForm } from "react-hook-form";
import { PostRequest } from "../../Api-handler/Api-handler";
import { useAuth } from "../../Context/Auth";
import Swal from "sweetalert2";

const CategoryForm = ({ getdata }) => {
  const [auth] = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const category = async (values) => {
    const response = await PostRequest(
      "/api/category/create-category",
      values,
      {
        headers: {
          "content-type": "application/json",
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
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit(category)}>
      <div className="mb-3">
        <input
          {...register("name")}
          error={!!errors?.name}
          placeholder="Enter New Category"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-50">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
