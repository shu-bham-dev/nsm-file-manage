const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const validate = require('../middleware/validationMiddleware');
const { createFolderSchema } = require('../dtos/itemDto');

router.post('/', validate(createFolderSchema), folderController.createFolder);

module.exports = router;
