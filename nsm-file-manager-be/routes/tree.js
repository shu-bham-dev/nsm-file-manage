const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeController');

router.get('/', treeController.getTree);

module.exports = router;
