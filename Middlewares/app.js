// Middlewares:
// Middleware in Express are functions that come into play after the server receives the request and before the response is sent to the client. It is an intermediary. Aise functions jo request ke aane ke baad aur response ke jaane ke pehle hamare server ke andar kuch kaam ke liye use hote hai.
// Common middleware functions :
// methodOverride: PUT, DELETE, UPDATE request ko bhi send kr sakte hai html forms mein iska use krke.
// bodyParser: Request ki body ke andar ka data, jisko Express app(backend server) nhi samajh nhi aata, isliye usko parse krke understandable format mein convert krna padta hai jo iski help se hota hai.
// express.static: apni backend ki static files ko frontend ke client ko serve krne ke liye. static files yaani hamara relted css ya js, ya koi image. To is tarah ki static files ko apne frontend client ko serve krne ke liye ham use krte hai.
// express.urlencoded: request ke andar ke data ko access krne ke liye.

// Properties:
// 1. Middlewares can access our req and res objects.
// 2. Middlewares ke andar chaining possible hoti hai - ek middleware function kisi dusre middlware function ke pass control bhej rha hai, wo dusra middleware function kisi teesre middleware function ko control pass krta hai, and so on..  Agr request aa rhi hai, aur hamein beech mein 2-3 kaam krwane hai, to uske liye alag alag middleware functions use kr sakte hai jo ek ke baad ek call ho rhe hai, uske baad hamara response send ho rha hai.
// 3. Middleware chahe to khud ek response bhejkr us chaining ko rok sakta hai. Jaise hi agr chain ke kisi bhi middleware function ne response send kr diya, to uske aage ke aur middleware functions call nhi honge.

// What do middlewares do?
// Middleware functions can perform the following tasks:
// • Execute any code.(jaise koi normal js ka function kr sakta hai, waise hi.)
// • Make changes to the request and the response objects.
// • End the request-response cycle.(agr middleware ne hi koisa response send kr diya to.)
// • Call the next middleware function in the stack.(chaining.)

const express = require('express');
const app = express();
const ExpressError = require('./Expresserror');

// Note: Middlewares ko generally code ke start mein hi likhte hai, kyuki agr wo baaki requests ke baad mein likhe gye to req ya response pehle wale jo code likhe hai unse match ho jaati hai aur hamara fir middleware kaam ka hi nhi rehta. 

// 1st Middleware:
// app.use() ke saath isliye likhte hai jisse ki apna middleware har request aur response ke saath work kre. 
// app.use(()=>{
//     console.log('Hi, I am a Middleware.');
// });
// hamare middleware ke pass do hi choices hai:
//  1. wo response send kr de, jisse hamara execution ruk jayega.
//  2. next middleware ko, jo bhi aage operation hona chahiye usko call kr de, use control dede. 
// agr in dono mein se kuch bhi kaam nhi karaya gya to bas hamara page load hi hota rhega, kyuki usko kuch response hi receive nhi hua jo ki app.use() ko app.get('/',..) use krne se hua. 
// ab iski jagah response send krne wala middleware banate hai, jisse ki page loading mein hi ruka na rhe:
// app.use((req,res)=>{
//     let { query } = req.query;
//     console.log(query);
//     res.send('middleware finished.');
//});//ye har ek incoming request ke saath execute hoga jis wajah se hamare '/' aur 'random' wale paths pr bhi bas middleware finished hi likha aayega.
// Generally, middlewares ka use response send krne ke liye nhi hota, next sequence ko execute karane ke liye hota hai, jiske liye apan use krte hai next naam ka parameter.
// If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.

