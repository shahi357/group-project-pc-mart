import Joi from "joi";
const orderProductSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().required(),
});
export const addOrderSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().required(),
  city: Joi.string().required(),
  postal: Joi.string().required(),
  userAddress1: Joi.string().required(),
  userAddress2: Joi.string().optional().empty("").allow(null),
  userPhone: Joi.string().required(),
  items: Joi.array().items(orderProductSchema.required()).required(),
});
