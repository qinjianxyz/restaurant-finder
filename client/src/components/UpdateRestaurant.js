import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import { useHistory } from "react-router";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/restaurants/${id}`);
      setName(response.data.data.restaurant.name);
      setLocation(response.data.data.restaurant.location);
      setPriceRange(response.data.data.restaurant.price_range);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || priceRange === "Price Range") {
      setError(true);
      return;
    }
    try {
      await RestaurantFinder.put(`/restaurants/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      setError(false);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && <h4 style={{ color: "red" }}>Invalid Inputs</h4>}
      <form action="">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="location"
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <label>Price Range</label>
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
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
        <Link className="btn btn-primary mx-3" to="/">
          Homepage
        </Link>
      </form>
    </>
  );
};

export default UpdateRestaurant;
