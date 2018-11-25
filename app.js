const express = require('express');
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const path = require ('path');
const nodemailer = require ('nodemailer');

const app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get ('/', (req, res) => {
    res.render('contact');
    
    });

app.post('/send', (req, res) => {
const output = `
<p> You have a new contact </p>
<h3> contact details </h3>

<ul>
<li>Name: ${req.body.name} </li>

<li>Email: ${req.body.email} </li>

</ul>


`;

 
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'flaviocela22.5@gmail.com',
               pass: 'thenightmare'
           },
           tls:{
               rejectUnauthorized:false
           }
       });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Youniversity contact" <flaviocela22.5@gmail.com>', // sender address
        to: 'you.niversity2018@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output,
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('./thanku');
    });

});


app.listen(process.env.PORT || 80, () => console.log('server started...'));