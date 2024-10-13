const { Template } = require('ejs');
const express = require('express');
const app = express();
const path = require('path');
//ejs ko alag se require krne ki zarurat nhi padti kyuki express automatically ejs ko internally require kr leta hai.
const port = 8080;

// using EJS:
app.set("view engine", "ejs");//view means template here, to view engine ko ejs set kr liya yaha. By default view engine expect krta hai ki hamare saare ejs ke templates ek "views" naam ek folder mein hona chahiye for rendering, can have some other name as well pr generally apan views naam hi rakhte hai folder ka.
// Note: agr ham DeltaWEbD folder se nodemon EJSDir/index.js command run krte hai terminal mein to server chal to jayega, lekin wo views folder ko ab DeltaWEbD folder mein dhundhega, jo ki nhi hai. How to fix this problem? => by using path.join:
app.set("views", path.join(__dirname, "/views"));//path hamara ek package hota hai jisko hamein require krna padta hai. is statement ke through ham bata rhe hai ki hamara views naam ka folder hamein is specific jagah ke andar milega jo hamne abhi specify kr di hai yaha. __dirname hai index.js ki current working directory, yaani DeltaWebD/EJSDir usmein hamne join kr diya /views =  DeltaWebD/EJSDir/views.  Ab agr nodemon EJSDir/index.js krenge DeltaWebD dir se to error nhi dega.

app.get('/', (req, res)=>{
    // res.send('this is home.');
    res.render('home.ejs');//ejs se responses ko send nhi krte, responses ko render krte hai, render matlab files ko bhejna. Aur ismein ham normal files nhi, .ejs extension wali files ko bhej rhe hote hai(mix code of html+Js). .ejs lagayenge nhi to bhi code run krega, lagayenge to bhi run krega. by default view engine hamra views folder mein jaakr is file ko search krega.
});

app.get('/hello', (req,res)=>{
    res.send('hello');
});
app.listen(port, ()=>{
    console.log(`listening on port: ${port}`);
});

// Interpolation Syntax:
// Interpolation refers to embedding expressions into marked up text. ejs ke codes mein ham pura javaScript ka code, js ka logic embed kr sakte hai.
// ejs.co website mein jaakr Tags wale section mein jao for achieving that. 

app.get('/rolldice', (req,res)=>{
    let diceVal = Math.floor(Math.random() * 6) + 1;//assuming that database se hi ek random value aa rhi hai.
    // res.render('rolldice.ejs', {num: diceVal}); or we can also write it as:
    res.render('rolldice.ejs', {diceVal});
});


// Instagram EJS:
// Create a basic template for instagram page based on following route :
// /ig/:username
// Conditional Statements in EJS: Adding conditions inside EJS : using <% %> tag in ejs file
// Instagram page with EJS:
// const instaData = require("./data.json");
app.get('/ig/:username', (req,res)=>{
    // const followers = ['adam', 'bob', 'steve','jason'];
    // let { username }  = req.params;
    // console.log(username);
    let {username} = req.params;
    const instaData = require('./data.json');
    // console.log(instaData);
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs",{ data });
    }else{
        res.render('error.ejs');
    }
});

// Includes: a method to create sub-Templates. Another name for includes is partial. Agr ham chahte hai ki hamari ejs file ka head wala tag tak hamein baar baar na likhna pade to we can create another folder names includes inside views folder, aur uske andar apan create krenge head.ejs
// <%- include("includes/head.ejs"); %> 

