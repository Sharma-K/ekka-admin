if(process.env.NODE_ENV !== "production")
{
    require('dotenv').config();
}

const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');


const User = require('./models/Admin');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/ekka'

main().catch(err => console.log(err));

async function main() {
    console.log('database connected');
  await mongoose.connect(dbUrl);
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: 'thisisasecret'
    },
    touchAfter: 24*3600
});
store.on('error', function(e){
    console.log('Sesssion store error', e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
// passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next)=> {
    res.locals.currentUser = req.user;
    next();
})


app.use('/admin/', userRoutes);
app.use('/product/', productRoutes);

app.get('/', (req, res)=>{
  
    res.render('index');
})



// app.get('/admin/user/register', (req, res) => {
//     res.send('regisered')
// })

// app.get('/auth/google', passport.authenticate('google',{scope:['profile']}))
// app.get('/auth/google/callback/', passport.authenticate('google',{failureRedirect:'/auth/fail'}),
// (req, res) => {
//     res.send('registered');
// }
// );



// app.get('/auth/fail',(req, res)=>{
//     res.send('failed');
// })



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('listening to port 3000');
})