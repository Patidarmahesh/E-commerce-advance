import React, { useEffect } from "react";
import Layout from "../../Component/Layout/Layout";
import UserMenu from "../../Component/Layout/UserMenu";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/Auth";
import { PutRequest } from "../../Api-handler/Api-handler";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const profileUser = async (values) => {
    const response = await PutRequest("/api/auth/profile", values, {
      headers: {
        "content-type": "application/json",
        Authorization: auth.token,
      },
    });
    console.log(response);
    if (response) {
      setAuth({ ...auth, user: response });
      let locaalStor = localStorage.getItem("auth");
      locaalStor = JSON.parse(locaalStor);
      locaalStor.user = response;
      console.log("locaalStor.user",locaalStor.user);
      localStorage.setItem("auth", JSON.stringify(locaalStor));
    } else {
    }
  };

  useEffect(() => {
    const { name, email } = auth?.user;
    setValue("name", name);
    setValue("email", email);
  }, [auth?.user]);

  return (
    <Layout>
      <div className="p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div
            className="col-md-9"
            style={{
              border: "0px solid red",
              height: "450px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="card register" style={{ width: "40%",backgroundImage: "linear-gradient(green, pink,gray,brown,green)"}}>
              <div className="Login">
                <h2>User Profile</h2>
                <form
                  className="Loginform"
                  onSubmit={handleSubmit(profileUser)}
                >
                  <div className="textbox">
                    <input
                      type="name"
                      {...register("name")}
                      placeholder="UserName"
                    />
                  </div>
                  <div className="textbox">
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="email"
                      disabled
                    />
                  </div>

                  <div className="textbox">
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="Password"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: "100%", fontSize: "18px", padding: "14px" }}
                    className="btn btn-outline-success my-sm-0"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
