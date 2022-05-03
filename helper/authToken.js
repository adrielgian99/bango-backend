const { decode } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, "userbango1945", (err, decode) => {
      if (err) {
        return res.status(401).send("User Not Auth!");
      }
      req.user = decode;

      next();
    });
  },
};
