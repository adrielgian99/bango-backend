const sequelize = require("../lib/sequelize");
const Address = require("../models/Address");
const Admin = require("../models/Admin");
const Cart = require("../models/Cart");
const Category = require("../models/Category");
const InvoiceDetail = require("../models/InvoiceDetail");
const InvoiceHeader = require("../models/InvoiceHeader");
const MovementLog = require("../models/MovementLog");
const PaymentConfirmation = require("../models/PaymentConfirmation");
const Product = require("../models/Product");
const Stock = require("../models/Stock");
const User = require("../models/User");
const Warehouse = require("../models/Warehouse");
const WarehouseDistance = require("../models/WarehouseDistance");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");

module.exports = {
  get: async (req, res) => {
    try {
      const all = await User.findAll();
      res.status(200).send(all);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  add: async (req, res) => {
    let { full_name, email, password } = req.body;
    console.log(full_name);
    try {
      password = Crypto.createHmac("sha1", "hash123")
        .update(password)
        .digest("hex");
      console.log(typeof password);
      let user = await User.create({
        full_name,
        email,
        password,
        is_active: true,
      });
      console.log(user);
      let idNewUser = user.dataValues.id;

      let token = createToken({ full_name, email });

      let mail = {
        from: `Admin <no.reply.bango@gmail.com>`,
        to: `${email}`,
        subject: "Account Verification",
        html: `<a href='http://localhost:3000/authentication/${token}'>Click here for verification your account</a>`,
      };

      transporter.sendMail(mail, (errMail, resMail) => {
        if (errMail) {
          console.log(errMail);
          res.status(500).send({
            message: "Registration Failed!",
            success: false,
            err: errMail,
          });
        }
        res.status(200).send({
          message: "Registration Success, Check Your Email!",
          success: true,
        });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  verification: async (req, res) => {
    const update = await sequelize.query(
      `Update users set is_verified = true where id=${req.user.id}`
    );
    res.status(200).send({ message: "Verified Account", success: true });
  },
};
