import "./App.css";
import Home from "./screen/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; // Replace with your actual dark theme CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Replace with your actual dark theme JS
import SignUp from "./screen/SignUp";
import Cart from "./Components/Cart";
import Cartprovider from "./CONTEXT/Cartprovider";
import Login from "./screen/Login";
import Verification from "./Components/Verification";
import Allorder from "./Components/Allorder";
import VerifiedPage from "./Components/VerifiedPage";
function App() {
  return (
    <>
      <Cartprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign_in" element={<SignUp />} />
            <Route path="/log_in" element={<Login />} />
            <Route path="/order_page" element={<Cart />} />
            <Route path="/myorder" element={<Allorder />} />
            <Route path="/verify-mail" element={<Verification />} />
            <Route path="/verified-page/:token" element={<VerifiedPage />} />
          </Routes>
        </BrowserRouter>
      </Cartprovider>
    </>
  );
}

export default App;
