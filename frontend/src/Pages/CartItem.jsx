import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import CartItemCart from "../Component/cartitemcard/CartItemCart";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import DropIn from "braintree-web-drop-in-react";
import { PostRequest, getRequest } from "../Api-handler/Api-handler";
import { useTheme } from "../Context/Theme";

const CartItem = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [theme] = useTheme();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });

  const increment = (_id, index) => {
    let temp = cart;
    temp[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(temp));
    setCart(temp);
    window.location.reload();
  };

  const decrement = (_id, index) => {
    let temp = cart;
    temp[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(temp));
    setCart(temp);
    window.location.reload();
  };

  const totalPrice = () => {
    let totelPriceData = 0;
    cart?.map((product) => {
      totelPriceData += product.price * product.quantity;
    });

    return totelPriceData.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // _____DELETE_CART_ITEM________
  const deleteCart = (_id) => {
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
      .then((result) => {
        if (result.isConfirmed) {
          let myCart = [...cart];
          let index = myCart.findIndex((item) => item._id === _id);
          myCart.splice(index, 1);
          // let filterData = myCart.filter((item) => item._id !== _id )
          setCart(myCart);
          localStorage.setItem("cart", JSON.stringify(myCart));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your product has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary product is safe :)",
            "error"
          );
        }
      });
  };
  // _____DELETE_CART_ITEM________
  const getToekn = async () => {
    const response = await getRequest("/api/product/braintree/token");
    if (response) {
      setClientToken(response.clientToken);
    } else {
    }
  };

  useEffect(() => {
    getToekn();
  }, [auth?.token]);

  const handlePayment = async () => {
    // setLoading(true);
    // const { nonce } = await instance.requestPaymentMethod();
    // const response = await PostRequest(
    //   "/api/product/braintree/payment",
    //   { nonce, cart },
    //   {
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: auth.token,
    //     },
    //   }
    // );
    // setLoading(false);
    // localStorage.removeItem("cart");
    // setCart([]);
  };
  return (
    <Layout>
      <div className="cart-item-container">
        <div
          className="card p-4 gap-4"
          style={{
            background: theme ? "white" : "black",
            color: theme ? "black" : "white",
          }}
        >
          <div
            className="card p-4"
            style={{
              background: theme ? "white" : "black",
              color: theme ? "black" : "white",
            }}
          >
            <Fade direction="right">
              <div className="card_container6 d-flex justify-content-center">
                <div
                  className="card w-50 d-flex justify-content-center align-items-center flex-direction-column"
                  style={{
                    height: "150px",
                    background: theme ? "white" : "black",
                    color: theme ? "black" : "white",
                    border: theme ? "" : "1px solid pink",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: "black",
                      display: "flex",
                      gap: "6px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      textDecoration: "underline",
                      marginBottom: "8px",
                      background: theme ? "white" : "black",
                      color: theme ? "black" : "white",
                    }}
                  >
                    Hello :
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {`${auth?.token && auth?.user.name}`}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      display: "flex",
                      gap: "10px",
                      textAlign: "center",
                      background: theme ? "white" : "black",
                      color: theme ? "black" : "white",
                    }}
                  >
                    {cart.length >= 1
                      ? `You Have ${cart?.length} Item In Your Cart ${
                          auth?.token ? "" : "Please Login To Checkout"
                        }`
                      : "Youre Cart is Empty"}
                  </Typography>
                </div>
              </div>
            </Fade>
          </div>
          <div className="card" style={{ border: theme ? "" : "none" }}>
            <div
              style={{
                display: "flex",
                padding: "14px",
                gap: "10px",
                background: theme ? "white" : "black",
                color: theme ? "black" : "white",
              }}
              //   className="d-flex p-4 gap-4"
            >
              <div className="d-flex row gap-4 p-4" style={{ width: "50%" }}>
                {cart?.map((values, index) => {
                  const { name, price, description, quantity, slug, _id } =
                    values;
                  return (
                    <CartItemCart
                      name={name}
                      price={price}
                      description={description}
                      quantity={quantity}
                      slug={slug}
                      _id={_id}
                      key={index}
                      deleteCart={deleteCart}
                      increment={increment}
                      decrement={decrement}
                      index={index}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  width: "50%",
                  // height: "200px",
                  // border: "1px solid red",
                  padding: "24px",
                }}
              >
                <div
                  className="card gap-2"
                  style={{
                    width: "54%",
                    padding: "20px",
                    background: theme ? "white" : "black",
                    color: theme ? "black" : "white",
                    border: theme ? "" : "1px solid pink",
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Card Summary
                  </Typography>
                  <Typography variant="h5">
                    Totel || Checkout || Payment
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Totel Price :
                    <Typography sx={{ color: "green" }}>
                      {totalPrice()}
                    </Typography>
                  </Typography>
                  {auth?.user?.name ? (
                    <>
                      <Typography
                        variant="h5"
                        sx={{ display: "flex", gap: "8px" }}
                      >
                        Current Name
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: "green",
                          }}
                        >
                          : {auth?.user?.name}
                        </Typography>
                      </Typography>
                      <Button
                        variant="outlined"
                        className="bg-success text-white"
                        onClick={() => Navigate("/dashbored/user/profile")}
                      >
                        Update Name
                      </Button>
                    </>
                  ) : (
                    <div>
                      {auth?.token ? (
                        <Button
                          variant="outlined"
                          onClick={() => Navigate("/dashbored/user/profile")}
                        >
                          Update Name
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          className="bg-danger text-white w-100"
                          onClick={() =>
                            Navigate("/login", {
                              state: "/cart-item",
                            })
                          }
                        >
                          Please Login To CheckOut
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                <div
                  className="card gap-2 mt-4"
                  style={{ width: "54%", padding: "20px" }}
                >
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <Button
                      variant="outlined"
                      className="bg-danger text-white w-100"
                      onClick={handlePayment}
                      // disabled={!loading || !auth?.user?.name || !instance}
                    >
                      {/* {loading ? "Processing......" : "Payment Now"} */}
                      mmmmm
                    </Button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartItem;
