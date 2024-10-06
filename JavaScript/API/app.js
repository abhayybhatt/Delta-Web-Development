// API: Application Programming Interface. Acts as an interface between the user and the server itself. Generally, jab 2 softwares ko ek durse se interact krna hota hai to apan usko API kehte hai. Lekin jo APIs HTTP protocol ko use krti hai- yaani internet ke basis pr interact krwati hai softwares ko, unhe ham Web APIs kehte hai. WebD mein ham generally in Web APIs se hi deal krenge, jo HTTP ke saath kaam krti hai. 
// APIs hamein html,css ya js ke form mein data return nhi krti, rather wo hamein wo data return krti hai jo ki JSON format mein hota hai. API ki request ek endpoint link(url) pr jaati hai, unke through wo hamari request ka response deti hai, by sending the data in json format.
// Some Random APIs:
// https://catfact.ninja/fact (sends random cat facts)
// https://www.boredapi.com/api/activity (sends an activity to do when bored)
// https://dog.ceo/api/breeds/image/random (sends cute dog pictures)

// jaise pehli wali site ne ye output diya: 
// {"fact":"Statistics indicate that animal lovers in recent years have shown a preference for cats over dogs!","length":98}
// ye jo output mila hai ye JSON format mein milta hai. It is very similar to Js object lekin dono mein difference hai. jab nayi apis explore kro to always check their documentation. 
// JSON:
// JavaScript Object Notation (www.json.org). It's a format. aisa nhi hai ki js ke alawa aur kahi use nhi kr payenge. agr python ke django mein bhi ise use krenge to accessible hai. like .html, .json is also a format of data. json mein bhi key-value pairs use hote hai, just like js objects. lekin usmein har key ka 'string' type hone compulsory hai, unlike js objects. undefined value js objects mein valid hoti hai lekin json mein undefined value valid nhi hoti. pehle apis xml format mein hoti thi, but nowadays alomost all apis are in json format.
// agr kisi json ko dekhna hai ki ye valid hai ki nhi to you can use online json validators like jsonlint.com. 
// JSON hamesha string type ka data pass krta hai aur agr hamein usko js object mein change krna hai to  JSON.parse(data) method use krna padta hai. 
// Accessing Data from JSON:
// • JSON.parse( data ) Method
// To parse a string data into a JS object
// • JSON.stringify( json ) Method
// To parse a JS object data into JSON. ye jab ham khud ki apis banayenge tabhi isko generally use mein lenge.
// parse: ek data format se dusre data format mein change kr dena. 
let jsonRes = '{"fact":"Cheetahs do not roar, as the other big cats do. Instead, they purr.","length":67}';
let validRes = JSON.parse(jsonRes);
console.log(validRes.fact);

let student = {
    name: 'Abhay',
    marks: '100'
};

