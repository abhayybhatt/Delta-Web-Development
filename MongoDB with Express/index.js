const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));//tha ham bata rhe hai ki hamari static files jaise ki css aur js ho gyi, ye kaha se serve hone wali hai, which as in this case is public folder, jisko views ki tarah hi path.join method se specify kara hai.
app.use(express.urlencoded({extended: true}));// for parsing the data from post request from req.body
app.use(methodOverride('_method'));


main()
.then(()=> console.log('Connection successful.'))
.catch((err)=> console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1 = new Chat({
//     from: 'neha',
//     to: 'priya',
//     msg: 'send me your exam sheets.',//agar apan koi bhi extra information mongoose ke through mongoDB ko bhejte hai to wo DB mein add nhi hota. jaise agr yha msg ki jagah message field bheji hoti jo ki apne schema mein defined hi nhi hai, to mongoDB is message ko add hi nhi krta collection mein.
//     created_at: new Date(), //in-built method in Js jo ki apan ko koisi bhi random date generate krke de deta hai.
// });

// chat1.save()//UTC time format mein time aata hai terminal mein, last mein Z likha rhega.
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// Chats:
// Index Route
// GET /chats  -> shows all chats
app.get('/chats', async (req,res)=>{ 
    let chats = await Chat.find(); //saara data apne collections ka aa jayega.
    // console.log(chats);
    res.render('index.ejs', { chats });
});

// New & Create Route:
// GET /chats/new -> yha jaane ke baad form render hoga usmein details bhar denge apan.
// POST /chats -> yha form fill krne ke baad apan redirect ho jayenge.
//New Route
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
});
//Create Route
app.post('/chats',(req,res)=>{
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),     
    });
    newChat.save()//yeh asynchronous function hai.
    .then((res)=>{ console.log('chat was saved.')})//jaha .then() use hota hai waha generally await likhne ki zarurat nhi.
    .catch((err)=>{console.log(err)});
    res.redirect('/chats');
});

// Edit & Update Route:
// GET /chats/:id/edit -> edit form display kara denge, usmein msg edit.//Edit Route
// PUT /chats/:id -> us edit form ko submit krenge to put request jayegi, jo Database mein wo changes kr degi.//Update Route

//Edit Route:
app.get('/chats/:id/edit', async (req,res)=>{
    let {id} = req.params;//id ke basis pr pure chat ko DB mein search krenge.
    let chat = await Chat.findById(id);//kyuki findById asynchrnous function hai.
    res.render('edit.ejs', { chat });
});

//Update Route:
app.put('/chats/:id', async (req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;//jo naya message enter kara hai editing form mein usko extrace krne ke liye. {msg: newMsg} isliye use kara kyuki newMsg to kuch hai hi nhi req.body ke andar, hamein usi msg ko rename krna hai isliye sirf {newMsg} error dega.
    //ab apne DB mein id ke basis pr apni chat ko search krna hai aur usko update krna hai, so we will use:
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect('/chats');
});

// Destroy Route:
// DELETE /chats/:id -> deletes the chat along with its id.
//Destroy Route:
app.delete('/chats/:id', async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');
});
app.get('/', (req,res)=>{
    res.send('root is working.');
});

app.listen(8080, ()=>{
    console.log('App is listening on port 8080.');
});

// Creating the Model:
// Chat will have :( _id, from, to, message, created_at)

// Initialize Database: jab kisi project pr kaam krna ho aur database se deal krna ho to achha rehta hai agr hamare pass kuch sample data ho, taaki apan apne empty database ko initialize krke testing kr paye usmein.
// init.js: ismein apan DB ko initialize krne ka code likhenge, isko bas ek baar run krenge jab sample data se apne DB ko initialize krna hota hai.


