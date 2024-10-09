import React from "react";
import Layout from "../../Component/Layout/Layout";
import { useForm } from "react-hook-form";
import "../../Component/Layout/commen.css";
import { PostRequest } from "../../Api-handler/Api-handler";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthSchima } from "../../Schima";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  // const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AuthSchima) });

  const registerUser = async (values) => {
    const response = await PostRequest("/api/auth/register", values, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(response);
    if (response) {
      // toast.success(response.data.message)
      reset();
      navigate("/login");
    } else {
      // toast.error(response.data.message)
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Layout>
      {/* <div className="register">
        <div className="Login">
          <h2>Register From</h2>
          <form className="Loginform" onSubmit={handleSubmit(registerUser)}>
            <div className="textbox">
              <input
                type="name"
                {...register("name")}
                error={!!errors?.name}
                placeholder="UserName"
              />
              <span style={{ width: "100%", textAlign: "start", color: "red" }}>
                {errors?.name?.message}
              </span>
            </div>
            <div className="textbox">
              <input
                type="email"
                {...register("email")}
                error={!!errors?.email}
                placeholder="email"
              />
              <span style={{ width: "100%", textAlign: "start", color: "red" }}>
                {errors?.email?.message}
              </span>
            </div>
            <div className="textbox">
              <input
                type="password"
                {...register("password")}
                error={!!errors?.password}
                placeholder="Password"
              />
              <span style={{ width: "100%", textAlign: "start", color: "red" }}>
                {errors?.password?.message}
              </span>
            </div>
            <button className="submit" type="submit">
              Register
            </button>
          </form>
        </div>
      </div> */}
      <div
        className="d-flex justify-content-center"
        style={{
          height: "514px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "44px",
        }}
      >
        <div
          className="card register"
          style={{
            backgroundImage: "linear-gradient(green, pink,gray,brown,green)",
          }}
        >
          <div className="Login">
            <h2>Register From</h2>
            <form className="Loginform" onSubmit={handleSubmit(registerUser)}>
              <div className="textbox">
                <TextField
                  sx={{ width: "100%", fontSize: "24px" }}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  type="name"
                  error={!!errors?.name}
                  {...register("name")}
                />

                <span
                  style={{ width: "100%", textAlign: "start", color: "black" }}
                >
                  {errors?.name?.message}
                </span>
              </div>
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
                  style={{ width: "100%", textAlign: "start", color: "black" }}
                >
                  {errors?.password?.message}
                </span>
              </div>

              <button
                type="submit"
                style={{ width: "100%", fontSize: "18px", padding: "14px" }}
                className="btn btn-outline-success my-sm-0"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
