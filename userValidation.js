const Joi = require("@hapi/joi");

// User Register Validation

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// User Login validation

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