// JSON.stringify(student);
// Tools for Testing API requests:
// • Hoppscoth(website)
// • Postman(app)
// Ajax:
// Asynchronous JavaScript and XML. wo puri process jisse ham api ko call krte hai aur wo data return krta hai, ye puri process asynchronous hoti hai. isliye ham kehte hai ki ham ajax se deal krte hai jab bhi ham web APIs ko call krte hai, isse webpage reload nhi hota, bas jab process ko complete hona hota hai, wo ho jaata hai without reloading our webpage. jaise insta pr kisi ki post like kroge to webpage reload nhi hoga, pr changes aa jayengi likes ke database mein. Technically, is puri process ka naam AJAJ: Asynchronous JavaScript and JSON hona chahiye kyuki ab to api json format mein data respond krta hai, lekin ye term pehle se hi use ho rha tha jabse xml tha aur ajaj thoda bolne mein ajeeb lagta hai! isliye jab ham ajax bolte hai, ham json ki hi baat kr rhe hai aaj ke time mein! to basically ham jab ajax ko call kr rhe hai to ye calls api pr jaa rhi hai aur response hamein json format mein mil rha hai, aur ye puri process asynchronously work krti hai.
// Http Verbs: http se related kuch kaam.
// Examples :
// GET
// POST
// DELETE
// Abhi to generally GET ko hi use krenge, lekin jab ham apni khud ki  backend server-side apis ke saath kaam kr rhe honge to baaki ke http verbs ko bhi use krenge. 
// Status Codes: can read more about them by googling status code mdn
// Examples :
// 200-0K
// 404- Not Found
// 400 - Bad Request
// 500- Internal Server Error
// ye saari requests apn hoppscotch.io website pr Status bar mein dekh sakte koisa url daalne ke baad. 
// Add Information in URLs: api endpoints mein additional Information bhejna. 
// Query Strings
// https://www.google.com/search?q=harry+potter
// Key:q
// Value: harry+potter
// key-value pair(hamari query string) '?' ke baad start hoga.
// ?name=shradha&marks=95
// key1: name
// value1: shradha
// key2: marks
// value2: 95
// jo key-value pair query strings ke andar valid nhi hota usko api ignore kr deti hai, aur jo useful hoti hai, jise api recognise krti hai, wo usko use krti hai.
// Http headers: ham headers ke saath bhi additonal data bhej sakte hai, ki kis type ka response apan expect kr rhe hai(html, json, plaintext, etc.) aur generally headers ke saath apan bahut saata metadata(data about data) bhi bhejte hai, jisse response ka as such koi relation na ho. isko bhi hoppscotch.io mein jaakr "Headers" tab mein try kr sakte hai. 
// header , value: ye format rhega headers ka. jaha values unique hoti hai, jo bhi kaam karana hai uske hisaab se. 
// Our First Request:
// using Fetch
// fetch(url)
// pehle XMLHttpRequest object ko banate the aur uske various methods ko use krke request bhejte the, lekin usmein kuch major issues the: usmein hamare async aur promises wale concepts bilkul bhi kaam nhi krte the. to fetch(url) better method hai. 
let url = "https://catfact.ninja/fact";//agr url galat daala to aage aane wale .catch method ki error print hogi.
let url2 = "https://dog.ceo/api/breeds/image/random";
// fetch(url);//browser mein inspect krke network tab ko check kro. ek nayi fact naam ki request generate hogi aur uska response bhi milega. fetch(url) hamein ek promise object return krke deta hai, thus ispr apn promise ke methods jaise .then() and .catch() ko bhi use kr sakte hai.
// fetch(url)
// .then((response)=>{
//     // console.log(response);//body mein ReadableStream return hoga. matlab data to hai, lekin usko padh nhi paa rhe, usko readable banane ke liye ham use krenge response.json(), isse data readable ban jaata hai, aur ye method hamein dobara se ek Promise object return krke dega.
//     return response.json();
// })
// .then((data)=>{
//     console.log("data1: ",data.fact);
//     return fetch(url);
// })
// .then((response)=>{
//     // console.log(response);
//     return response.json();
// })
// .then((data2)=>{
//     console.log('data2: ',data2.fact);
// })//promise chaining.
// .catch((err)=>{
//     console.log("ERROR: ", err);
// });
// console.log("I'm happy.");//to show that Promise callbacks are working asynchronously.
// Our First Request:
// using Fetch with async/await for doing the same above task:
// async function getFacts(){
//     try{
//         let res = await fetch(url);//await lagana pada kyuki ye ek asynchronous call hai.
//         let data = await res.json();//kyuki ye bhi asynchronous function hai aur promise return krta hai, to iske liye bhi wait krna zaruri hai.
//         console.log(data.fact);
//         let res2 = await fetch(url);//await lagana pada kyuki ye ek asynchronous call hai.
//         let data2 = await res2.json();//kyuki ye bhi asynchronous function hai aur promise return krta hai, to iske liye bhi wait krna zaruri hai.
//         console.log(data2.fact);
//     }catch(e){
//         console.log('erorr: ',e);
//     }

//     console.log("Bye!");
// }
// getFacts();

