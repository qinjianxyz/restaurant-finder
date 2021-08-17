import React, { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantContext } from "../context/RestaurantsContext";

const RestaurantDetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <>
      {selectedRestaurant && (
        <>
          <div className="mt-3">
            <h1 className="text-center display-1">
              {selectedRestaurant.restaurant.name}
            </h1>
            <div className="text-center mb-4">
              <Link to="/" className="btn btn-success ms-3">
                <StarRating
                  rating={selectedRestaurant.restaurant.average_rating}
                />
                <span className="text-warning ml-1">
                  (
                  {selectedRestaurant.restaurant.count
                    ? selectedRestaurant.restaurant.count
                    : 0}
                  )
                </span>
                <span className="ms-3">Home Page</span>
              </Link>
            </div>
            <Reviews restaurantID={id} reviews={selectedRestaurant.reviews} />
            <AddReview />
          </div>
        </>
      )}
    </>
  );
};

export default RestaurantDetails;
