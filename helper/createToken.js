const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, "userbango1945", { expiresIn: "12h" });
  },
};
