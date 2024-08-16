import React, { useContext, useState } from "react";
import { CartContext } from "../CONTEXT/Cartprovider";
export default function Card(product) {
  const data = product.product;
  const type = data.options[0];
  //set for quantity and size
  const [qty, setqty] = useState(1);
  const [size, setSize] = useState(Object.keys(type)[0]);
  const selectitem = {
    id: data._id,
    name: data.Name,
    price: type[size] * qty,
    Qty: qty,
    Size: size,
    image:data.img
  };
  //get addcart from the cart provider
  const { addcart } = useContext(CartContext);
  return (
    <>
      <div className="card mt-2" style={{ width: "18rem" }}>
        <img
          src={data.img}
          className="card-img-top"
          alt="..."
          style={{ height: "40vh", width: "40vh", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{data.Name}</h5>
          <p className="card-text"></p>
          <div className="container">
            QTY:
            <select
              className="m-2 h-100 bg-primary "
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="bg-primary m-2 h-100"
              onChange={(e) => setSize(e.target.value)}
            >
              {Object.keys(type).map((key, index) => {
                return <option key={index}>{key}</option>;
              })}
            </select>
            <span>Total Price :
            {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2,
              }).format(qty*type[size])}</span>
            <hr />
            <button
              className="btn btn-outline-primary bg-primary text-white"
              onClick={() => addcart(selectitem)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
