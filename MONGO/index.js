// Mongoose:
// A library that creates a connection between MongoDB & Node.js JavaScript Runtime Environment
// It is an ODM (Object Data Modeling) Library.
// Installation:
// npm i mongoose

// Official Documentation: mongoosejs.com

const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/test"); //connect method ki help se apan mongoDB ke database ke saath connect kr rhe hai. MongoDB ke liye by default port hota hai 27017. 127.0.0.1 localhost ko hi kehte hai lekin recently unhone yhi use krne ko bola hai instead of localhost kyuki kuch alag devices pr localhost ki alag value ho jaati hai, https protocol ki jagah mongodb use ho rha hai. aur test hamara by default database hai jisse apan connect hone ki koshish kr rhe hai. Kuch bhi naam rakh sakte hai test ki jagah.
// Note: connect ek asynchronous method hai. to iske ye saare methods ko apan ko asynchronously hi handle krna padega. To ye funtion hamare liye ke promise return krega, us promise pr apan then() method(jab promise successfully resolve ho jaata hai tab isko use krte hai na!) perform kr sakte hai.
// So, we'll write the same above line in this manner: 
main().then((res) =>{
    console.log('connection successful.');
})
    .catch((err) => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
//once a connection is established, we can start performing our CRUD operations.

// Schema(Overall Structure): Schema defines the shape of the documents within that collection.
// similar to sql, agr har ek collection ka schema define ho gya, to har ek document ko us schema ko follow krna padega. Same rule applies, but table and rows will be replaced by collection and documents here.
const userSchema = new mongoose.Schema({
    name: String,//yha har ek type Capital letter se start hoga is baat ka dhyan rakhna.
    email: String,
    age: Number,
});

// Models: Model in mongoose is a class with which we construct documents.
// Agr collections ke liye documents create krna hai, to uske liye we use a special class known as model class.
const User = mongoose.model('User', userSchema);//pehla User jo hai wo hai apni model class(Mongoose model), uske baad jo User likha hai wo hai apna Collection name, generally Model name and Collection name are kept same. Inke alawa third hai apne us collection ka Schema jo ki is case mein hai userSchema. Generally, hamare collection ka naam Captial letter se start hoga aur uske naam ki singular value hogi- not plural(Users). Collection name and Model name are kept same. 
// ab itne part ko terminal pr node index.js krne se hamara User collection mongoDB shell mein ban jaata hai, jisko apan check kr sakte hai using show collections in MongoDB shell.  But--there are some changes: 
// Agar ham yha se apne collection ka naam "User" pass krenge, to mongoDB shell mein hamare collection ka naam ho jayega "users". Jo bhi starting Captial letter hoga mongoDB mein jaakr small ho jayega aur singular name agr yha diya  hai to automatically mongoDB mein uska plural naam dikehga.

// Ye convention hai hamare Mongoose code ka jo hamein follow krna hai. 

// const Employee = mongoose.model('Employee', userSchema);
// ab ye jo class bani hai iska apan ko object banana hai jisse ki apan document construct kr sake. Aisa keh sakte hai ki Model collection ko represent krta hai aur object document ko.

// INSERT:
// Inserting One

const user1 = new User({//new instance of our model User
    name: 'Adam',
    email: 'adam@yahoo.in',
    age: 48,
});
// userl.save() //to save in DB
// user2.save() //to save in DB

// node ke repl mein we'll type .load index.js to access its contents. by default mongoose instance mein ek _id property ko add kr dega. terminal mein fir user1 type krne ke baad apan dekh payenge ki document to create ho jayega lekin apan usko mongoDB mein save kaise kre?=> uske liye ham use krenge ye statement:
// user1.save();//bydefault method of instances, ye bhi ek asynchronous function hai jo ki ek promise return krke deta hai, since promise return ho rha hai, we'll use then() as well.

// const user2 = new User({//new instance of our model User
//     name: 'Eve',
//     email: 'Eve@yahoo.in',
//     age: 48,
// });

// user2.save()
//     .then((res)=>{
//         console.log(res);//yha wahi same document aayega as a promise.
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// INSERT
// Inserting Multiple

// For some exceptional cases, ho sakta hai ki hamein multiple data insert karana ho, aise mein we'll use:
// User.insertMany([//User model ka ye ek method hai jisse apan bulk mein data insert kr sakte hai, it takes an array within its parameter, that consists of all the entries to be added.
//     {name: 'Tony', email: 'tony@gmail.com', age: 50},
//     {name: 'Peter', email: 'peter@gmail.com', age: 30},
//     {name: 'Bruce', email: 'bruce@gmail.com', age: 47},
// ]).then((res)=>{
//     console.log(res);
// });

// Note:
// Mongoose uses "Operation Buffering"
// Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB. Yaani Database ke ban ne ke pehle se hi mongoose lets us create its models, schemas, and we can also perform insertion queries inside it as well, jabtak aap ye kaam kroge, tabtak mongoose automatically aapka MongoDB se connection bana lega.

// FIND:
// Model.find() //returns a Query Object (ek thennable object return hoga)
// *Mongoose Queries are not promises. But they have a .then() method. Yaani jab bhi Model.find() function ko use krte hai to wo kabhi bhi promise return nhi krta, wo query object return krke deta hai, jispr apan .then() method fir bhi use kr sakte hai.

// User.find({age: {$gt: 48}})//ye find similarly wo values lega jo ki apan ne mongoDB shell mein practice kre the.
//     .then((res)=>{
//         // console.log(res);
//         console.log(res[0].name);//jo bhi data DB se aa rha hai, usko apan is tarah se filter out krke sirf apne kaam ki information nikaal sakte hai, ye fayda hota hai Js pr baithe baithe apni queries ko run krne ka!
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// Model.findOne() //returns a single result

// User.findOne({_id:'6718f0c53e5eefa0a2b069f7'})// Maximum cases mein ham kisi user ko find krna hoga to  uski id ke basis pr hi krte hai. id se search itna frequently use hota hai ki apne pass ek specific method bhi hota hai aisa id se search krne ka: Model.findById()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

User.findById('6718f0c53e5eefa0a2b069f7')// yha parameter mein bas id ki value pass krna hai within quotes.
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});

