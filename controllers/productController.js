import Product from "../models/product.js";

// get all product
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({status:"OK", result:products});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// save a product
export const saveProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const products = await product.save();
    res.status(200).json({status:"OK", result:products});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get a product
export const getProductById = async (req, res) => {
  const cekId = await Product.findById(req.params.id);

  if (!cekId) res.status(404).json({ message: "id not found" });
  try {
    const products = await Product.findOne({ _id: req.params.id });
    res.status(200).json({status:"OK", result:products});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update product
export const updateProduct = async (req, res) => {
  const cekId = await Product.findById(req.params.id);

  if (!cekId) res.status(404).json({ message: "id not found" });
  try {
    const products = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    ).then((data) => data);

    res.status(200).json({ status: "OK", result: products });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  const cekId = await Product.findById(req.params.id);
  if (!cekId) res.status(404).json({ message: "id not found" });
  try {
    const products = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({status:"OK", result:{message:`${req.params.id} deleted`}});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
