import React, { useContext, useState,useEffect } from "react";
import { CartContext } from "../CONTEXT/Cartprovider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const [present,setpresent]=useState(false);

  const Authorize = async () => {
  
    const token = localStorage.getItem("authorize");
    console.log(token);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/authorize",
        { token },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Check response in database:", JSON.stringify(response.data));
      if (response.data.success) {
        setpresent(true);
      } else {
        setpresent(false);
      }
    } catch (e) {
      console.log("problem  fecth the token data");
    }
  };

  //for check of present at the time of loading we use useeffect
  useEffect(() => {
    Authorize();
  }, []);
  const { cart, remove, amount, orderplaced } = useContext(CartContext);
  let [isCartEmpty, setIsCartEmpty] = useState(false);
  const navigate = useNavigate();
  const placed = (cart) => {
    Allorder(cart);
    orderplaced(cart);
    setIsCartEmpty(true);
  };
  //post the  cart check out data to the backend
  const Allorder = async () => {
    console.log("placed the order storing int data base");
    // e.preventDefault();
    console.log("storge id of the user", localStorage.getItem("userid"));
    const response = await fetch("http://localhost:5000/api/ALL_orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: localStorage.getItem("userid"),
        items: cart,
        totalAmount: amount,
        date: Date.now(),
      }),
    });
 
  };

  return (
    <>
    {present?<div>
      <section className="container mt-5 bg-primary text-center">
        <h1
          className="text-warning"
          style={{
            fontStyle: "italic",
            fontWeight: "bolder",
            fontFamily: "Fira Sans, serif",
          }}
        >
          YOUR ORDER
        </h1>
        <div
          className="row fs-3"
          style={{
            fontStyle: "italic",
            fontWeight: "bolder",
            fontFamily: "Fira Sans, serif",
          }}
        >
          <div className="col-lg-3">Product</div>
          <div className="col-lg-3">Price</div>
          <div className="col-lg-2">Quantity</div>
          <div className="col-lg-3">OPtion</div>
          <div className="col-lg-1">Remove</div>
          <hr />
        </div>
        {cart.length === 0 ? (
          <>YOUR CART IS EMPTY</>
        ) : (
          <>
            {cart.map((data, index) => (
              <div
                key={index}
                className="row fs-5"
                style={{
                  fontStyle: "italic",
                  fontWeight: "bolder",
                  fontFamily: "Fira Sans, serif",
                }}
              >
                <div className="col-lg-3">
                  <img
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "fill",
                    }}
                    src={data.image}
                    alt="img uploaded"
                  />
                  &nbsp; &nbsp;
                  {data.name}
                </div>
                <div className="col-lg-3">
                  {" "}
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  }).format(data.price)}
                </div>
                <div className="col-lg-2">{data.Qty}</div>
                <div className="col-lg-3">{data.Size}</div>
                <div className="col-lg-1">
                  <RiDeleteBin6Line onClick={() => remove(index)} />
                </div>
                <hr />
              </div>
            ))}
            <hr />
            <div
              className="d-flex justify-content-between"
              style={{
                fontStyle: "italic",
                fontWeight: "bolder",
                fontFamily: "Fira Sans, serif",
              }}
            >
              <h1>
                Total Price:{" "}
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 2,
                }).format(amount)}
              </h1>
              <button
                className="btn btn-danger fs-3"
                onClick={() => placed(cart)}
              >
                Check OUT
              </button>
            </div>
          </>
        )}
      </section>
      {isCartEmpty ? (
        <>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order Confirmation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setIsCartEmpty(false)} // Option to close the modal and reset cart state
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Your order has been placed successfully.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setIsCartEmpty(false)} // Close the modal
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setIsCartEmpty(false);
                      navigate("/");
                      // You can also add logic here to navigate to another page or reset the cart
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      </div>:""}
    
    </>
  );
};
export default Cart;
