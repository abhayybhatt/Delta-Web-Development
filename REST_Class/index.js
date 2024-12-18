// REST:
// Representational State Transfer
// REST is an architectural style that defines a set of constraints(rules) to be used for creating web services. REST is not any package, it's just  a set of rules.
// RESTful apis wo hoti hai jo REST ke rule ko apply krti hai. Generally,  RESTful apis are used for performing CRUD(Create, Read, Update, Delete) operations on database.

// CRUD Operations:
// GET retrieves resources.(Read)
// POST submits new data to the server.(Create)
// PUT updates existing data.(pura complete data agr update krna hai to)(Update)
// PATCH updates existing data partially.(Update)
// DELETE removes data.(Delete)
// resource: jis pr apne crud operations perform krna hai, example: Quora Posts mein "Post" apni resource hai Development ki language mein.

// Creating RESTful APIs:
// GET             /posts              to get data for all posts        INDEX Route(main route used for viewing the data)
// POST            /posts              to add a new post                CREATE Route(that creates new data)
// GET             /posts/:id          to get one post (using id)       VIEW Route(to view specific data)
// PATCH           /posts/:id          to update specific post          UPDATE Route
// DELETE          /posts/:id          to delete specific post          DESTROY Route

const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4:uuidv4 } = require('uuid');//using version 4 of uuid package
// uuidv4();//ab isko yha use krne ki jagah  isko id ki values assign krne mein use krte hai in our posts array. 
const methodOverride = require('method-override');
const { request } = require('http');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));//matlab bata rhe hai ki ab yha backend mein method override package chalega, jaha bhi _method aa gya form action mein waha ye override  kr dega us form ke previous method ko, with its own method specified.

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/posts', (req,res)=>{
    res.render('index.ejs', { posts });
});

app.get('/posts/new', (req,res)=>{
    res.render('new.ejs');
});

app.post('/posts', (req,res)=>{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    // res.send('Post request working.');
    res.redirect('/posts');//ye by default GET request hi bhejega hamare /posts url pr.
});

app.get('/posts/:id', (req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);//array ka find funtion har ek individual post ke liye jaha bhi hamari post ki id (p.id) hamari id ke saath match kr jayegi, to wo hamein value return krke dedega jiko ham post variable ke andar store kara lenge. Ye sab kr kyu rhe hai? => to ensure ki hamare pass undefined id na aaye.
    // console.log(post);
    // res.send('request working.');
    res.render('show.ejs', { post });
});

app.patch('/posts/:id', (req,res)=>{
    let { id } = req.params;//jo bhi id aayi hai url mein usko simply deconstruct krke print kara lenge.
    let newContent = req.body.content; //jo request ki body mein apan content bhejenge us  new content parameter ki new value ham is variable mein store kara lenge.
    // console.log(id);
    let post = posts.find((p) => id === p.id);
    // console.log(newContent);
    post.content = newContent;
    console.log(post);
    // res.send('patch request working.');
    res.redirect('/posts');
});

app.get('/posts/:id/edit', (req,res)=>{
    let { id } = req.params;//id ko nikaal lo
    let post = posts.find((p) => id === p.id);//post ko nikaal lo
    res.render('edit.ejs', { post });
});

app.delete('/posts/:id', (req,res)=>{
    let { id } = req.params;//extracting id
    // let post = posts.find((p) => id === p.id);//extracting post to be deleted
    posts = posts.filter((p) => id !== p.id);//posts.filter hamare liye saare wo posts lekr aayega jaha id hamare post.id ke equal nhi rhegi. To yeh kyu kara?=> jis post ko delete krna hai, uski id ke alawa baaki saari posts ki id bachi rhengi jo ki filter hoke hamari posts wali array mein hi chali jayengi, matlab jo delete krna hai us post ki jagah baaki saari posts hi bachengi ab us array mein.
    // res.send('delete success.');
    res.redirect('/posts');
});

app.listen(port, ()=>{
    console.log('listening to port: 8080');
});

