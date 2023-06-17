import express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";

//middleware

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json({
  limit: "50mb"
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("connected");
})