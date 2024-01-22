import { Product } from "../model/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const product = new Product({
      productType: req.body.productType,
      productBrand: req.body.productBrand,
      productWarranty: req.body.productWarranty,
      productColor: req.body.productColor,
      productName: req.body.productName,
      productQuantity: req.body.productQuantity,
      productWeight: req.body.productWeight,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productDiscount: req.body.productDiscount,
      image: req.file?.filename,
    });
    const newProduct = await product.save();
    res.status(201).json({
      message: "Product saved successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).send({ message: "Product creation failed!" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error();
    }

    res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(400).json({ message: "Product not found" });
  }
};

/** Public access */
export const getAllProducts = async (req, res) => {
  try {
    const query = req.query.category;
    const brand = req.query.brand;
    const filter = {
      ...(query && query !==null && { productType: query }),
      ...(brand && query !==null && { productBrand: brand }),
    };

    const products = await Product.find(filter);
    res.status(200).json({ message: "Product found", data: products });
  } catch (error) {
    console.log(error, "GET_ALL_PRODUCTS");
    res.status(400).json({ message: "Something went wrong!" });
  }
};

export const search = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};