// Implement : GET/posts
// Index Route
// GET          /posts              to get data for all posts

let posts = [
    {
        // id: '1a',//jab databses se deal krte hai tab id automatically create ho jaati hai, every id is unique.
        id: uuidv4(), //ab ye function har baar ek alag aur unique id laakr dega.
        username: "apnacollege",
        content: "I love coding!",
    },
    {
        // id:'2b',
        id: uuidv4(),
        username: "aagam",
        content: "Hard work is important to achieve success",
    },
    {
        // id:'3c',
        id: uuidv4(),
        username: "rohankoul",
        content: "I got selected for my 1st Internship!",
    },
];

// Implement: POST/posts
// Create Route
// POST            /posts              to add a new post

// 2 routes:
// • Serve the form    GET                /posts/new
// • Add the new post  POST               /posts

// pehle route mein ek button ko add krke apan new post create kr sakte hai, us button pr click krne pr hamara ek form khulega, wo form user aur content ka data lega. Jaise hi ham form ko submit krenge hamari second route wali POST request jayegi, jo naye post ko add krne ka kaam kregi. 
// Express mein ek bdhiya cheez hai jisse apan different pages ko connect kr sakte hai: 
// Redirect:
// res.redirect( URL )
// apne response ko redirect kr rhe hai to some other URL. iske status 3 se start hote hai, meaning that response ne kuch redirect kiya hai, by default, 302 return krta hai.

// Implement : GET /posts/:id
// Show(View) Route
// GET         /posts/:id              to get one post (using id)

// ab har naye created post ko id assign kaise kare? ek automatic tarika hai for assigning new unique id to each new post:
// Create id for Posts:
// UUID Package
// Universally unique identifier
// npm install uuid
// ab use kaise krte hai, uske liye simply go to npmjs.com and search uuid to get its usage instructions.

// Implement : PATCH /posts/:id
// Update Route(to edit content)
// PATCH       /posts/:id              to update specific post
// yha specific post ko update kr rhe hai isliye PATCH request use ho rhi hai, agr saari posts ko ek baar mein kisi value se update krna hai to we can use PUT request, aur syntax saara similar rhega. 

// Create Form for Update:
// Edit Route
// Serve the edit form         GET             /posts/:id/edit

// html forms mein ek problem hoti hai: unki help se apan sirg GET and POST requests hi bhej paate hai, ab yha update krne ke liye apan ko PATCH request lagegi, to aisa kaise ho ki form se request bhi chali jaye edit krne ki, aur hamari app.patch line ke andar cheezein accept bhi ho jaye?=> we'll use another npm package named method-override. Agr ham kisi form se POST req bhej rhe hai aur chahte hai ki saari POST req DELETE req mein change ho jaye, ya PUT mein ya PATCH req mein change ho jaye, to us case mein ye package purane method ko override krke naye method ko waha override kr dega. Har jagah jaha bhi POST req hogi usko PATCH req se ye replace kr dega- jugaad
// and we'll use query override method here, which is provided in npmjs.com website. 

// Implement :     /posts/:id
// Destroy Route
// DELETE          /posts/:id          to delete specific post


// Now try: Instagram page(photo and caption, along with a unique id field), or twitter or threads, or you can create your own blog page and perform CRUD operations on them. Most of the APIs like twitter APIs for example, are implemented using the same RESTful method.

// Create: POST request
// Read: GET  request
// Update: PUT/Patch request
// Delete/Destroy: DELETE request

// What is a Database?
// It is a collection of data in a format that can be easily accessed.
// Why databases?
// • can store large data
// • features like security, scalability etc.
// • Easier to insert, update, search or delete data
// In practical life, all CRUD operations are performed on Databases.

// SQL v/s NoSQL 
//         SQL                             NoSQL
// Relational Database             Non Relational Database
// (data stored in Tables),       (data stored in documentlkey-vallgraphs etc.)
// here, tables are also called 
// relations.        
// eg - MySQL, Oracle,             eg - MongoDb, Cassandra, Ne04j etc.
// PostgreSQL etc. 

