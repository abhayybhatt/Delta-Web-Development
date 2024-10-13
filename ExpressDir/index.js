const express = require('express');
const app = express(); //express ye ek function hota hai aur ye jo bhi return krke dega usko ham app naam ke variable mein rakh lenge, app is the general convention for using a variable to store whatever express() funtion returns. This 'app' variable will help us in creating our server-side web application. Also note that this variable named 'app' is an object. 

let port = 3000;//*Ports are the logical endpoints of a network connection that is used to exchange information between a web server and a web client. Aisa point jaha hamara client hamare server ke saath baat krega. Other port available for creating our own custom servers includes 8080.
app.listen(port, ()=>{ //listen method is a webserver that listens to incoming API requests.
    console.log(`app is listening on port ${port}`);
});

// Server ko start krne ke baad yaani after typing node index.js in your terminal and After typing localhost:3000 in your browser you'll get the following output: Cannot GET /
// iska matlab hai ki server to chal rha hai lekin apni requests ke liye uske pass koisa suitable response nhi hai. 

// Sending a Response: Start mein jo hamare request object mein httprequest aati hai, wo ek text-based request hoti hai jisko express object mein convert kr deta hai(yaani parsing ho gyi yaha!). text-based isliye rehti hai taaki baaki languages jaise python wagera bhi request ko samajh sake aur hamara node js object form mein request leta hai so..
// app.use((req,res)=>{ app.use() saari requests ko listen krta hai.
//     console.log(req);
//     console.log('Request received.');
//     let code = '<h1>Fruits</h1> <ul><li>apple</li><li>orange</li></ul>';
//     // res.send({
//     //     name: "apple",
//     //     color: "red"
//     // });// is js ke object ko express convert kr dega to json format, aur wo  dikhega hamko.
//     res.send(code);
// });

// Routing: it is a process of selecting a path for traffic in a network or between or across multiple networks. Yaani network pr jab bhi request bhejenge to kaunse path pr request bhejenge, path yaani jaise /home, /search, etc. Alag path pr request bhejne pr hamare pass alag responses aate hai. Aisa alag alag paath ke liye alag alag response dena ho to we use app.get(path, callback) method.
// Note: simply '/' means defualt path(root path) 
// Note: ek baar mein ek hi response bhej sakte hai, yaani ek path ke liye ek hi response jaata hai. 

// app.get('/', (req, res)=>{
//     res.send('Hello, I am root.');
// });
// app.get('/apple', (req, res)=>{
//     res.send('You contacted apple path.');
// });
// app.get('/orange', (req, res)=>{
//     res.send('You contacted orange path.');
// });
// app.get('*', (req, res)=>{//'*' ka matlab hai all paths. yaani upar ke paths ke alawa user koi aur path enter krta hai to usko yaha ka standard response milega.
//     res.send("this page doesn't exist.");
// });
// app.post('/',(req,res)=>{
//     res.send('You sent a post request to root.');
// });

// Nodemon:To automatically restart server with code changes. Code ke andar jaise hi nayi changes krenge to wo automatically restart hota rhega hamein alag se band krke wapis chalu nhi krna padega. Nodemon bhi ek package hai inside npm. It is generally saved GLOBALLY.
// npm install -g nodemon 
// ab server start krne ke liye instead of typing node index.js, we'll type nodemon index.js. 
// Path parameters: Social media websites jaise instagram pr to millions of path hai, to iska matlab ye hai ki developer ne millions of paths code ki single file pr likhe hai? Nhi, aise mein hamare path ke saath ham generally kuch variable values send kr sakte hai jinko ham path parameters kehte hai. Ye variable change hota rehta hai. To aisa krne pr instagram / ke baad jo bhi path aayega usko as a varibale  treat krta hai. Aur varibales ko ham use krte hai in the form of path parameters. To send a variable we use '/:' in the argument field of app.get(or post or any such) method.  Ham output mein string ya html code bhi bhej sakte hai.
app.get('/:username/:id', (req, res)=>{
    let {username, id} = req.params;
    // console.log(req.params);
    let htmlStr = `<h1>Welcome to the page of @${username}!</h1>`;
    // res.send(`Welcome to the page of @${username}.`);
    res.send(htmlStr);
});
// is tarah se custom pages generate hote hai. 
// Query strings: jaise google mein apan apple search krte hai to search krne ke baad url mein aata hai '?q=apple', isko query String kehte hai(we've studied it before). Agr hamein url mein  kuch request kiya hai usnig some query strings, to usko aise handle krenge:
app.get('/search',(req,res)=>{
    // console.log(req.query);//jo bhi ham additional informatin bhejte hai in the form of query strings, wo information req object ke query parameter mein aakr store ho jaati hai.
    // res.send('no results.');
    let {q} = req.query;
    if(!q){
        res.send('<h1>Nothing searched.</h1>');
    }
    res.send(`<h1>search results for query: ${q}</h1>`);
});

// Templating:
// EJS (Embedded JavaScript templates)
// EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. Jab kisi same website mein koisa same layout baar baar use ho rha hota hai to aise mein apan template ka use krte hai. Template is kind of like a blueprint. EJS ki help se apan ek html template bana payenge jismein Js ka bhi logic likh payenge.  