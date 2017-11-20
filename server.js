const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.port || 3000;

hbs.registerPartials( __dirname + '/views/partials');
app.set('view engine' , 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req , res , next)=>{
	let date = new Date().toString();
	let log = date + req.url;	
	fs.appendFile('Server.log' , log + '\n',(err)=>{
		console.log('unable to write');
	});
	next();
});

// app.use((req,res,next)=>{
// 	res.render('mentinance.hbs');
// 	next();
// });

hbs.registerHelper('getCurrentYear' , ()=>{
	return new Date().getFullYear();
})
app.get('/' , (req , res)=>{
	res.render('home.hbs' , {
		pageTitle : 'Home page',
		welcomeMessage : 'Welcome'
	});
});


app.get('/bad' , (req , res)=>{
	res.send({
		message : 'Error' 
	});
});

app.get('/about' ,(req , res )=>{
	res.render('about.hbs', {
		pageTitle : 'About page',
	});
})


app.listen(port , ()=>{
	console.log(`Server is up and runing on port ${port}`);
});