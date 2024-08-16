import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { CheckCircleOutline, Email } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const VerifiedPage = () => {
  console.log("hello");
  //
  //To extract the token from the URL parameter in a React application, you can //use the useParams hook provided by react-router-dom
  const { token } = useParams();
  console.log(token);
  const [verify, setveryfy] = useState(false);
  const verfied_at_backend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify",
        { token },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        setveryfy(true);
      }
    } catch (e) {
      console.log("error at the backend");
    }
  };

  useEffect(() => {
    verfied_at_backend();
  }, []);
  return (
    <>
      {verify ? (
        <Container
          maxWidth="sm"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          <CheckCircleOutline style={{ fontSize: 100, color: "#4caf50" }} />
          <Typography
            variant="h4"
            style={{ marginTop: "20px", fontWeight: "bold" }}
          >
            Verification Of Your Mail Succcessfully
          </Typography>
          <Box mt={4}>
            <Email style={{ fontSize: 80, color: "#2196f3" }} />
          </Box>
          <Link className="btn btn-outline-success bg-white" to="/log_in">
            Login
          </Link>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default VerifiedPage;
