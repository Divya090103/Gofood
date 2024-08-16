import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [state, setstate] = useState({ name: "", password: "" });

  //state to check the verification is done or not
  const [verify, setverify] = useState(true);
  const navigate = useNavigate(); //throught this we can use dom hook inside function also
  const handlesubmit = async (e) => {
    e.preventDefault();
    const fetchdat = await fetch("http://localhost:5000/api/log_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        password: state.password,
      }),
    });
    const response = await fetchdat.json();
    console.log("response we get is", response);
    console.log("check if we get the response or not", response.success);
    if (response.success) {
      console.log("we find it success fully");
      setstate({
        name: "",
        password: "",
      });
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("authorize", response.user.JwtToken);
      localStorage.setItem("userid",response.user._id)
      console.log(localStorage.getItem("user"));
      navigate("/");
    } else alert("Enter Valid Credentials");
  };
  return (
    <>
      <form onSubmit={handlesubmit} className="container bg-primary mt-5 p-4">
        <div className="mb-3">
          <label htmlFor="exampleInputname" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputname"
            name="name"
            value={state.name}
            autoComplete="off"
            onChange={(e) => {
              setstate({ ...state, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={state.password}
            name="password"
            onChange={(e) => {
              setstate({ ...state, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <button type="submit" className="btn btn-outline-success bg-white">
          Submit
        </button>
        <Link
          className="bg-danger text-warning btn btn-outline-success ms-3 fs-5 fst-italic"
          to="/sign_in"
        >
          Sign In
        </Link>
      </form>
      {!verify ? (
        <>
          <>
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setverify(true)} // Option to close the modal and reset cart state
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Please verify ur mail id</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => setverify(true)} // Close the modal
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Login;
