import Joi from "joi";

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const userRegistrationSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().required(),
  userPassword: Joi.string().required(),
  city: Joi.string().required(),
  postal: Joi.string().required(),
  userAddress1: Joi.string().required(),
  userAddress2: Joi.string().optional(),
  userPhone: Joi.string().required(),
});
