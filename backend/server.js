import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js";
import blogRoutes from "./routes/blog.routes.js";

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


