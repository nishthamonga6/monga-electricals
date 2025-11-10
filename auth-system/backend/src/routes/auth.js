const express = require('express');
const router = express.Router();

// Auth backend removed: respond 410 Gone
router.all('*', (req, res) => res.status(410).json({ error: 'auth backend removed' }));

module.exports = router;