// Axios:
// Library to make HTTP requests. Internally ye fetch() method ko hi use krta hai lekin ise apan more compact and better method keh sakte hai for sending our requests. axios github pr jaakr uski cdn link copy kr lo. pr iski need hi kyo padi jab fetch() chal rha tha? => wo readableStream return krta tha jo ki exact json data nhi tha aur hamein usko parse krna pad rha tha, lekin axios  use krne se hamare pass directly exact response aata hai jo hamein chahiye, thus, a better method. 
// Now, using axios for achieving the same above task:
async function getFacts(){
    try{
        let res = await axios.get(url);//await lagana pada kyuki ye ek asynchronous call hai.
        return res.data.fact;
    }catch(e){
        return 'No fact found!';
    }
}
// getFacts();
let btn = document.querySelector('#cat');
btn.addEventListener('click',async ()=>{
    let fact = await getFacts();
    console.log(fact);
    let p = document.querySelector('#result1');
    p.innerText = fact;
})

let btn2 = document.querySelector('#dog');
btn2.addEventListener('click',async ()=>{
    let link = await getImage();
    console.log(link);
    let img = document.querySelector('#result2');
    img.setAttribute("src", link);
})

async function getImage(){
    try{
        let res2 = await axios.get(url2);//await lagana pada kyuki ye ek asynchronous call hai.
        return res2.data.message;
    }catch(e){
        return '/';
    }
}
// Note: bhale hi ye free apis hai, lekin inmein bhi limit hoti hai, jaise ki 1 min. mein apan sirf let's say 15 baar hi inko call kr sakte hai. To generally free apis use na kre in your real-world project(if possible) aur loops to galti se bhi mat laga dena in api calls mein. Although hamare maximum projects mein free apis more than enough rahengi!
// axios ke saath apni requests mein ham headers ko bhi pass kr sakte hai. Uske liye ham apne headers ki ek object banate hai, usmein key rakhte hai headers naam se, aur uski value mein ham ek aur object banate hai jismein ham apne saare Key-value pairs ko pass kr sakte hai.
let url3 = "https://icanhazdadjoke.com/";
async function getJokes(){
    try{
        const config = {headers: {Accept: "applicaton/json"}};
        let res = await axios.get(url3,config);//as a second argument apne configuration ko pass kr denge.
        console.log(res.data);//joke.data html format mein result de rha hai, isliye yaha headers ka kaam lagega.
    }catch(err){
        console.log("error: ", err);
    }
}
getJokes();
// Axios:
// Updating Query Strings. Link ke end mein jo queries aati hai(after ? symbol), unko bhi update kr sakte hai in axios:

let url4 = "http://universities.hipolabs.com/search?name=";
let btn3 = document.querySelector('#country');
btn3.addEventListener('click', async ()=>{
    let country = document.querySelector('input').value;
    console.log(country);
    let collArr =  await getColleges(country);
    show(collArr);
});
function show(collArr){
    let list = document.querySelector("#list");
    list.innerText = '';
    for(coll of collArr){
        console.log(coll.name);
        let li = document.createElement('li');
        li.innerText = coll.name;
        list.appendChild(li);
    }
}
async function getColleges(country){
    try{
        let res = await axios.get(url4+country);
        return res.data;
    }catch(e){
        return [];
    }
}