// UPDATE:
// Model.updateOne(): Condition ke basis pr jo bhi pehla document match hoga wo update ho jayega.
// Model.updateMany(): Jitne bhi documents condition ke saath match krenge, wo sabhi update ho jayenge.

// Note: you can always visit mongoosejs.com website ke docs in case you're unable to understand these methods, and want to understand other methods as well that are not listed here.
// To Update Bruce's age from 47 to 49:
// User.updateOne({name:'Bruce'}, {age: 49})//jaha name Bruce hai waha uski age update kr do to 49. Note: Mongo Shell mein apan set operator ka use krte the, pr yha simply apan apni final value likh sakte hai.
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// User.updateMany({age: {$gt: 48}}, {age: 55})
// .then((res)=>{
//     console.log(res);//yha hamein object return hokr milta hai, aur saath mein metadata bhi aata hai, ye hamein updation ke saath updated value nhi deta hai terminal mein, lekin agr updated value bhi chahiye to 2 aur methods hai  jinka same kaam hai: Model.findOneAndUpdate() aur Model.findByIdAndUpdate(). Inko apan findOne aur  findById method ka evolved form keh sakte hai jismein pehle to document ko find kro aur fir usmein updations kr do aur document ko id ke basis pr find kro aur usmein update kr do, respectively.
// })
// .catch((err)=>{
//     console.log(err);
// });

// User.findOneAndUpdate({name:'Bruce'}, {age: 35})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });
// Note: ho sakta hai yha apan dekhein ki age ki value to terminal mein update hi nhi hui, pe jab apan Mongo Shell mein dekhenge to updated value hi milegi. Aisa kyu? => kyuki ye method pehle us document ko find krke Print krta hai, uske baad us document mein updation krta hai. Is method ki working hi aisi hai. Agr ham chahte hai ki ye method updated document ko print kre, to hamein options wale third argument mein "new" option ki bydefault false value to true krna padta hai:

// User.findOneAndUpdate({name:'Bruce'}, {age: 42}, {new: true})//ab modified document return krke dega.
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// // Similar way mein findByIdAndUpdate kaam krta hai:
// User.findByIdAndUpdate('6718f0c53e5eefa0a2b069f7', {age: 45}, {new: true})//ab modified document return krke dega.
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// DELETE:
// Model.deleteOne() //returns count
// Model.deleteMany() //returns count

// User.deleteOne({name: 'Peter'})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// User.deleteMany({age: 48})//Adam aur Eve ka document delete ho jayega.
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });
// Ab in dono methods mein bhi wahi same problem hai jo update wale mein thi, srif count dikha  rhe hai aur jo document delete hua hai wo hamare liye print nhi kara rhe, jo delete hua hai usko bhi print karane ke liye hamare pass 2 aur methods hote hai: Model.findByIdAndDelete() and Model.findOneAndDelete()

User.findByIdAndDelete('6718f0c53e5eefa0a2b069f5')//Ab Tony ka document terminal mein bhi print ho jayega.
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});

// Aise hi apna User.findOneAndDelete() kaam krega. 
// We've successfully completed CRUD operations on Mongoose as well.

