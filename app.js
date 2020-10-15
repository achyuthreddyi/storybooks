const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')


//load config
dotenv.config( { path: './config/config.env'})

//connect to db
connectDB()

const app = express()

// logging 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 5000


app.listen( PORT, console.log(`port running at port ${process.env.NODE_ENV} mode on ${PORT}`))