// Random Middlewares:
// app.use((req,res,next)=>{
//     console.log('Hi, I am first Middleware.');
//     next();// isse iske neeche wala(second middleware) call hoga.
// });
// app.use((req,res,next)=>{
//     console.log('Hi, I am second Middleware.');
//     next();// isko use krne ke baad jis bhi route pr jayenge ('/', 'random'), to uska bhi output ab show hoga. Note: next() ke baad bhi kuch lines of code likh sakte hai lekin generally isko end mein hi likhte hai(good practice). Kuch developers sirf next(); ki jagah return next(); bhi likhte hai, so that agr galti se koisa code uske baad bhi likh diya ho to wo execute hi na ho paye.
// });
// To start mein jo bhi middlewares likh diye, ye har ek request ke liye execute honge, chahe wo get, post, update, delete, ya koisi bhi request ho. Note: Middleware hamesha chalega, chahe apan galat route pr bhi agr chale jaye to, jaise '/abcd' path pr bhi agr jayenge tab bhi middlewares ka execution to hoga hi, bhale hi ye route defined ho ya nhi. Middlewares are always executed irrespective of what is sent on the request body or how the request is structured.

//Utility Middlewares(jo useful ho): ye Logger ki tarah act krenge. Loggers yaani wo functions jo cheezein log krwane  mein help karate hai, log yaani console mein print karana.
//similar to logger - morgan:
// app.use((req,res,next)=>{
//     //kyuki middlewares have the power to add or update request object:
//     req.time = new Date(Date.now()).toString();//Date.now() exact time print krke deta hai. Usko readable format mein change krne ke liye apan isko new Date object mein wrap krke .toString() method laga dete hai to make it human-readable.
//     // console.log(req);//request object print ho jayega console/terminal mein.
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });

// Middlewares act like callbacks in app.use() function.
// If needed, ham middlewares ko sirf kuch specific paths ke liye bhi use kr sakte hai:
app.use('/random', (req,res,next)=>{
    console.log('I am only for random page.')
    next();
});

// General Usecase 1 of Middlewares: you might've noticed that kuch developers jab api develop krte hai, to wo restful manner mein apis ke paths kuch is tarah se define krte hai: /api/listings, /api/listings/:id, etc. Aise mein let's say agr ham chahte hai ki user jab bhi koisi link se hamari website pr aata hai to wo pehle hamesha login kre uske baad hi wo aage ke webpage ko login kr payega, to aise mein we can use a middleware on '/api' path, aur usmein apan authectication wala part likh sakte hai, so that wo user authenticated tab hi ho hamara api ka path use krne ke liye jab wo login kr le pehle, doing so protects our specified path('/api' in this case) aur beech mein authectication/validation ki  ek layer daal sakte hai. 
// General Usecase 2 of Middlewares: Middlewares ko sabse last mein bhi likh sakte hai sabhi requests ke baad for giving errors like : "404 Page not found".


// Handling Errors:
// Express Default Error Handler. development stages mein syntax errors to handle ho jaati hai. Lekin jab production stage mein(jab baaki users hamare project ko use kr rhe ho) koi error aati hai to usko resolve krne ka kuch mechanism hona chahiye. errors kaisi bhi ho sakti hai jaise ki agr mongoDB database hi nhi chal rha ho jo apan ne apne project mein use kiya tha, ya fir let's say hamne maps show  krne ke liye google maps ki api use kri thi, lekin ab google ne policy changes ke baad uski maps api ka access deny kr diya ho, etc. Ab in error messages ko handle krna kaafi important hai kyuki ham nhi chahte ki hamare client(user) ko zyada na pata chale ki error kya hai, aur User Experience kharab na ho(max users ko code ka experince hi nhi hota, to wo waise bhi nhi samajh payenge ki ye code ya error kyu aa rhi hai.)
app.get('/err',(req,res)=>{
    abcd = abcd; //wrong syntax,and this statement makes no sense. Isse hamein webpage pr ReferenceError milega aur stacktrace bhi mil jayega(yaani error kaha se start hua aur kaise wo further propagate hua, kaise aage badha.) Ye Express ka default handler hota hai.
});

