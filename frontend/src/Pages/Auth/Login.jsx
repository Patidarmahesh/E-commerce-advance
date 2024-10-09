import React from "react";
import Layout from "../../Component/Layout/Layout";
import { useForm } from "react-hook-form";
import "../../Component/Layout/commen.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthLoginSchima, AuthSchima } from "../../Schima";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import { PostRequest } from "../../Api-handler/Api-handler";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AuthLoginSchima) });
  const loginUser = async (values) => {
    const response = await PostRequest("/api/auth/login", values, {
      headers: {
        "content-type": "application/json",
        
      },
    });
    console.log("...........?????",response);

    if (response) {
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      // toast.success(response.data.message)
      reset();
      navigate(location.state || "/");
    } else {
      // toast.error(response.data.message)
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = React.useState(false);


  return (
    <Layout>
      <div
        className="d-flex justify-content-center"
        style={{
          height: "514px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding:"26px"
        }}
      >
        <div className="card register" style={{backgroundImage: "linear-gradient(green, pink,gray,brown,green)"}}>
          <div className="Login">
            <h2>Login From</h2>
            <form className="Loginform" onSubmit={handleSubmit(loginUser)}>
              <div className="textbox">
              <TextField
                  sx={{ width: "100%", fontSize: "24px" }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  error={!!errors?.email}
                  {...register("email")}
                />
                <span
                  style={{ width: "100%", textAlign: "start", color: "black" }}
                >
                  {errors?.email?.message}
                </span>
              </div>

              <div className="textbox">
              <FormControl sx={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    error={!!errors?.password}
                    {...register("password")}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <span
                  style={{ width: "100%", textAlign: "start", color: "red" }}
                >
                  {errors?.password?.message}
                </span>
              </div>

              <button
                type="submit"
                style={{ width: "100%", fontSize: "18px", padding: "14px" }}
                className="btn btn-outline-success my-sm-0"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
