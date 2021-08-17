import React, { useState, useContext } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [error, setError] = useState(false);
  const { AddRestaurant } = useContext(RestaurantContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || priceRange === "Price Range") {
      setError(true);
      return;
    }
    try {
      const response = await RestaurantFinder.post("/restaurants/", {
        name,
        location,
        price_range: priceRange,
      });
      AddRestaurant(response.data.data.restaurant);
      setError(false);
      setName("");
      setLocation("");
      setPriceRange("Price Range");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && <h4 style={{ color: "red" }}>Invalid Inputs</h4>}
      <form action="">
        <div className="row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="name"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="location"
              className="form-control"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="form-select"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
        </div>
        <div className="row">
          <button
            style={{
              maxWidth: 150,
              marginLeft: "auto",
              marginRight: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddRestaurant;
