const Joi = require('joi');

export const urlSchema = Joi.object({
    url: Joi.string().min(3).required()
})