// Terminal: A text-based input and output environment. 
// Different Terms:
// • Command Line - any interface that is used by entering textual commands (gen. Windows centric)
// • Terminal - This is a type of command line (gen. Mac centric)
// • Console - A command-line interface used to work with your computer
// • Shell - A program running on terminal
// • Bash - A popular shell on Mac OS/ Linux
// • Z-ShelI - Another shell (default)
// Basics:
// ls = list files
// (show my files)
// pwd = print working directory
// (where am i?)
// clear = clear screen
// Navigation:
// Inside & Outside Directories
// cd = change directory
// cd Desktop
// cd .. = back button
// cd ../.. = 2 steps peeche agr jaana ho toh. 
// Paths:
// Absolute & Relative
// cd Desktop/Delta (relative path), dependent on our current working directory, always starts with a word.
// cd /Users/shradhakhapra/Desktop (absolute path), chahe kisi bhi directory ke andar ho, har jagah work krenge, always start with a '/'
// / = root directory
// ~ = home directory
// cd ~ se home directory mein direct aa jayenge. 
// Making Directories:
// mkdir = make directory, ya to specific jagah jaakr exact apne path mein name specify kr sakte hai nhi to absolute ya relative path ka bhi use kr sakte hai. 
// Flags:
// Flags are characters that we pass with commands to modify their behaviour
// manual Command(man):
// man ls - give info about ls command
// man mkdir - give info about mkdir command
// with Flags:
// ls -la, combines both flags: ls -a and ls -l
// Touch Command: to change file access and modification times, lekin agr incase jis file ki access and modification times change krna hai wo exist hi nhi krti, to aise mein it creates that file with default permissions. Generally, isko files add krne ke liye hi ham use krenge.
// Used to create files in our directory
// touch index.html
// touch app.js
// touch abc.txt
// Deleting Files & Folders:
// rm - removes files
// rmdir - removes empty folders
// rm -rf - removes any folders, here -r(recursive delete, nested-way mein us folder ke bhi andar ke bhi saare folders ko jaakr delete kr dega) and -f(forced delete) both are individual flags. -rf together are called recursive force(remove with force).
// What is Git?
// Free & Open Source Version Control System
// Version control system: tools that help to track changes in code.
// 1. Track history
// 2. Help to collaborate in a group system. 
// What is Github?
// Website where we host repositories online.
// README.md=> md means markdown. Project kya hai, project ko kyu banaya hai, kya features hai, kya cheezein hai, is project ko ham use kaise kr sakte hai, etc. It's a good practice to alaways initialize README files in your github repo.
// Using Git:
// • Command Line (Most Popular, faster and it has no limitations)
// • IDE/Code Editors (like VSCode)
// • Graphical User Interface (like GitKraken)
// Configuring Git:
// git config --global user.name "My Name"
// git config --global user.email "someone@email.com"
// Basic Commands:
// •Clone - Cloning a repository on our local machine. Online copy to hai, usko apni device mein download krna hai. git clone <- some link ->
// • status - displays the state of the code                       git status
// Basic Commands:
// • add - adds new or changed files in your working directory to the Git staging area.                git add <- file name ->
// • commit - it is the record of change
// git commit -m "some message"
// • push - upload local repo content to remote repo(yaani github)
// git push origin main. origin matlab wo location jahapr hamari github ki ye repo hai, aur main hamari ek branch hai.
// git add . => to add all files. 

