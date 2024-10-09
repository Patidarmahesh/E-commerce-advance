import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/AdminMenu";
import { deleteRequest, getRequest } from "../../Api-handler/Api-handler";
import CategoryForm from "../../Component/Form/Category";
import { useAuth } from "../../Context/Auth";
import { Table, Button } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
});

const CreateCateory = () => {
  const [category, setCategory] = useState([]);
  const [auth, setAuth] = useAuth();

  // GETDATA || GETDATA
  const getdata = async () => {
    const response = await getRequest("/api/category/get-category");
    if (response) {
      setCategory(response);
    } else {
    }
  };
  // GETDATA || GETDATA

  // DELETEDATA || DELETEDATA
  const deleteCat = async (pid) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteRequest(
            "/api/category/delete-category/",
            pid,
            auth.token
          );
          if (response) {
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
            getdata();
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

  // DELETEDATA || DELETEDATA

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
                Manage Categories Admin
              </h1>
              <div className="p-3 w-50" style={{ marginLeft: "-13px" }}>
                <CategoryForm getdata={getdata} />
              </div>
              <div>
                <Table
                  bordered
                  shadow={false}
                  aria-label="Example pagination  table"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                    // background:"#7828C8"
                    backgroundImage: "linear-gradient(#1F0A33,#41EC8B,#1F0A33)",
                  }}
                  selectionMode="multiple"
                >
                  <Table.Header>
                    <Table.Column>NAME</Table.Column>
                    <Table.Column>
                      <DeleteIcon sx={{ color: "#1F0A33", fontSize: "35px" }} />
                    </Table.Column>
                    <Table.Column>
                      <ModeEditIcon
                        sx={{ color: "#1F0A33", fontSize: "35px" }}
                      />
                    </Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {category?.map((values, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell
                            css={{ color: "black", fontSize: "20px" }}
                          >
                            {" "}
                            {values.name}
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              bordered
                              color="gradient"
                              auto
                              onClick={() => deleteCat(values._id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              bordered
                              color="gradient"
                              auto
                            >
                              <ModeEditIcon />
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                  <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={3}
                    onPageChange={(page) => console.log({ page })}
                  />
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCateory;
