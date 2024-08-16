import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    name: "",
    password: "",
    email: "",
    phone_num: "",
    Location: "",
  });
  //state for check if user is present or the credentiall is valid or  not
  const [present, setpresent] = useState(false);
  const handlesubmit = async (e) => {
    console.log("going to submit");
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        Location: state.Location,
        email: state.email,
        phone_num: state.phone_num,
        password: state.password,
      }),
    });
    const res = await response.json();
    if (res.success) {
      console.log("submit data completed");

      setstate({
        name: "",
        password: "",
        email: "",
        phone_num: "",
        Location: "",
      });
      //get the data send mail now we to redirect to the verification page the we navigate to that page
      navigate("/verify-mail");
    } else if (res.message === "already present user with that mail id") {
      setpresent(true); //user with that mail is already present
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit} className="container bg-primary mt-5 p-4">
        <div className="mb-3">
          <label htmlFor="exampleInputname" className="form-label">
            FullName
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
          <label htmlFor="exampleInputloaction" className="form-label">
            Address (max-len: 5)
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputlocation"
            value={state.Location}
            autoComplete="off"
            name="Location"
            onChange={(e) => {
              setstate({ ...state, [e.target.name]: e.target.value });
            }}
          />
          <label htmlFor="exampleInputnum" className="form-label">
            Phone Number (max-len: 10)
          </label>
          <input
            type="Number"
            className="form-control"
            id="exampleInputnum"
            name="phone_num"
            value={state.phone_num}
            autoComplete="off"
            onChange={(e) => {
              setstate({ ...state, [e.target.name]: e.target.value });
            }}
          />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={state.email}
            name="email"
            onChange={(e) => {
              setstate({ ...state, [e.target.name]: e.target.value });
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password (max-len: 5)
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
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-outline-success bg-white">
          Submit
        </button>
        <Link
          className="bg-danger text-warning btn btn-outline-success ms-3 fs-5 fst-italic"
          to="/log_in"
        >
          Already a user
        </Link>
        <Link className="btn btn-outline-success ms-3 fs-5 fst-italic" to="/">
          HOME
        </Link>
      </form>
      {present ? (
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
                    onClick={() => setpresent(false)} // Option to close the modal and reset cart state
                  ></button>
                </div>
                <div className="modal-body">
                  <p>User Already Exists With this mail id</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={() => setpresent(false)} // Close the modal
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default SignUp;
