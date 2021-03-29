import * as Joi from 'joi';

export const createBodySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
    age: Joi.number().min(4).max(130).required()
});

export const updateBodySchema = Joi.object({
    login: Joi.string(),
    password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/),
    age: Joi.number().min(4).max(130)
});
