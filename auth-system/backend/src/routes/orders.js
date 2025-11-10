const express = require('express');
const router = express.Router();

// Orders backend removed: reply 410 Gone for all endpoints
router.all('*', (req, res) => res.status(410).json({ error: 'orders backend removed' }));

module.exports = router;
