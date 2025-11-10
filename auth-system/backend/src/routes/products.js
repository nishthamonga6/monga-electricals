const express = require('express');
const router = express.Router();

// Backend removed: respond with 410 for all product routes
router.all('*', (req, res) => res.status(410).json({ error: 'products backend removed' }));

module.exports = router;
