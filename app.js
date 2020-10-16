const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

const connectDB = require('./config/db')


//load config
dotenv.config( { path: './config/config.env'})

//passport config
require('./config/passport')(passport)

//connect to db
connectDB()

const app = express()

// logging 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Handle Bars
app.engine('.hbs', exphbs({defaultLayout: 'main',extname: '.hbs'}))
app.set('view engine', '.hbs')

//Sessiond middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

//Passport  middlewares
app.use(passport.initialize())
app.use(passport.session())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
//auth routes 
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000


app.listen( PORT, console.log(`port running at port ${process.env.NODE_ENV} mode on ${PORT}`))