const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .trim()
    .messages({
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 100 characters'
    }),
  description: Joi.string()
    .max(500)
    .allow('')
    .trim()
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .default('pending')
    .messages({
      'any.only': 'Status must be pending, in-progress, or completed'
    })
});

const updateTaskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .trim()
    .messages({
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 100 characters'
    }),
  description: Joi.string()
    .max(500)
    .allow('')
    .trim()
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .messages({
      'any.only': 'Status must be pending, in-progress, or completed'
    })
}).min(1).messages({
  'object.min': 'At least one field is required for update'
});

module.exports = {
  createTaskSchema,
  updateTaskSchema
};
