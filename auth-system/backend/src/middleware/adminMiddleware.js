function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  // Admin middleware disabled: backend removed
    return res.status(410).json({ error: 'admin middleware disabled: backend removed' });
}

module.exports = { isAdmin };
