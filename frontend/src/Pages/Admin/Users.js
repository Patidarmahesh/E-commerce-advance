import React from "react";
import AdminMenu from "../../Component/Layout/AdminMenu";
import Layout from "../../Component/Layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div style={{ height: "536px" }}>
        <div className="m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>All Users</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