// SQL (Structured Query Language):
// SQL is a programming language used to interact with relational databases.
// columns hamein apni table ka design batate hai, yaani usmein kya kya stored hai, aur kis tareeke ka data hai apni relation(table) mein. Databases ki langauage mein we call it Schema. Schema yaani design of our table, yaani apni table mein kya kya stored hai.
// rows hamein ek  particular entry ka pura data deti hai. In rows ko databases ki language mein apan tuple kehte hai. And a tuple is the complete information of a single entry or entity.
//Install MySql Community version along with mysql workbench.

// Our 1st Database:
// CREATE DATABASE db_name;
// DROP DATABASE db_name;
// USE db_ name;
 
// SQL is not case-sensitive. 

// Our 1st Table: Defining the schema
// CREATE TABLE table _ name (
// column _ namel datatype constraint,
// column _ name2 datatype constraint,
// column _ name2 datatype constraint
// );
// defining constraints is optional. 
// Database Queries:
// CREATE DATABASE db_name;
// CREATE DATABASE IF NOT EXISTS db_name;
// DROP DATABASE db_name;
// DROP DATABASE IF EXISTS db_name;
// SHOW DATABASES;
// SHOW TABLES;

// Table Queries:
// • Create: to create a table.
// • Insert: to insert rows(tuples) into the table.
// • Update: to update data inside the table.
// • Alter: to alter the schema of our table(alter columns in our table).
// • Truncate: to delete whole data inside the table and make it empty.
// • Drop: deletes the table completely.

// Create Table(defining schema/columns):
// CREATE TABLE table_name (
// column_namel æpe constraint,
// column_name2 datatype constraint,
// );

// varchar is used instead of char for more optimized memory usage. range for both char and varchar: 0-255
// BLOB data type also does the same work and has more range: 0-65535
// tinyint: integer data type with range -128 to 127. 
// unsigned: if you only want to store integers from 1 to 200, you'll still have to use int type which has large range, instead we can write no TINYINT UNSIGNED, which means that it won't have negative nos. and the range of tinyint will become 0-255!

// Constraints:
// Rules for data in the table
// NOT NULL                    columns cannot have a null value
// UNIQUE                      all values in column are different
// DEFAULT                     sets the default value of a column
// CHECK                       it can limit the values allowed in a column
// PRIMARY KEY                     makes a column unique & not null(automatically) but used only for one

// CREATE TABLE temp (
//     id int not null,
//     PRIMARY KEY (id)
//     );

// FOREIGN KEY                     prevent actions that would destroy links between tables

// CREATE TABLE temp (
//     cust_id int,
//     FOREIGN KEY (cust_id) references customer(id)
//     );

// salary INT DEFAULT 25000

// CONSTRAINT age_check CHECK(age >= 18 AND city = 'Delhi')

// What are Keys?
// Keys are special columns in the table.
// Primary Key:
// It is a column (or set of columns) in a table that uniquely identifies each row. (a unique id)
// There is only 1 PK & it should be unique and NOT null.
// Foreign Key:
// A foreign key is a column (or set of columns) in a table that refers to the primary key in another table.
// FKs can have duplicate & null values.
// There can be multiple FKs.

// Insert into Table:
// INSERT INTO table_name
// (colname1, colname2)
// VALUES
// (col1_v1, col2_v1),
// (col1_v2, col2_v2);

// Select Command:
// Selects & Shows data from the DB.
// Syntax:
// SELECT col1, col2 FROM table_name;
// Syntax (to show all, * is read as 'all'):
// SELECT * FROM table_name;
// select distinct age from user; to select distinct(unique) age from age column of our table, used when we want to select unique data.

// Where Clause:
// To define some conditions
// SELECT col1, col2 FROM table_name
// WHERE conditions;

