import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import { useHistory } from "react-router";

const AddReview = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [reviewText, setReviewtext] = useState("");
  const [rating, SetRating] = useState("Rating");
  const history = useHistory();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      if (!name || !reviewText || rating === "Rating") {
        return;
      }
      await RestaurantFinder.post(`/restaurants/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-2">
        <form action="">
          <div className="row">
            <div className="form-group col-8 mb-2">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="name"
                className="form-control"
              ></input>
            </div>
            <div className="form-group col-4 mb-2">
              <label htmlFor="rating">Rating</label>
              <select
                value={rating}
                onChange={(e) => SetRating(e.target.value)}
                id="rating"
                className="form-select"
              >
                <option disabled>Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="review">Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewtext(e.target.value)}
              id="review"
              className="form-control"
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={handleSubmitReview}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddReview;
