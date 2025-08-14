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

module.exports = { registerValidation, loginValidation}