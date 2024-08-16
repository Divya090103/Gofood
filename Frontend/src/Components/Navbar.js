import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../CONTEXT/Cartprovider";
import axios from "axios";
const Navbar = () => {
  // state to check if user is present with that token or not
  const [present, setpresent] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authorize");
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
    navigate("/log_in");
  };

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
  const { cart } = useContext(CartContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className=" navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 list">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {/* if use localstorsge in this way the i if any one gave any key to the authorize it will render their page for that reason we hace check if that authorize value is present int users data base or not */}
              {present ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <form className="d-flex" role="search">
              {present ? (
                <>
                  <Link
                    className="btn btn-outline-success me-2 bg-white"
                    to="/order_page"
                  >
                    My Cart &nbsp;
                    {cart.length === 0 ? (
                      ""
                    ) : (
                      <span className="bg-danger p-1 text-white">
                        {cart.length}
                      </span>
                    )}{" "}
                  </Link>
                  <button
                    className="btn btn-outline-success me-2 bg-white"
                    onClick={handlelogout}
                  >
                    LogOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="btn btn-outline-success me-2 bg-white"
                    to="/log_in"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-success bg-white"
                    to="/sign_in"
                  >
                    Sign_IN
                  </Link>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
