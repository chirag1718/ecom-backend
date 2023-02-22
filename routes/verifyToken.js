const jwt = require("jsonwebtoken");

// User middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    req.status(400).send("Invalid Token");
  }
};

// Admin middleware
const adminAuthMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied!");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(401).send("Acces Denied");
    }
  } catch (err) {
    req.status(400).send("Invalid Token");
  }
};

module.exports = {
  authMiddleware,
  adminAuthMiddleware,
};
