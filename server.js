const express = require('express');
const morgan = require('morgan');
const bodyParser =require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();

var profile = require('./profile');
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// then define the route that will use your custom router
app.use('/profile', profile)

// Here we're setting the default engine to be ejs
// note we don't require it, express will do that for that
app.set('views', './views');
// Now instead of using res.send we can use
// res.render to send the output of the template by filename
app.set('view engine', 'ejs');

app.use(express.static('dist'))

//makes you use the public folder to use images
app.use(express.static('public'))



// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs






app.use(morgan('dev'));
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));




  
app.get('/home', (req, res) => {
    res.render('home');
  });




app.get('/contact', (req, res) => {
    res.render('contact');
  });
  
  
app.get('/about', (req, res) => {
    res.render('about');
  });

  
  app.get('/projects', (req, res) => {
    res.render('projects');
  });

 




  app.post('/thanks', (req, res) => {
    console.log(req);
    const msg = {
        to: 'ireynoso760@gmail.com',
        from: req.body.email,
        subject: 'New Contact',
        text: req.body.comment,
        };
    sgMail.send(msg).catch(err => console.log(err.response.body));
    res.render('thanks', { contact: req.body })
  });



  app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Ivan',
            lastName: 'Reynoso',
        }
    }

    // Notice now the data is the second argument passed to the template render method
    res.render('index', data);
});




app.get('/',(req,res) => {
    res.render('index');
});

// app.listen(8080, () => {
//     console.log('listening at http://localhost:8080');
// });


app.listen(process.env.PORT || 5000)