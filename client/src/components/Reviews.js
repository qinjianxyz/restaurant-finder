import React from "react";
import StarRating from "./StarRating";
import RestaurantFinder from "../api/RestaurantFinder";
import { useHistory, useLocation } from "react-router";

const Reviews = ({ restaurantID, reviews }) => {
  const history = useHistory();
  const location = useLocation();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await RestaurantFinder.delete(`/reviews/${id}`);
      history.push("/");
      history.push(location.pathname);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row mb-2">
      {reviews.map((review) => (
        <div className="col-sm-6" key={review.id}>
          <div className="card text-white bg-dark border-info mb-3 mx-2">
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
            <button
              style={{ width: 150, marginLeft: "auto" }}
              onClick={(e) => handleDelete(e, review.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
