const express = require('express');
const session = require('express-session');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// +------------Mail::Controller----------------+
const mailController = require(__dirname + '/controllers/mail.controller')

// Server Variables
const app = express();
const port =  process.env.PORT || 80;

// Session Middleware
app.use(session({
    secret: uuidv4(),
    // secret: 'Shafique@TempMailer', // a random string used to sign the session ID cookie
    resave: false, // Don't save the session if it wasn't modified
    saveUninitialized: false, // The user who came first will be assigned a cookie defaultly if true
    cookie: {
        maxAge: 18000000 //5 hour,  1 min = 60000
    }
}))

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

// View Engine Settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// End points for users 
// +----------------------------------+
// +------------Routes----------------+
// +----------------------------------+

// Home Page
app.get('/', mailController.homeGet);

app.get('/services', (req, res)=>{
   res.render('services.pug')
})

app.get('/blogs', (req, res)=>{
   res.render('blogs.pug')
})

app.get('/about', (req, res)=>{
   res.render('about.pug')
})

app.get('/contact', (req, res)=>{
   res.render('contact.pug')
})

// /mail/Change::GET
app.get('/mail/change', mailController.changeMailGet)

// /mail/delete::GET
app.get('/mail/delete', mailController.changeMailGet)

app.listen(port, () => {
    console.log(`The server is started at http://localhost:${port}`)
})