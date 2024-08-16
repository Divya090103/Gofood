import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Card from "./Card";
const foodImages = [
  "Images/images.jpg",
  "Images/download.jpg",
  "Images/download (1).jpg",
  "Images/download (2).jpg",
  "Images/download (3).jpg",
];
export default function Carouselcompo() {
  const [val, setval] = useState("");
  const [Srch, setsearch] = useState([]);
  const search = async (e) => {
    //onclick it will laod so we should prevent the event
    e.preventDefault();
    const fetchdat = await fetch("http://localhost:5000/api/searchcategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_name: val,
      }),
    });
    const response = await fetchdat.json();
    if (response.success) {
      console.log("find the categorised dta successfuly");
      console.log("fecth", response.items);
      setsearch(response.items);
    } else alert("Enter Valid Credentials");
  };
  const handlechange = (e) => {
    setval(e.target.value);
  };
  return (
    <>
      <Carousel>
        {foodImages.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="image-container">
              <img
                className="image"
                style={{ width: "100%", height: "70vh" }}
                src={image}
                alt={`Slide ${index + 1}`}
              />
              <div className="overlay">
                <div className="carousel-caption">
                  <form className="form-inline d-flex" onSubmit={search}>
                    <input
                      className="form-control fs-4 me-2 mb-5 bg-white"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={handlechange}
                    />
                    <button
                      className="btn mb-5 btn-outline-success bg-primary"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      {Srch.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="container">
            <h1>Search Results</h1>
            <div className="row ">
              {Srch.map((filter_item) => (
                <Card product={filter_item} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