// Basic Commands:
// • init- used to create a new git repo           git init. jis folder ko hamein github repository banana hai uske andar yeh command likhte hai.
// git remote add origin <- link -> : ham kuch remote add krna chahte hai, remote yaani jaha ham apne code ko push krna chahte hai, jiko ham naam de rhe hai origin, yaani kaunsi link pr ham apna code push krne ki koshish kr rhe hai, wo link ham specify krte hai.
// git remote -v (to verify remote) : ye batayega ki hamara kya remote hai, matlab wo link jaha pr hamara code teminal  se push hoga ya pull kiya jayega wo kausa link hai, usi link se hamari local system wali repo jud gayi hai.
// git branch (to check branch) : to check our current branch.
// git branch -M main (to rename branch) : us current  branch ka agr naam change krna ho to, main ki jagah jo bhi dusra naam add krna ho, jo apan ko naya naam daalna hai us branch ka, usse replace kr do.
// git push origin main: jo bhi link set kri hai hamne apni remote repo ki usko ham origin keh rhe hai, to yaha keh rhe hai ki git push kr do hamare origin pr main branch ke upar.
// git push -u origin main: -u ka maltab hai upstream ko create krna. Basically ham bata rhe hai ki jab ham origin ki baat kr rhe hai to kiski baat kr rhe hai. Agar hamne git push origin main ki jagah ek baar bhi ye statement ko likh diya, to uske baad hamein jab bhi push krna hoga, ham simply git push likh sakte hai.
// jab ham sirf ek hi file ko modify krte hai aur koi nayi untracked file create nhi krte, in  that case ham commit and add ek saath kr sakte hai:
// git commit -am "some commit message". 
// Branch Commands:
// git branch (to check branch)
// git branch -M main (to rename branch)
// git checkout <- branch name -> (to navigate)
// git checkout -b <- new branch name -> (to create new branch)
// git branch -d <- branch name -> (to delete branch). Note: jis branch  mein currently hai usko delete nhi kr sakte hai, pehle us branch se kisi aur branch mein switch kro fir delete kro us branch ko.
// Merging Code:
// git diff <- branch name-> (to compare commits, branches, files & more)
// git merge <- branch name-> (to merge 2 branches)
// OR
// Create a PR(Pull Request)
// Pull Request: It lets you tell others about changes you've pushed to a branch in a repository on GitHub. Jab ek branch ki changes dusri branch ke andar merge krna chah rhe hai to. It's always a good practice ki jab bhi ham PR create kre to usmein comment mein reason zarur likhe ki is PR ko create krne ke peeche kya reason hai aur kyu ham ise create krna chahte hai. PR waala kaam seedhe GitHub se hi hota hai. Note: PR merge krna khud mein ek commit hota hai.
// Ab GitHub pr to change ho gyi, ab usko wapis ham apne local system pr kaise lekr aaye? => uske liye ham pull coommand ka use krenge. 
// git pull origin main: jo hamara origin tha waha se main branch ek saare changes ko pull krlo.
// used to fetch and download content from a remote repo and immediately update the local repo
// to match that content.
// push se local se remote(Github) pr jaate hai aur pull se remote(Github) se ham local mein changes lekr aate hai.
// Merge Conflicts: An event that takes place when Git is unable to automatically resolve differences in code between two commits. Yaani ek branch hai usmein same file mein ek jagah change kr diya, aur dusri branch ke andar bhi usi same file mein same jagah mein hamne change kr diya, to git ko samajh nhi aayenga ki kaunse wala change lena hai, to conflict arise ho jayega. Aise conflicts ko hamein jaakr manually solve krna padta hai.
// Fixing Mistakes:
// Case 1 : staged changes
// git reset <- file name -> , for un-adding unnecessary changes. Agr sirf kisi ek specific file mein last add ko hatana hai then use this command.
// git reset , agr saari files ke recent add ko hatana hai to use this command.
// Case 2 : commited changes (for one commit)
// git reset HEAD~1, similary agr kisi commit ko reset krna ho to, yha HEAD matlab hai hamara last commit. HEAD pointer hai jo point krta hai hamare last commit ko, ~1 matlab hai ek commit peeche bhej do HEAD ko.
// Case 3 : commited changes (for many commits)
// git reset <- commit hash -> , commit hash yaani jo commit code git log krne ke baad dikhta hai, written after that old commit at which we want to revert our changes to, waha chale jao, isse kaam ho jayega aur saath mein jo latest changes the jaha se wapis revert kiya hai, wo abhi bhi file mein likhe rhenge aur file hamari modified stage mein chali jayegi.
// git reset --hard <- commit hash -> , agr latest changes jaha se wapis back aaye hai unko hatana bhi hai, to isko use krte hai.
// git log se hamari saari commits ki infomation aa jayegi. sabse purana commit sabse neeche aayega terminal mein. type q to quit from gir log.
// What is Forking?
// A fork is a new repository that shares code and visibility settings with the original "upstream"
// repository.
// Fork is a rough copy.
// Agr kisi aur ki repo mein hamein khud changes krna hai to wo ham nhi kr sakte unless we are a part of it. Isi ko Open Source Contribution kehte hai, yaani dusro ki repo mein khud apna Contribution provide krna. Aisa krne ke liye ham forking ka use krte hai, forking us pure repo ki ek copy bana deta hai hamare khud ke repositories mein. Uske baad ham apne repo ki pull request daal sakte hai, for merging our main branch ke andar ki changes with the main(or another branch) of that official repo jiski hamne forking ki thi in the first place. Isse us official repo ke developers ko hamari wali pull request dikhni shuru ho jayegi, jise wo fir agr chahe to accept kr sakte hai. Agr koi bada project hai aur usmein ham genuinely koi achha change contribute krna chah rhe hai, to uske liye ham apni changes apni branch mein add kr sakte hai aur usko base repo ke base branch mein (yaani official repo ke official branch mein) uske saath ham usko merge kr sakte hai.










