require('dotenv').config();
const express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 80

app.use(express.json())
app.use(cors())
app.listen(port, function (req, res) {
    console.log('Server is running at port: ', port);
});

app.get('/', function (req, res) {
    res.send('ok')
});

app.post('/send-email', function (req, res) {
    const { email, subject, name, text } = req.body
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER_NAME,
            pass: process.env.SMTP_PASSWORD
        }
    })
    let mailOptions = {
        from: 'Portfolio Mails',
        to: process.env.USER_EMAIL,
        subject: subject,
        html: `<h1>Hello, I'm ${name}!</h1>
        <h2>My email is: ${email}</h2>
        <p>${text}</p>`
    };

    transporter.sendMail(mailOptions);

    res.send('email sended')
})
