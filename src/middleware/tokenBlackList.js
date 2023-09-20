const tokenBlacklist = new Set();

// Middleware to check if the token is blacklisted
function BlackListRoute(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token blacklisted' });
  }
  next();
};


module.exports = { BlackListRoute, tokenBlacklist }