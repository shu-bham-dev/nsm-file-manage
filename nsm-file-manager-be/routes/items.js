const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getItems);

router.put('/:id', itemsController.updateItem);

router.delete('/:id', itemsController.deleteItem);

module.exports = router;
