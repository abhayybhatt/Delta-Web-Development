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

  // MongoDB: 
  // The Shell
  // mongosh //to start
  // use college //to create & use a new database called "college"
  // run this command on your terminal: sudo brew services start mongodb-community@7.0 //if version is 7.0

  // MongoDB shell Shortcuts: ctrl+l to clear screen. 
// help: displays all mongoDB commands. 
// show dbs: shows databases. 
// to exit MongoDB shell: type exit or quit. 

// Note: MongoDB shell internally recongnizes Js commands as well, similar to Node. Hence, jo browser console pr apan Js ke commands chalate hai, wo yha pr bhi chal jayenge.

// Whenever we open MongoDB Shell, it creates a temporary  database for us, jaha ham data store kr sakte hai, by default us database ka naam hai 'test'.

// To create our own DB: use "database_name" agr exisiting database hoga usi naam ka to apan usmein chale jayenge, lekin agr nhi hoga to wo us naam se ek naya  DB create kr dega. 
// MongoDB ke liye koi bhi database permanent tab banta hai jab ham usmein koi bhi data  insert kr dete hai, until then, it is treated as temp DB. 
// db: to print our current working database. 
// Data in MongoDB is inserted in a special format named :
// BSON Data (Binary JSON)
// json format ke andar kuch issues hote hai jo bson format solve krta hai: pehla to ye ki json is text based format jiski parsing krna difficult rehti hai, dusra ye ki json space inefficient hota hai, as it is a text-based format. In problems ko bson format solve kr deta hai. Json has lesser no. of data types than bson.
// ham mongo ko data to json format mein hi dete hai, lekin usko mongo binary json mein pehle convert krta hai fir memory mein store krta hai. 
// Can visit this website for more info: mongodb.com/json-and-bson 

// Collections:
// Document : Mongo stores data in form of documents (BSON docs)
// Collection : MongoDB stores documents in collections.

// Jaise sql mein apne pass database hota tha jismein multiple tables hoti thi, har table ke andar bahut saari rows ho sakti thi. har row mein individual  data store hota hai, jisko apan tuple bhi kehte hai.
// Similarly,  MongoDB mein apne pass ek database hota hai, usmein multiple collections hote hai(similar to tables in sql), aur collections different documents ko store krte hai. Yha jo documents hai, wo sql ke andar rows hoti thi, yha pr ek document individual data store karata hai.

// INSERT in DB:(Another name for Create from CRUD)
// insertOne:

// db.collection.insertOne() : Inserts a single document into a collection.
// show collections (similar to show tables; in sql)
// If a collection does not exist, MongoDB creates the collection when you first store data for that collection. 
// Camel case Js ke funtions mein bhi use hota hai aur yha MongoDb ke funtions mein bhi use hota hai. 
// mongodb.com/docs/manual/crud/

// db.collection.insertMany() : Inserts multiple documents into a collection.

// To create a collection 'student': 
// db.student.insertOne( { name: "adam", marks: 79 } ) : inserts the single document data into a collection named "student".

// jab bhi ham koisa document  insert krte hai to mongoDB automatically us inserted document ko ek unique id assign kr deta hai, aur  ye id hamare us inserted document ki Primary Key hoti hai.

// db.student.find() : agr student collection ke documents ko dekhna hai to we use this command, documents kisi collection mein array ke andar store hote hai.
// sql ki tables mein pehle hamein uska schema batana padta tha, yaani apni table ke andar kaunse kaunse columns hone wale hai, to add a new column hamein schema ko change krna padta tha. Lekin MongoDB mein ham koi ek set of key-value pair de sakte hai aur dusre set mein koi alag hi set of key-value pair de sakte hai, flexible schema in short. 

// insertMany (array of documents):
// db.student.insertMany([{ name: "bob", marks: 65 }, { name: "eve", city: "Delhi" }])
// db.collection.insertMany () : inserts multiple documents into a collection.
// yha ek array pass krenge argument mein, containing all the documents separated by , 

// FIND in DB:(Read from CRUD)
// db.collection.find() //returns everything
// for specific queries:
// db.collection.find({ key: value }) => ex: db.student.find({city:'Delhi'}) //saare documents return kr do jinki key-city ki value-Delhi hai.
// db.coIlection.findOne( { key: value }) //isse bhi pehle ye match kr jaaye ye value wo return kr do.

