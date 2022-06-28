require('dotenv').config();
const express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 80


app.use(cors())
app.listen(port, function (req, res) {
    console.log('Server is running at port: ', port);
});

app.get('/', function (req, res) {
    res.send('ok')
});

app.get('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER_NAME,
            pass: process.env.SMTP_PASSWORD
        }
    })
    let mailOptions = {
        from: req.body.from, // sender address
        to: process.env.USER_EMAIL, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
        html: <h1>Gamarjoba</h1> // html body
    };

    transporter.sendMail(mailOptions);

    res.send('email sended')
})
