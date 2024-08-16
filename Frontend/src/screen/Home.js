import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import Footer from "../Components/Footer";
import Carouselcompo from "../Components/Carouselcompo";
import axios from "axios";
const Home = () => {
  var [food_data, setfood_data] = useState([]);
  var [category, setcategory] = useState([]);
  const localstore = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/food_data");
      setfood_data(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    localstore();
  }, []);
  const categorystorage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/category");
      setcategory(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    categorystorage();
  }, []);
  return (
    <>
      {/* //home  page */}
      <Navbar />
      <Carouselcompo />
      {/* card  */}
      <div className="container">
        {category.map((data, index) => (
          <div key={index}>
            <h1>{data.category_name}</h1>
            <h4>{data.Description}</h4>
            <div className="row ">
              {food_data
                .filter((item) => item.category_name === data.category_name)
                .map((filter_item, index) => (
                  <Card key={index} product={filter_item} />
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};
export default Home;
