const User = require("../Models/User");

module.exports = function authorizeRole(allowedRoles = []) {
  return async function (req, res, next) {
    const { auth } = req;

    if (!auth || !auth.userId) {
      return res.status(401).json({ error: 'Unauthorized - no Clerk user ID' });
    }

    const user = await User.findOne({ clerkId: auth.userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found in DB' });
    }
    

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }

    req.user = user;
    next();
  };
};
