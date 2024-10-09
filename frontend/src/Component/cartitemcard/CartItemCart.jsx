import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import "./cartitem.css";
import { Button } from "@mui/material";
import { useTheme } from "../../Context/Theme";

const CartItemCart = ({
  name,
  price,
  description,
  quantity,
  slug,
  _id,
  deleteCart,
  increment,
  decrement,
  index,
}) => {
  console.log("quantity",quantity);
  const [theme] = useTheme();
  return (
    <Card id="cart-item-container" style={{ background:theme ? "white" : "black",color:theme ? "black" : "white",}}>
      <Box
        sx={{
          width: "55%",
          height: "280px",
         
        }}
      >
        <img
          src={`http://localhost:8000/api/product/product-photo/${_id}`}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
      <Box
        sx={{
          width: "60%",
          height: "284px",
        }}
      >
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="">
            <Typography id="texthedaing">
              Name :<Typography>{name}</Typography>{" "}
            </Typography>
            <Typography id="texthedaing">
              Description :
              <Typography>{description.substring(0, 20)}</Typography>{" "}
            </Typography>
            <Typography id="texthedaing">
              Quantity :
              <Button
                variant="outlined"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                onClick={()=>increment(_id,index)}
                disabled={quantity===4}
              >
                +
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                variant="outlined"
                onClick={()=>decrement(_id,index)}
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                disabled={quantity === 1}
              >
                -
              </Button>{" "}
            </Typography>
            <Typography id="texthedaing">
              Price :
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "red", fontSize: "22px" }}>$</span>
                {price}
              </Typography>
            </Typography>
            <button
              style={{ width: "100%", fontSize: "18px", marginBottom: "1rem" }}
              className="btn btn-outline-success"
              onClick={() => deleteCart(_id)}
            >
              delete
            </button>
          </div>
        </div>
      </Box>
    </Card>
  );
};

export default CartItemCart;
