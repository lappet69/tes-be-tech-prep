import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cors from "cors";
const app = express();
const PORT = 5000;


mongoose.connect("mongodb://localhost:27017/restful_db_product", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("db connected"));



app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`server run on port ${PORT}`));
