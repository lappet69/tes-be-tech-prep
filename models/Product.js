import mongoose from "mongoose";

const Product = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    imageurl: {
      type: String,
      require: true,
    },
   
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("Products", Product);
