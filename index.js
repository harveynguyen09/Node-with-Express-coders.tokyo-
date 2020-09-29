require('dotenv').config()
console.log(process.env)
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var useRouter = require('./route/user_router');
var productRouter = require('./route/product.router.js')
var authRoute = require('./route/auth.router.js')
var authoMiddleware = require('./middlewares/auth.middleware')

const { response } = require('express');

app.set('view engine','pug');
app.set('views','./views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET))

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/styles/custom.css',(req,res)=>{
    res.send('abc');
})

app.use('/users',authoMiddleware.requireAuth,useRouter);
app.use('/product',authoMiddleware.requireAuth,productRouter);
app.use('/auth',authRoute);

app.listen(port,()=>{
    console.log('server listening to port 3000')
})