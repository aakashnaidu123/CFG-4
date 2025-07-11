const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: 'Access denied. User role not found.' });
    }

    const userRole = req.user.role;
    if (allowedRoles.includes(userRole)) {
      next(); 
    } else {
      res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
    }
  };
};

module.exports = roleCheck;
