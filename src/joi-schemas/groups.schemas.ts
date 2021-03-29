import config from '../config';
import * as Joi from 'joi';

export const createBodySchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(...config.permissions)).required()
});

export const updateBodySchema = Joi.object({
    name: Joi.string(),
    permissions: Joi.array().items(Joi.string().valid(...config.permissions))
});
