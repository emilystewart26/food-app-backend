module.exports = function requireClerkAuth(req, res, next) {
    const { auth } = req;
  
    if (!auth || !auth.userId) {
      return res.status(401).json({ error: 'Unauthorized - Clerk user not found' });
    }
  
    next();
  };

