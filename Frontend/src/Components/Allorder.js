import axios from "axios";
import react, { useEffect, useState } from "react";
const Allorder = () => {
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





  //get the all data from database of particular uaser id

  //get all the order that was places by this user from the data base
  const [order, setOrder] = useState([]);
  const getallorders = async () => {
    console.log(localStorage.getItem("userid"));
    try {
      const userId = localStorage.getItem("userid");
      const response = await axios.post(
        "http://localhost:5000/api/getallorder"
      );
      const orders = response.data;
      const filteredOrders = orders.filter((order) => order.userID === userId); //fiter the order in specific condition
      setOrder(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  //useEffect to reload the data whenven there is any change in  backend
  useEffect(() => {
    Authorize();
    getallorders();
  }, []);
  console.log("the orders are", order);
  return (
    <>
    {present?<section className="container mt-5 bg-primary ">
    <hr />
    <h1 className=" text-center text-warning">YOUR ORDERS</h1>
    {order.length == 0 ? (
      <p>No Order placed yet</p>
    ) : (
      <>
        {order.map((order) => (
          <>
            <div key={order._id}>
              <h5>Order ID: {order._id}</h5>
              <div className="row">
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Date: {new Date(order.date).toLocaleString()}</p>
              </div>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <p key={index}>
                    <img
                      src={item.image}
                      alt="not uploaded"
                      style={{
                        width: "150px",
                        height: "100px",
                        objectFit: "fill",
                      }}
                    ></img>
                    {item.name} {item.quantity} x ${item.price}
                  </p>
                ))}
              </ul>
            </div>
            <hr />
          </>
        ))}
      </>
    )}
  </section>:""}
      
    </>
  );
};
export default Allorder;
