const express = require('express');
const path = require('path');
const mongoose = require('mongoose');// Mongodb Backend connector
const bcrypt = require('bcrypt');  // Password encryption
const { mainModule } = require('process');

// Error handling in case of error to connect to database
main().catch(err => console.log(err));

// connecting to data base
async function main() {
    await mongoose.connect('mongodb://localhost:27017/NetBank');
}

// Defining schemas

// Signup Schema
const signupSchema = new mongoose.Schema({
    name: String,
    phone: String,
    mail: String,
    cnic: String,
    password: String
});

// Login Schema
const loginSchema = new mongoose.Schema({
    id: String,
    password: String
});

// Creating Our Model
const signup = mongoose.model('Account', signupSchema);
const login = mongoose.model('ActiveUser', loginSchema);

const app = express();
const port = 80;
const bcryptRounds = 10;

app.use(express.urlencoded());
app.use('/static', express.static('static'))
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))
app.use('/stylesheets', express.static('stylesheets'))

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

// Endpoints
app.get('/', (req, res) => {
    res.render('home.pug');
})

app.post('/login', async (req, res) => {
    result = 0;
    signup.find({ mail: req.body.username }, function async(err, result) {
        if (err) {
            res.statusCode(400).send("<h1>Unknown Error</h1>");
            return console.error(err);
        }
    })
    let passwordCompare = await bcrypt.compareSync(req.body.password, result.password);
    if (passwordCompare) {
        res.statusCode(200).render('usermessage.pug', { msg: "logged in successfully" });
    } else {
        res.statusCode(400).send("<h1>Invalid Login Credentials</h1>");
    }
})

app.post('/signup', async (req, res) => {
    // Encrypting Data
    let hashedPassword = await bcrypt.hash(req.body.password, bcryptRounds);
    console.log(hashedPassword);

    // creating object of data received from user in accordance with contactSchema
    let myData = signup({
        name: req.body.username,
        phone: req.body.phone,
        mail: req.body.email,
        cnic: req.body.cnic,
        password: hashedPassword
    }
    );
    // Saving Data
    myData.save().then(() => {
        // On success
        console.log("Data Saved to db successfully.")
        res.render('login.pug');
    }).catch(() => {
        // On error
        console.log("Unable to save data to database.")
        res.render('signup.pug')
    });

    console.log(req.body);
})

// res.render('usermessage.pug', {msg: "HI"});
app.get('/Login', (req, res) => {
    res.render('login.pug');
})

app.get('/signup', (req, res) => {
    res.render('signup.pug');
})

app.get('/contact', (req, res) => {
    res.render('contact.pug');
})

app.get('/complains', (req, res) => {
    res.render('complains.pug');
})

app.get('/reviews', (req, res) => {
    res.render('reviews.pug');
})

app.get('/services', (req, res) => {
    res.render('services.pug');
})

app.get('/pay-bills', (req, res) => {
    res.render('pay-bills.pug');
})

app.get('/apply', (req, res) => {
    res.render('apply.pug');
})

app.listen(process.env.PORT, () => {
    console.log(`The server is started at http://localhost:${port}`)
})

//     let a = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/