import React from "react";
import Layout from "../../Component/Layout/Layout";
import UserMenu from "../../Component/Layout/UserMenu";
import { useAuth } from "../../Context/Auth";

const UserDashbored = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-flue m-3 p-3">
        <div className="row">
          <div className="col-3">
            <UserMenu />
          </div>
          <div className="col-9">
            <div className="card w-75 p-3">
              <h3>Name:{auth?.user?.name}</h3>
              <h3>Email:{auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashbored;
