function one(){
    return 1;
}
function two(){
    return one() + one();
}
function three(){
    let ans = two() + one();
    console.log(ans);
}
three();//call stack
// Breakpoints: jab bhi kisi code ki specific line pr ruk jaana hai , fir ek-ek step aage badhenge. Breakpoints are used for debugging. Browser se add krenge breakpoints "sources" tab mein jaakr. Wahi se call stack bhi dekh paoge. Step into next funtion call ko baar baar use krke. Aise apan debugging krte hai!
// Js is Single-Threaded: Matlab agr js mein koisa code likha hai to ek time pr code ke ek cheez(line) hi execute ho payegi. Ye achhi baat nhi hai, agr maanlo tumne new facebook account banaya, aur since database to pehle se hi kaafi saata data contain kr rha hai fb accounts ka, in that case tumne new fb account banaya to pura js us site ka wahi ruk jayega kyuki wo wait krega. And that's not good in real-time. 
// How to counter this single-threaded problem: using callbacks. Aise funtions jo dusre funtions mein as arguments jaate hai. agr hamein aise kaam karane hai jo database ya api ke completion pr execute ho to apan waha callbacks use krte hai. To fir Js setTimeout jaise functions ki help se 2 kaam ek saath kaise karati hai? => ye jo setTimeout wala waiting ka kaam hai, ye Js nhi krti, Browser krwata hai. Aur browsers generally C++ ya Java language mein likhe rehte hai, jo ki dono hi multi-threading ko support krte hai. Waiting wali responsibility Js browser ko de deta hai aur aage badh jaata hai, lekin jaise hi setTimeout ki baari aati hai to browser js se kehta hai ki ab to ise execute kara do! Aur Js fir jaake usko execute kr deta hai. Browser in functions ko bhi apne callstack mein add krta jaata hai jisse usko pata rhe ki kya execute krna bacha hai.
// Jab saari lines ek ke baad ek execute hoti rehti hai, yaani jab ek ke baad ek  sync mein chalti hai to usko ham Synchronous nature bolte hai. Lekin jab ham setTimeout, setInterval jaisi cheezein use krte hai to waha pr ham js ke nature ko asynchronous bana rhe hote hai. Iska matlab zaruri nhi hai ki cheezein lagatar ho, ho sakta hai beech mein kuch aur extra line of code ho jaye. 
// Problem that arises due to Asynchronous nature of Js: Callback Hell: callbacks ki nesting ko callback hell kehte hai. Look:
h1 = document.querySelector('h1');
function changeColor(color, delay){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let num = Math.floor(Math.random()*5)+1;
            if(num>3){
                reject('promise rejected.');
            }
            h1.style.color = color;
            console.log(`color changed to ${color}!`);
            resolve('color changed!');
        }, delay); 
    }); 
}
// now, using async and await keywords: 
async function colorChange() {
    try{
        await changeColor('red',1000);
        await changeColor('orange',1000);
        await changeColor('green',1000);
        await changeColor('blue',1000);
    }catch(err){
        console.log('error caught.');
        console.log(err);
    }
    // lekin agr promise reject ho gya(check line 23), to aage ke ye next kaam nhi ho payenge. aise mein isko handle kaise kre?
    // Handling rejections with await: bas upar ke saare await funtions ko try-catch mein daal do!
    let a = 5;
    console.log(a);
    console.log('new number:', a+5);
}
// Ye async aur await ka use krke humne callback hell ko solve kiya hai. 
colorChange();
//using Promises to solve the same:
// changeColor('red',1000)
// .then(()=>{
//     console.log('red.');
//     return changeColor('orange',1000);
// })
// .then(()=>{
//     console.log('orange.');
//     return changeColor('green',1000);
// })
// .then(()=>{
//     console.log('green.');
//     return changeColor('blue',1000);
// })
// .then(()=>{
//     console.log('blue.');
// })//promise chaining completed.
// changeColor("red", 1000,()=>{
//     changeColor("orange", 1000, ()=>{
//         changeColor('green', 1000, ()=>{
//             changeColor('blue', 1000);
//         });
//     });
// });

// yaha callback nesting ho rhi hai => yaani callback hell. Is tarah ki nesting hoti hai kayi codes mein. 
// To bhai callback hell se kaise bache? => Promises, async and await. yeh 3 keywords hai inki help se apan callback hell problem se bach paate hai. 
// Promises: The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// function saveToDb(data, success,failure){
//     let internetSpeed = Math.floor(Math.random() * 10 ) + 1;
//     if(internetSpeed > 4){
//         success();
//     }else{
//         failure();
//     }
// } 

// saveToDb('Apna College', 
//     ()=> {
//     console.log('Success: Your data was saved.');
//     saveToDb('hello world', ()=>{
//         console.log('Success2: Your data was saved.');
//         saveToDb('Abhay', ()=>{
//             console.log('Success3: Your data was saved.');
//         }, ()=>{
//             console.log('Failure3: Your data was not saved.');
//         })
//     }, ()=>{
//         console.log('Failure2: Your data was not saved.');
//     });
// }, ()=>{
//     console.log('Failure: Slow internet. Data not saved.');
// });

