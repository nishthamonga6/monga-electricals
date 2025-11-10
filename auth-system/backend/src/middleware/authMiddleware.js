// Auth middleware disabled: backend removed
exports.protect = function (req, res, next) {
  return res.status(410).json({ error: 'auth backend removed' });
};
