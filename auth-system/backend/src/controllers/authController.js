// Auth controller disabled: backend removed
exports.signup = async function (req, res) {
  return res.status(410).json({ error: 'auth backend removed' });
};

exports.login = async function (req, res) {
  return res.status(410).json({ error: 'auth backend removed' });
};

exports.getUser = async function (req, res) {
  return res.status(410).json({ error: 'auth backend removed' });
};
