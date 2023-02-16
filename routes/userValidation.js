const Joi = require("@hapi/joi");

// User Register Validation

const registerValidation = () => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
};

// User Login validation

const loginValidation = () => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  };
};
