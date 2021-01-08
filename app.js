const path = require('path');
const express = require ('express');
const mongoose  = require('mongoose')
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db'); 
//const index = require('./routes/index');
//const { session } = require('passport');


//load config
dotenv.config({path:'./config/config.env'});
//passport config
require('./config/passport',(passport))

connectDB();

const app = express();


// Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//method Override
app.use(methodOverride(function(req,res){
  if(req.body && typeof req.body === 'object' & '_method' in req.body){
    // look in urlencoded POST bodies and delete it
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

//logging
app.use(morgan('common'));


//handlebars Helpers
const { 
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select} = require('./helpers/hbs');

//handlebars

app.engine('.hbs', exphbs({ 
  helpers:{
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
}, defaultLayout: false,
  //  layoutsDir: "views/layouts/",
  extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    
    //store:new MongoStore({ mongooseConnection: mongoose.Connection}),
     
  })
  );

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global var
app.use(function(req,res,next){
  res.locals.user = req.user || null;
  next(); 
})

//static
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const port =process.env.PORT||2030;

app.listen(port, console.log (`server running on port ${port}`) 
);