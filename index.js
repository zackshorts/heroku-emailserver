/*
* Sends email to support@zachary.shorts.com from the contact form on zacharyshorts.com
* */

const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type, application/x-www-form-urlencoded');
    next();
});

app.get('/', (req, res) => res.send('Heroku app is running!'));
app.post('/sendemail', (req, res) => {
    console.log(req.body.name);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'support@zacharyshorts.com',
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.name + " : " + req.body.message,
    };
    sgMail.send(msg).then().catch();
    res.sendStatus(200);
});

app.post('/sendsantaemail', (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(req.body.to);
    console.log(req.body.message);
    const msg = {
        to: req.body.to,
        from: 'santaclaus@gmail.com',
        subject: 'Code word: Santa\'s got a brand new bag',
        text: req.body.message,
    };
    sgMail.send(msg).then().catch();
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
