const express = require("express");
const router = express.Router();
const cors = require("cors");
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const resend = new Resend('re_MvKpK8Bk_Q5cSJ6bYB26ooQC4yyA6UW44');

router.post("/contact", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  
  const name = `${firstName} ${lastName}`;

  const mail = {
    from: 'onboarding@resend.dev', // Use o endereço de e-mail do remetente
    to: "kaykegy@proton.me", // Defina o destinatário correto aqui
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


module.exports = app