require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const session = require('cookie-session');
const flash = require('connect-flash');
const colors = require('colors');
const app = express();




// Configrations
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
const MODE = process.env.MODE || 'production';

// configure HBS
app.engine('hbs', engine({extname:'.hbs'}))
app.set('view engine', 'hbs')


// Connect to db
require('./db')();

app.use(express.urlencoded({extended:false}))
app.use('/css', express.static('static/css'))
app.use('/images', express.static('static/images'))
app.use(session({secret:process.env.SESSION_SECRET}))
app.use(flash())

app.use((req, res, next)=>{
    res.locals.isLoggedIn = req.session?.user || null;
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    next()
})

// Routes



app.get('/', (req, res)=>{res.render('index', {docTitle: 'Index'})})
app.get('/testimony', (req, res)=>{res.render('testimony', {docTitle: 'Testimony'})})
app.get('/login', (req, res)=>{res.render('login', {docTitle: 'Login'})})
app.get('/register', (req, res)=>{res.render('register', {docTitle: 'Register'})})




app.use(require('./routes/auth'))
app.use(require('./routes/store'))
app.get('/store2-djoindoaliidnealdivvjielnglskdiensldifjeknsldivjelsiefn', (req, res)=>{res.render('store2-djoindoaliidnealdivvjielnglskdiensldifjeknsldivjelsiefn', {docTitle: 'Store2-djoindoaliidnealdivvjielnglskdiensldifjeknsldivjelsiefn'})})


app.get('*', (req, res)=>{res.render('404', {docTitle: 'Not found'})})




app.listen(PORT, console.log(`Server Running On Port ${PORT} at http://${HOST}:${PORT}`.blue))