// Activity: API Token as Query String:
// Let's create a middle-ware for an api that checks if the access token was  passed in the query string or not. /api ka route hai jo response mein data bhejta hai, lekin wo data tab hi bhejega jab query string mein hamara /api?token=giveaccess ya aisa kuch aayega tab hi ye data aayega.
// Multiple Middlewares: Methods jaise app.get() aur app.post() mein apan multiple Middlewares ek saath pass kr sakte hai. 
const checkToken = (req,res,next)=>{//authenctication layer laga di /api path pr!
    let {token} = req.query;//query string se token ki value nikaal rhe hai.
    if(token === 'giveaccess'){
        next();
    }
    // throw new Error('ACCESS DENIED.');// isse apan custom error message send kr sakte hai. Pr generally, ham aise generic errors throw nhi krte, khudki error classes banakr errors ko throw kr sakte hai. Aur agr ham chahte hai ki baaki ka error code jo default error handler show krta hai wo bhi show na ho to wo bhi kr sakte hai by developing our own custom error handling mechanisms.
    throw new ExpressError(401,'ACCESS DENIED.');//hamari custom Error class. Parameters -> status code, message.
};
app.get('/api', checkToken, (req, res) => {//yha apne upar wale middleware ko as a function pass kr diya(checkToken). Hamara token sirf check tabhi hoga jab /api pr request jayegi.
    res.send('data');
});

app.get('/', (req,res)=>{
    res.send('Hi, I am root.');
});

app.get('/random', (req,res)=>{
    res.send('This is a random page.');
});

// Activity: Error Class
// Create an admin route & send an error with a 403 status code.
app.get('/admin', (req,res)=>{
    throw new ExpressError(403, 'Access to admin is Forbidden.');
});

// Error Handlers:
// Creating Custom Error handling Middleware:
app.use((err,req,res,next)=>{
    // console.log('------ERROR-------');
    let {status = 500, message = 'Some Error Occured.'} = err; //status aur message ham hamare err object se deconstruct krke nikaal rhe hai. status = 500 ek default value di hai status ko, agr status undefined ho jaata hai('/err' pr ho rha hai kyuki status ki usko kuch value hi nhi mil rhi us error pr) to usko 500 value de denge. Similarly for message, default value is assigned as well.

    // next(err);//yha pr next will search for next non-error handling middlewares. Agr hamein express ke default error handler ko agr trigger krna hota hai webpage pr to aise mein hamein err value deni padegi err() ke andar. Is statement ka matlab hai ki hamnein apni taraf se to error handle kr liya, ab aage kaunsa aisa error handler hai jo error handle kr sakta hai, wo custom bhi ho sakta hai nhi to default error handler bhi ho sakta hai.
    // res.send(err);//error client-side pr show hoga. ye error jaise nhi dikhega kyuki isko bydefault express ne handle nhi kiya, hamare new Expresserror class ka ye error aaya hai. 
    res.status(status).send(message);//jaise hi res object ke pass status 401 aaya wo samajh gya ki ab normal status 200 OK wala response send nhi krna, error send krna hai kyuki status code 401 hai. Aur jo message hamein res object ko diya hai wahi screen pr print hokr aayenga(ACCESS DENIED, in this case). Sending our own errors to client-side.
});

// app.use((err,req,res,next)=>{
//     console.log('--------ERROR 2 Middleware-------');
//     next(err);//to basically ham normal middlewares mein sirf next() end mein likhenge aur error handling middlewares mein next(err). next() yaani ham ab normal non-error handling middlewares ko call laga rhe hai aur next(err) matlab ham error handling middlewares ko call lagana chah rhe hai.
// });
// Lekin aise error handle krne mein problem hai: bahut bada error message aa rha hai and if we want ki ham error ko thoda better aur client-friendly fashion mein kaise show karein, to uske liye we use: Error class.
// Error Class:
// Custom
// Status codes in the range 400-499:  Client error messages. Errors generated on client-side. EX: 400 bad request,403 forbidden, 404 Not found etc.
// Status codes in the range 500-599:  server error messages. Errors generated on server-side. EX: 500 Internal  server error(the server has encountered a situation it does not know how to handle), 502 Bad Gateway, 504 Gateway Timeout, etc.

app.listen(8080,  ()=> {
    console.log('Server is running on port 8080');
});

//404
app.use((req,res)=>{
    res.status(404).send('Page not found.');//hoppscotch.io pr dekh sakte hai isse hamare response ka status bhi 404 hi aayega.
}); 

// Handling Async errors: 
