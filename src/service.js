const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getTransport = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateToken = (email) => {
  const expirationDate = new Date();
  expirationDate.setMinutes(new Date().getMinutes() + 45);

  return jwt.sign({ email, expirationDate }, process.env.JWT_SECRET_KEY);
};

const getMailOptions = (email, link) => {
  let body = `
  <img width="50" height="100" src="https://th.bing.com/th?id=OIP.3GeB2h2-NuvZ_hUPC-LXiAAAAA&w=200&h=150&c=8&rs=1&o=6&pid=5.1" alt="app-logo"/>
  <h2>Hey! ${email}</h2>
  <p>Click on this link to login to your account</p>
  <a href=${link}>Sign In</a>
  <p>Please note that for added security this link becomes invalid after 45 minutes</p>
  <h5>@Kellyncodes</h5>`;

  return {
    body,
    subject: "Kellyncodes Safe Login Link",
    to: email,
    html: body,
    from: process.env.EMAIL_USER,
  };
};

module.exports = { getMailOptions, generateToken, getTransport };
