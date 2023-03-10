const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { generateToken, getMailOptions, getTransport } = require("./service.js");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.get("/", (_, res) =>
  res.status(200).send({
    message: "Welcome, passwordless genius!",
  })
);

app.post("/login", (req, res) => {
  //Get email from request body
  const { email } = req.body;
  if (!email) {
    res.status(400).send({
      message: "Invalid email address.",
    });
  }

  //Prepare variables
  const token = generateToken(email);
  const link = `https://passwordless-auth.onrender.com/verify?token=${token}`;

  //Create mailrequest
  let mailRequest = getMailOptions(email, link);

  //Send mail
  return getTransport.sendMail(mailRequest, (error) => {
    if (error) {
      res.status(404).send("Can't send email.");
    } else {
      res.status(200);
      res.send({
        message: `Link sent to ${email}`,
      });
    }
  });
});

app.get("/verify", (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.status(401).send("Invalid user token");
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    res.status(401).send("Invalid authentication credentials");
    return;
  }

  if (
    !decodedToken.hasOwnProperty("email") ||
    !decodedToken.hasOwnProperty("expirationDate")
  ) {
    res.status(401).send("Invalid authentication credentials. boom");
    return;
  }

  const { expirationDate } = decodedToken;
  if (expirationDate < new Date()) {
    res.status(401).send("Token has expired.");
    return;
  }
  res.status(200).send("verification successful");
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