// Key Difference between find and findOne function: find function hamein ek cursor return krke deta hai jabki findOne funtion hamein actual document return krke deta hai. findOne mein sirf ek document print hota hai {} jabki find funtion hamein ek array return krta hai jiske andar wo document hai [{}]. Kyuki find function hamein ek cursor return krta hai, which is a reference to the original document, yaani cursor jo actual document ki taraf point krta hai, aur findOne hamein actual document return krta hai.
// to cursor kyu return kra? => cursor ki help se agr bahut saara data aata hai to us data pr apan loop kr sakte hai, for accessing individual data.
// Can pass more than one key-value pair in these funtions: db.collection.find({ key1: value1, key2: value2 })

// Query operators in Find function:
// Q. Find students where marks > 75
// db.student.find( {marks: {$gt: 75}} ) //gt yaani greater than, agr gte hota to greater than or equal to. 
// Q. Find students who live in Delhi or Mumbai
// db.student.find( {city: {$in: ["Delhi", "Mumbai"]}})//Cities ki list pass kr di, in operator check krega jo list pass kr di usmein koi matching value hai ya nhi. Note: values yha pr case-sensitive hoti hai, agr 'delhi', 'mumbai' kr diya to koi output nhi milega in this case.
// Q. Find students who scored > 75 or live in Delhi
// db.student.find({$or: [{marks:{$gt: 75}, {city: 'Delhi'}]}) //or operator queries ko join kr deta hai, or operator ke baad ek array pass kr denge jismein apni multiple conditions specify kr sakte hai.

// operators ke saamne pehle hamesha $ sign lagega.  

// UPDATE in DB: (Update from CRUD)
// updateOne
// db.collection.updateOne() : Updates at most a single document that matches a specified filter even though multiple documents may match the specified filter.
// db.collection.updateOne( <filter> , <update>, <options> ) //filter yaani kisi condition ke basis pr kisi particular document ko select krna. update yaani kya update krna hai wo specify kro.
// db.student.updateOne( {name: "adam"}, {$set: {marks: 99}} ) //set se apan nayi field(key-value) pair add kr sakte hai. agr wo field  pehle se hi exist krti hai to uski value ko ham change kr sakte hai. $set is also an alias for $addFields, matlab addFields ki jagah sirf set ko bhi use kr sakte hai.

// Update Operators:
// $addFields
// $set
// $project
// $unset
// $replaceRoot
// $replaceWith

// db.collection.updateMany() : Update all documents that match a specified filter.
// db.collection.replaceOne() : Replaces at most a single document that match a specified filter even though multiple documents may match the specified filter. 
// replace ka kaam hota hai pure document ko kisi nayi cheez ke saath hi replace kr dena. Note: replaceOne se saari fields update ho jaati hai, except id, yaani jo id us document ki pehle thi wahi id abhi bhi rhegi.

// Nesting: jaise javascript objects mein nesting ho jaati hai, waise hi yha pr bhi ho jaati  hai.
// agr let's say ek document hai: {
//   name: 'farah',
//   performance: {
//     marks: 88,
//     grade: 'A'
//   }
// }
// ab aise mein apan shell mein likhenge: db.student.find({marks: 88}) , to wo kuch return nhi krega kyuki jis value ko search kr rhe hai wo to performance naam ki key mein stored hai. to fix this, we'll write: db.student.find({'performance.marks':88})//yaani performace key ke andar jo marks key hai uski value 88 ho. isko string format mein hi pass krte hai isliye '' likha  hai. That's how we access keys in nested form.

// DELETE in DB:(Delete from CRUD)
// deleteOne: db.collection.deleteOne( <filter> , <options> )//filter(conditon) pass krenge, jo pehla match hoga usko delete kr denge.
// deleteMany: db.collection.deleteMany( <filter> , <options> )//jitne bhi dcouments filter se match krenge, delete ho jayenge.
// db.student.deleteMany({}) //saare documents ko delete kr do, matlab apne current working database ko empty kr do.
// db.dropDatabase() //deletes our current working(selected) database.
