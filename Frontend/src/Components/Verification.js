import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { CheckCircleOutline, Email } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const Verification = () => {
  const token = useParams();
  console.log(token);
  console.log("Hello");
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <CheckCircleOutline style={{ fontSize: 100, color: "#4caf50" }} />
      <Typography
        variant="h4"
        style={{ marginTop: "20px", fontWeight: "bold" }}
      >
        Verify Your Email
      </Typography>
      <Typography variant="body1" style={{ marginTop: "20px" }}>
        A verification email has been sent to your email address. Please check
        your inbox and click the verification link to complete your
        registration.
      </Typography>
      <Box mt={4}>
        <Email style={{ fontSize: 80, color: "#2196f3" }} />
      </Box>
      {/* <Button 
        variant="contained" 
        color="primary" 
        style={{ marginTop: '40px', padding: '10px 20px', fontSize: '16px' }}
        onClick={() => window.location.reload()}
      >
        Resend Verification Email
      </Button> */}
    </Container>
  );
};

export default Verification;
