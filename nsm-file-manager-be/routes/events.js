const express = require('express');
const router = express.Router();
const { addClient, removeClient } = require('../utils/sse');

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = addClient(res);
  console.log(`Client connected: ${clientId}`);

  req.on('close', () => {
    console.log(`Client disconnected: ${clientId}`);
    removeClient(clientId);
  });
});

module.exports = router;
