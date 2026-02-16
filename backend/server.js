import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Route
app.get("/", (req, res) => {
    res.send("Hello World!");
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


