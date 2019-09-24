const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/sendemail', (req, res) => {
    sgMail.setApiKey('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');
    const msg = {
        to: req.body.to,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.message,
    };
    sgMail.send(msg).then().catch();
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
