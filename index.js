require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/weatherRoute');
const bodyParser = require('body-parser');
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/EnterCities',(req,res)=>{
    res.render('EnterCity');
})

app.get('/GetWeather',(req,res)=>{
    res.render('GetWeather',{name:"kj"});
})

app.use('/',router);


app.listen(8999,()=>console.log("server started"));