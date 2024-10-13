// Get & Post Requests:
// GET
// > Used to GET some response
// > Data sent in query strings
// (limited, string type data & visible in URL)
// Genrally used jab koi response wapis chahiye. Jaise google search ek GET request hogi.

// POST
// > Used to POST something (for Createl Writel Update)
// > Data sent via request body (any type of data)
// Agr kuch data upload/send krna hai, ya jab backend mein kuch change krna hoga to we use POST request. Jaise google drive pr kuch upload krne ki request.

// For better development practices, follow these conventions. 

const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));//standard line used whenever we use post  request. It is a middleware. Is line ka matlab hai ki jab bhi hamare pass urlencoded data aata hai to express usko automatically parse krke samajh lega. Is statement ke baad apan similar format mein data read kr sakte hai jaise ki currently apan app.get mein kr rhe hai.
app.use(express.json());//similar to the above line but for json data, jisse ki express json data ko bhi parse kr paye.

app.get('/register', (req,res)=>{
    let {user, password} = req.query;//yha pr hamara data query string ke through jaata hai, to usko aise apan access kr sakte hai.
    res.send(`Standard GET Response. Welcome ${user}!`);
});

// Handling Post requests:
// • Set up POST request route to get some response, yaani app.post() se kuch standard response  to hama tha pr de hi rhe hai.
// • Parse POST request data, for that we use req.body

app.post('/register', (req,res)=>{
    // console.log(req.body);//abhi express ko samajh mein nhi aayega data, uske liye abhi ye data readable format mein nhi hai isliye apne console mein undefined print hoga. usko readable format mein laane ke liye parse krna padega, uske liye check 19th line. aur yha undefined isliye print hoga kyuki kuch default data type nhi hota yha req.body ke andar, isliye bas undefined print hokr aayega.
    let {user, password} = req.body;

    res.send(`Standard POST Response. Welcome ${user}!`);//abhi to yha apne response ko send krne ke liye ham apne data ko use kr rhe hai, pr generally backend(server-side) mein ham is data ko database ke andar store karane ke liye use krte hai.
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