// Where Clause:
// Operators:
// Arithmetic Operators : +(addition) , -(subtraction), *(multiplication), /(division), %(modulus)
// Comparison Operators : = (equal to), != (not equal to), > , >= , <, <=
// Logical Operators : AND, OR , NOT, IN, BETWEEN, ALL, LIKE, ANY
// Bitwise Operators : & (Bitwise AND), | (Bitwise OR), \ is pronounced as "pipe"
// Frequently used Operators:
// AND (to check for both conditions to be true)
// OR (to check for one of the conditions to be true)
// BETWEEN (selects for a given range)
// IN (matches any value in the list)
// NOT (to negate the given condition)

// Limit Clause:
// Sets an upper limit on number of (tuples) rows to be returned
// SELECT col1, col2 FROM table_name
// LIMIT number;

// Order by Clause:
// To sort in ascending (ASC) or descending order (DESC)
// SELECT col1, col2 FROM table_name
// ORDER BY col_ name(s) ASC;

// Aggregate Functions:
// Aggregate functions perform a calculation on a set of values, and return a single value.
// • COUNT()
// • MAX()
// • MIN()
// • SUM()
// • AVG()
// Example:
// SELECT max(marks) from student;

// Group by Clause:
// Groups rows that have the same values into summary rows.
// It collects data from multiple records and groups the result by one or more column.
// SELECT col1, col2
// FROM table_name
// GROUP BY col_name(s);

// *Generally we use group by with some aggregation function.
// Having Clause:
// Similar to Where i.e. applies some condition on rows.
// But it is used when we want to apply any condition after grouping.
// SELECT col1, col2
// FROM table_name
// GROUP BY col_name(s) 
// HAVING condition;
// • WHERE is for the table, HAVING is for a group
// • Grouping is necessary for HAVING

// General Order:
// SELECT column(s)
// FROM table_name
// WHERE condition
// GROUP BY column(s)
// HAVING condition
// ORDER BY column(s) ASC;

// Table Queries:
// Update (to update existing rows)
// UPDATE tablename
// SET col1 = val1, col2 = val2
// WHERE condition;

// Table Queries:
// Delete (to delete existing rows)
// DELETE FROM table_name
// WHERE condition;
// agr where clause yha use nhi kiya to ye saari rows to delete kr dega. 

// Table Queries:
// Alter (to change the schema)
// ADD Column:
// ALTER TABLE table_name
// ADD COLUMN column_name datatype constraint;
// DROP Column:
// ALTER TABLE table_name
// DROP COLUMN column_name;
// RENAME Table:
// ALTER TABLE table_name
// RENAME TO new_table_name;
// CHANGE Column (rename):
// ALTER TABLE table_name
// CHANGE COLUMN old_name new_name new_datatype new_constraint;
// MODIFY Column (modify datatype/ constraint):
// ALTER TABLE table_name
// MODIFY col_name new_datatype new_constraint;

// Truncate (to delete table's data)
// TRUNCATE TABLE table_name;

// Practice Qs:
// Qs: Create a database for your college.
// Create a table named Teacher to store (id, name, subject, salary)
// Insert following data in the table:
// 23, "ajay", "math", 50,000
// 47, "bharat", "english", 60,000
// 18, "chetan", "chemistry", 45,000
// 9, "divya", "physics", 75,000

// • Select teachers whose salary is more than 55K
// • Rename the salary column of teacher table to ctc
// • Update salary of all teachers by giving them an increment of 25% => salary = salary + (.25) * salary
// • Add a new column for teachers called city. The default city should be "Gurgaon"
// • Delete the salary column for teacher table

// Qs: Create a table to store student info (roll _ no, name, city, marks).
// Insert following data in the table:
// 110, "adam ", "Delhi", 76
// 108, "bob", "Mumbai", 65
// 124, "casey", "Pune", 94
// 112, "duke", "Pune", 80

// • Select all students who scored 75+
// • Find names of all cities where students are from
// • Find the maximum marks of students from each city(no repetition, so remember 'distinct' keyword)
// • Find the average of the class
// • Add a new column grade, assign grade such that:
//     marks > 80, grade = O
//     marks 70-80, grade = A
//     marks 60-70, grade = B
