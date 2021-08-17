const express = require("express");
const app = express();

const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} else if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
const PORT = process.env.PORT || 3005;
const morgan = require("morgan");
const db = require("./db/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Get All Restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurantsData = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );
    res.status(200).json({
      status: "success",
      results: restaurantsData.rows.length,
      data: {
        restaurants: restaurantsData.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

// Get One Restaurant
app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurants = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1;",
      [req.params.id]
    );
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );
    res.status(200).send({
      status: "success",
      data: {
        restaurant: restaurants.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Create A Restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES($1, $2, $3) returning *;",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "Success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// Update A Restaurant
app.put("/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      restaurant: results.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete A Restaurant
app.delete("/restaurants/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM reviews WHERE restaurant_id = $1;", [
      req.params.id,
    ]);
    await db.query(" DELETE FROM restaurants WHERE id = $1;", [req.params.id]);
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
});

// Delete a Review
app.delete("/reviews/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM reviews WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
});

// Create a Review
app.post("/restaurants/:id/addReview", async (req, res) => {
  try {
    await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "Success",
      data: [req.params.id, req.body.name, req.body.review, req.body.rating],
    });
  } catch (error) {
    console.log(error);
  }
});

// Server Listner
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

app.get("*", (req, res) => {
  res.sendFile("client/build/index.html");
});
