const express = require('express');
const mongoose = require('mongoose');

const authRoutes=require('./routes/authRoutes');
const cookieParser=require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authmiddleware');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');
app.use(checkUser);


// Logout

const dbURI = 'mongodb+srv://node:m2BMdmH9cDpLRYas@cluster0.foitk.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', requireAuth,(req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.use(authRoutes); 

//cookies
app.get('/set-cookies',(req,res)=>{
 //res.setHeader('set-cookie','newUser=true');
 res.cookie('newUser',false);
 res.cookie('isEmployee',true,{maxAge:1000*60*60*24,httpOnly:true});
 res.send('you got the coookies');
})

app.get('/read-cookies',(req,res)=>{
  const  cookies=req.cookies
  console.log(cookies);
  res.json(cookies);
  
})