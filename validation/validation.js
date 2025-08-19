const Joi = require('joi');

const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string()
            .required(),
        lastName: Joi.string()
            .required(),
        email: Joi.string()
            .email()
            .required(),
        username: Joi.string()
            .required(),
        password: Joi.string()
            .min(5)
            .required(),
        //role: Joi.string().required()
    });

    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .required(),
        password: Joi.string()
            .min(5)
            .required()
    });

    return schema.validate(data);
};

const addToListValidation = (data) => {
  const schema = Joi.object({
    tmdbId: Joi.number().required(),
    media_type: Joi.string().valid("movie", "tv").required(),
    title: Joi.string().required(),
    posterPath: Joi.string().required()
  });

  return schema.validate(data);
};

const addFeaturedValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    mediaType: Joi.string().valid("movie", "tv").required(),
    listName: Joi.string().required()
  });

  return schema.validate(data);
};

const updateFeaturedValidation = (data) => {
  const schema = Joi.object({
    listName: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { registerValidation, 
                   loginValidation, 
                   addToListValidation, 
                   addFeaturedValidation, 
                   updateFeaturedValidation}