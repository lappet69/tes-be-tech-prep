import express from "express";
import {
  getProducts,
  saveProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", saveProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);


// ======================== //


router.use('/product',router)

export default router;
