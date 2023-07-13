const express = require('express')
const app = express()
const path=require('path');
const hbs=require('hbs');
require('./db/connextion');
const Register=require('./models/student');
const port = 3000
const templatePath=path.join(__dirname,'templates/views');
const partialsPath=path.join(__dirname,'templates/partials');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath)


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.get('',(req,res)=>
{
    res.render('index');
})
app.get('/registration',(req,res)=>
{
    res.render('registration');
})
app.post('/registration',async(req,res)=>
{
    try{
        if(req.body.Password==req.body.ConfirmPassword)
        {
            const user=await new Register(req.body);
            console.log(user);
            user.save();
            res.status(201).render('index');

        }else{
            return res.status(400).send();
        }
    }catch(e)
    {
        console.log("error");
    }
})


app.get('/signin',(req,res)=>
{
    res.render('signin');
})
app.post('/signin',async(req,res)=>
{
    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log(`${email} and ${password}`);
        const userEmail="";
         userEmail=await Register.findOne({Email:email});
        console.log(userEmail.Password)
        if(userEmail.Password==password)
        {
            res.status(201).render('index');
        }
        else{
            res.send("details  are not correct");
        }
    }catch(error)
    {
        console.log("invalid login details");
    }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})