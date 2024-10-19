// Faker
// This npm package is used to generate fake data in our database.
// userld  username    email   password => these are the 4 main parameters that we want faker to generate
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));//kyuki ham patch request bhejenge aur uske saath mein hamara form ka data aayega, us data ko parse krne ke liye we'll use this statement.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const connection  = mysql.createConnection({
    host:  'localhost',
    user: 'root',
    database: 'delta_app',//wo name use kro jis name se tumne mysql workbench se database banaya hai.
    password: 'root'
});


// let getRandomUser = ()=>{
//     return {
//       id: faker.string.uuid(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     };
// };

let getRandomUser = ()=>{
    return [ //array return kara rhe hai so that iska content directly hamare database mein jaakr store ho jaye
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
};

// let q = "show tables";
// insert into user table using placeholders(?):
// let q = "insert into user(id, username, email, password) values (?,?,?,?)";//insertion query for single user entry
let q = "insert into user(id, username, email, password) values ?";//insertion query for multiple users entry
// let user = ['123','123_newuser', 'abc@gmail.com', 'abc'];
// let users = [//array of arrays
//     ['123b','123_newuserb', 'abc@gmail.comb', 'abcb'],
//     ['123c','123_newuserc', 'abc@gmail.comc', 'abcc']];
let data = [];
for(let i = 1; i <= 100; i++){
    data.push(getRandomUser());//data array mein 100 aise random users ka data add kr rhe hai, 100 fake users.
}
// try{
//     connection.query(q, [users], (err,res)=>{//agr hamari query ko placeholders milenge, to unki values user array se uthakar query mein use krne ki koshish krega, that's how we can pass multiple values dynamically within a query. Note: yha single user entry ke liye ham sirf: user parameter pass krenge, not [users].
//         if(err) throw err;
//         console.log(res);
//         console.log(res.length);
//     });
// }catch(err){
//     console.log(err);
// }

// connection.end();
// console.log(getRandomUser());

// MySQL2 Package:
// To connect Node with MySQL.
// connection.end(); //to close connection
// mysql naam ka bhi ek npm package hota hai lekin usko use nhi krenge kyuki usmein kaafi saare authentication erros ko face kr sakte hai. 
// mysql2 package hamare database(sql) ko server(backend) se link krega. 

// Using SQL from CLI:
// /usr/local/mysql/bin/mysql -u root -p
// Create schema.sql
// source schema.sql //in CLI

// Setting up Express App:
// GET/          Fetch & show total number of users on our app
// sql query: select count(*) from user;
//Home Route
app.get('/', (req,res)=>{
    let q = `SELECT count(*) FROM user`;
    try{
    connection.query(q,(err,result)=>{//same code for [data]
        if(err) throw err;
        // console.log(result[0]["count(*)"]); //agr kisi object mein hamien kisi specific key ki value chahiye, to we use: result[0].key nhi to we can use: result[0][our_key_name].
        let count = result[0]["count(*)"];
        // res.send(result[0]["count(*)"]);//abhi numerical value return kr rha hai to status samajh rha hai!
        res.render('home.ejs', { count });
        });
    }catch(err){
        console.log(err);
        res.send('Some error in DB.');
    }
});

// GET/user         Fetch & show (userld, username, email) of all users
//Show Route
app.get('/user',(req,res)=>{
    // res.send('success.');
    let q = `SELECT * FROM user`;
    try{
        connection.query(q,(err,users)=>{//same code for [data]
            if(err) throw err;
            // console.log(users);
            // res.send(users);
            res.render('showusers.ejs', {users});
            });
    }catch(err){
        console.log(err);
        res.send('Some error in DB.');
    }
});

// EDIT Route
// GET /user/:id/edit              To get form to edit the username, based on id. This form will require a password
// PATCH /user/:id                 To edit username, if correct password was entered in form
app.get('/user/:id/edit', (req, res)=>{
    let { id } = req.params;//id nikaalne ke liye
    // console.log(id);
    let q = `SELECT * FROM user WHERE id = '${id}'`;//kyuki string value pass kr rhe hai isliye alag se '' add krna padega, nhi to ismein sirf uski value jayegi, wo as a string nhi jayegi.
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            // console.log(result);
            let user = result[0];
            // res.send(users);
            res.render('edit.ejs', { user });
            });
    }catch(err){
        console.log(err);
        res.send('Some error in DB.');
    }
});

//UPDATE(DB) Route
app.patch('/user/:id', (req,res)=>{
    // res.send('updated.');
    let { id } = req.params;//id nikaalne ke liye
    let {password: formPass, username: newUsername} = req.body;
    // console.log(id);
    let q = `SELECT * FROM user WHERE id = '${id}'`;//kyuki string value pass kr rhe hai isliye alag se '' add krna padega, nhi to ismein sirf uski value jayegi, wo as a string nhi jayegi.
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            // console.log(result);
            let user = result[0];
            // res.send(users);
            if(formPass!=user.password){//checking if the password entered is same as the actual password of that user or not.
                res.send('Wrong Password.');
            }else{
                let q2 = `UPDATE user set username = '${newUsername}' WHERE id= '${id}'`;//new username set kr rhe hai jo hamein req.body se nikaala tha.
                connection.query(q2, (err, result)=>{
                    if(err) throw err;
                    res.redirect('/user');
                });
            }
            });
    }catch(err){
        console.log(err);
        res.send('Some error in DB.');
    }
});

app.listen('8080', ()=>{
    console.log('Server is listening to port 8080.');
});

//Inserting data in bulk:
// try{
//     connection.query(q, [data], (err,res)=>{//same code for [data]
//         if(err) throw err;
//         console.log(res);
//         console.log(res.length);
//     });
// }catch(err){
//     console.log(err);
// }

// NOTE: Change in DB is permanent. Even if you'll restart the server, the updated values will remain consistent in that DB.

// Homework Tasks:
// 1. Create Form to Add a new user to the Database POST req.
// 2. Create Form to Delete a user from Database if they enter correct email id & password. DELETE req, also add a new button alongside Edit button named Delete for performing the same.

// 1. Adding a new user to the Database:
app.get("/user/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
    let { username, email, password } = req.body;
    let id = uuidv4();
    //Query to Insert New User
    let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        console.log("added new user");
        res.redirect("/user");
      });
    } catch (err) {
      res.send("some error occurred");
    }
});

// 2.Deleting a user from database if they enter correct email and password:/
app.get("/user/:id/delete", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        res.render("delete.ejs", { user });
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });

  app.delete("/user/:id/", (req, res) => {
    let { id } = req.params;
    let { password } = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
  
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
  
        if (user.password != password) {
          res.send("WRONG Password entered!");
        } else {
          let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
          connection.query(q2, (err, result) => {
            if (err) throw err;
            else {
              console.log(result);
              console.log("deleted!");
              res.redirect("/user");
            }
          });
        }
      });
    } catch (err) {
      res.send("some error with DB");
    }
  });