var express=require('express')
var path=require('path')
var session=require('express-session')
var expressvalidator=require('express-validator')
const jwt=require('jsonwebtoken')
var bodyparser=require('body-parser')
var app=express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//global variables
app.locals.errors=null;
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use(session({secret:'cat'}))
app.get('/',function(req,res)
{
	if(req.session.email){
		res.redirect('home')
	}
	else{
		res.redirect('index')
	}

})
app.get('/home',function(req,res)
{
if(req.session.email){
	res.write('<h1>user logged in </h1><a href="/logout">Logout</a>')
	res.end()
}else{
	res.write('<h1>user not logged in</h1><a href="/login">Login</a>')
	res.end()
	
}

})
app.get('/index',function(req,res)
{

	res.render('index')

})

app.get('/login',function(req,res)
{

	res.render('login')

})
app.get('/logout',function(req,res)
{
	req.session.destroy(function(err){
		if(err)
		{
			res.negotiate(err)
		}
		else{
			res.redirect('/')
		}
	})
})
app.post('/login',function(req,res)
{
	req.session.email=req.body.email
	req.session.password=req.body.password
	res.redirect('/home')
})
app.listen(3000,function(){
	console.log('connected')
})