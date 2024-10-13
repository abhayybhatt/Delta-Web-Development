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


