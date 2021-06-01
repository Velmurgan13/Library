require('dotenv').config();


const express = require('express');
const app = express();


const expHbs = require('express-handlebars');

const indexRouter = require('./routes/index')

app.engine('hbs', expHbs({extname:'hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)




