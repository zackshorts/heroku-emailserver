const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('Heroku app is up and running!'));
app.post('/sendemail', (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: 'support@zacharyshorts.com',
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.name + " : " + req.body.message,
    };
    sgMail.send(msg).then(r=>console.log(r)).then(err=> console.log(err));
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
