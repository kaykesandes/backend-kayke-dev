const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
const port = process.env.PORT || 5000;
const stmp = process.env.STMP;

const resend = new Resend(stmp);

router.post("/contact", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  
  const name = `${firstName} ${lastName}`;

  const mail = {
    from: 'onboarding@resend.dev',
    to: "kaykegy@proton.me",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  resend.emails.send(mail)
    .then(response => {
      res.json({ code: 200, status: "Message Sent" });
    })
    .catch(error => {
      res.json({ code: 500, status: "Error sending message" });
    });
});


router.get("/test", (req, res) => {
  res.send("API is running successfully!");
});

app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
