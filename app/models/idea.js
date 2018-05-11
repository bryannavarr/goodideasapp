const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = {
  _id: Joi.objectId(),
  title: Joi.string(),
  body: Joi.string()
};

module.exports = Joi.object().keys(schema);