// yaha callback hell aagya,although simple code hai lekin callback hell aa gya, asynchronous situation create ho gyi hai, to aise mein ham promises ka use krte hai. 
// Promises: A Js Object. It represents the eventual completion (or failure) of an asynchronous operation and its resulting value. 
// Koi cheez hamne keh di, to aage chalkr ya to wo success hogi(eventual  completion) ya fir wo kaam aage jaakr fail hoga(or failure), to kya error ya fir kya result hamare pass ayega, wo bhi resulting value is promises object ke andar store hoti hai.
// Promises mein do callback hote hai: resolve(success) and reject(failure).
function saveToDb(data){
    return new Promise((resolve, reject)=>{
        let internetSpeed = Math.floor(Math.random() * 10 ) + 1;
        if(internetSpeed>4){
            resolve('success: data was saved.');
        }else{
            reject('failure: weak connection.');
        }
    })
} 
// States of a Promise object: 
// 1. pending: hamein nhi pata promise complete hua ya nhi hua aur uski final state kya hai. 
// 2. rejected: Promise hamara reject ho gya, jo kaam hamein krna tha usmein error aa gya. 
// 3. fulfilled: Promise fulfilled. jo kaam krwana tha wo ho gya hai succesfully. isi ko resolved state bhi bolte hai.

// Promise object methods: then() and catch(). Agr promise fulfill hone ke baad ham chahte hai kuch kaam ho to we use then() aur agr promise rejected hone ke baad ham chahte hai kuch kaam ho to we use catch() method.
// Promise chaining: ek ke baad ek bahut saare promises ko chain krna. jab ham bahut saare .then() use krte hai use ham promise chaining keh dete hai.
saveToDb('apna college')
    .then((result)=>{
    console.log('data1 was saved.');
    console.log('result of promise:', result);
    return saveToDb('helloWorld');
    })
    .then((result)=>{//yha result wo message hai jo  promise object return krega agr promise successfull rha to. 
        console.log('data2 was saved.');
        console.log('result of promise:', result);
        return saveToDb('Abhay');
    })
    .then((result)=>{
        console.log('data 3 was saved.');
        console.log('result of promise:', result);
    })
    .catch((error)=>{//yha error wo message hai jo  promise object return krega agr promise fail hua to. 
    console.log('promise was rejected.');
    console.log('error of promise:', error);
    });

// ye wahi callback hell wala code hai, ek kaam successfull ho tabhi dusra function aage call hona hai. lekin dekho isse kitna aasan ho gya ab samajhne mein code. That's how we use promises, and promise chaining to counter callback hell problem. 
// Async Keyword:
// Creates an Async Function. Saare async funtions by-default ek promise ko return krte hai, chahe ham promise ko return krne ka statement likhe ya na likhe. fir jo bhi promise function se return hota hai uspr ham then aur catch methods ko apply kr sakte hai.
async function greet() {
    throw "404 page not found";//jab kisi random error ko throw krna hai to throw keyword ka use kr sakte hai.
    return 'hello';
}
// agr function normally execute ho jaata hai to promise: fulfilled + agr koisi value return krne ko di hai to wo bhi aa jaati hai. lekin agr error aati hai function ke execution mein to promise ki rejected state show  hogi.
greet()
.then((result)=>{
    console.log('promise was resolved.');
    console.log('result was: ', result);
})
.catch((err)=>{
    console.log('promise was rejected due to error: ', err);
})
// ham arrow fucntions ko bhi async bana sakte hai: 
// let demo = async ()=> {return 5};
// Await Keyword:
// pauses the execution of its surrounding async function until the promise is settled
// (resolved or rejected). await hamne jis bhi funtion call ke saamne likh diya, to await apne aas paas ke async funtions ko pause kr dega- unhe intezar krwayega jab tak hamari current function call mein promise settle nhi ho jaata(yanai jabtak usmein promise fulfilled ya rejected state mein nhi chala jaata), basically promise pending state mein naa rhe.
function getNum(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let num = Math.floor(Math.random()*10)+1;
            console.log(num);
            resolve();
        }, 1000);
    });
}
async function demo(){
    await getNum();// ab await lagane se ye hoga ki jabtak is getNum(); ka promise resolve nhi ho jaata tabtak baaki calls nhi jayengi. 
    await getNum();//ek call complete ho, fir dusri call aaye, dusri complete ho, fir teesri call aaye.
    getNum();
    // ek saath teeno values print ho rhi hai, ham chaah rhe hai thode delay ke baad ek ek random no. print ho. to aise mein await keyword ka ham use krte hai. Note: await keyword can ONLY be used inside async funtions.
}