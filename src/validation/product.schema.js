import Joi from "joi";

export const addProductSchema = Joi.object({
  productType: Joi.string().valid(
    "laptop",
    "desktop",
    "accessories",
    "hardware",
    "software",
    "others"
  ),
  productBrand: Joi.string().valid(
    "hp",
    "acer",
    "dell",
    "apple",
    "lenovo",
    "asus",
    "misi",
    "others"
  ),
  productWarranty: Joi.string().valid("local", "brand", "na"),
  productColor: Joi.string().required(),
  productName: Joi.string().required(),
  productWeight: Joi.number().required(),
  productDescription: Joi.string().required(),
  productPrice: Joi.number().required(),
  productDiscount: Joi.number().optional().empty(0).allow(0),
});
