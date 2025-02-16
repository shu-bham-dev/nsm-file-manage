const Joi = require('joi');

const createFolderSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  parent: Joi.string().allow(null),
});

const uploadFileSchema = Joi.object({
  parent: Joi.string().allow(null),
  description: Joi.string().allow(''),
});

const getItemsSchema = Joi.object({
  parent: Joi.string().allow(null),
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(1).default(10),
  search: Joi.string().allow(''),
});

module.exports = {
  createFolderSchema,
  uploadFileSchema,
  getItemsSchema,
};
