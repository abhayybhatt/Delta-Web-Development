// Selecting Elements:
// getEIementById, a method of document object
// Returns the Element as an object or null (if not found)
let imgObj=document.getElementById("mainImg");
console.dir(imgObj);
// Selecting Elements:
// getEIementByCIassName
// Returns the Elements as an HTML Collection or empty HTML collection (if not found). Collection is similar to array but we cannot use methods like push pop etc.
let smallImages= document.getElementsByClassName("oldImg");
for(let i = 0; i< smallImages.length; i++){
    console.dir(smallImages[i]);
}
// Selecting Elements:
// getEIementByTagName
// Returns the Elements as an HTML Collection or empty collection (if not found)
document.getElementsByTagName("p"); //returns html collection containing all paragraph tags.
// document.getElementsByTagName("p")[1].innerText = "abc";//will change the value of second p tag content to "abc"
// Query Selectors:
// Allows us to use any CSS selector. They are more frequently used than all those getElement methods. 
console.dir(document.querySelector('h1'));
console.dir(document.querySelector('#description'));
console.dir(document.querySelector('div a'));//matlab div ke andar ke saare anchor tags hamein chahiye, similar syntax to that of css selectors
// querySelectors sirf single element to select krne ke liye use hote hai and thus they always return an object, unlike getElement methods. querySelector saari values mein se jo first value match hoti hai, usko return krke de deta hai.
// querySelectorAll saari values return kr dega.
console.dir(document.querySelectorAll('div a'));
// Using Properties & Methods:
// innerText:
// Shows the visible text contained in a node
// textContent:
// Shows all the full text
// innerHTML:
// Shows the full markup
// Difference: innerText hamein wo text deta hai jo hamari screen pr web browser mein hamein dikhai deta hai, innerHTML hamein pura html document ka content show krta hai, aur textContent wo text deta hai jo hamnein actual html file mein likha hua hota hai. To innerHTML aur textContent mein antar kya hai? agr koisi cheez apan ne hide kri ko html document mein taaki wo webpage pr show na ho jaise ki display:none kisi bhi element ko agr kr diya, to in that case innerHTML us content ko nhi dikhayega pr textContent fir bhi us display:none wali cheez ko show krenga. innerText saari cheezo ko text samajhta hai(including html tags) lekin innerHTML tags ko recognize krta hai aur changes daal deta hai tags ke hisaab ki usmein jab apan manipulate krte hai webpage ko.
let heading = document.querySelector('h1');
// heading.innerHTML=<u>Spider Man</u>;
heading.innerHTML = `<u>${heading.innerText}</u>`;//this thing works as well!
// Manipulating Attributes:
// obj.getAttribute( attr )
// obj.setAttribute( attr, val )
// They are generally called getter and setter methods. obj.setAttribute mein ek time mein sirf ek hi value ho sakti hai, yaani ek attribute ki saari purani classes(old attributes) reset ho jayenge to a single class value(attribute value) jo apan assign krte hai. 
// Manipulating Style:
// style Property
// obj.style
heading.style.color = "maroon";//changes heading color to maroon
heading.style.backgroundColor = "yellow";//changes heading's bg to yellow. Yeh js ki property ban gyi hai ab, isliye camelCase use hoga, and hence backgroud-color css property changed to backgrouondColor property
let links = document.querySelectorAll('.pubInfo a');
for(link of links){
    link.style.color = "purple ";//changes color of all links to purple
}
// Note: obj.style se sirf apan inline styles hi access kr paate hai.
// Manipulating Style:
// using classList
// obj.classList: ye batayega ki us object ki kitni classes hai, contained by DOMTokenList, aur agr koisi bhi class nhi hai to empty DOMTokenList return hoga.
// classList.add( ) to add new classes
// classList.remove( ) to remove classes
// classList.contains( ) to check if class exists
// classList.toggIe( ) to toggle between add & remove
heading.classList.add("abc");//ab isse h1 tag mein class="abc" add ho jayenga
heading.classList.remove("abc");//hat jayegi class "abc" h1 tag se
heading.classList.contains("abc");//will give false kyuki upar wali line mein uski abc class ko apan ne remove kr diya na.
heading.classList.toggle("abc");//agr class "abc" exist kregi to usko hata dega and will return false. Aur agr nhi exist krti to usko add kr dega and will return true. 
// Aur in changes mein webpage ke html content mein bhi change aa jaata hai.
// Navigation: navigation ki help se ek element se dusre element ki taraf jaa sakte hai.
// parentEIement(returns single value)
// children: ye HTML collection return krega, containing all children of that element.
// childElementCount: ye bateyega ki kisi parent element ke kitne children hai.
// previousElementSibling I nextElementSibling
let h4 = document.querySelector('h4');
h4.parentElement;//h4 ka parent element hai div, to console mein ye div ka html code return krke de dega.
let ul = document.querySelector('ul');
ul.children;//returns HTMLCollection containing all children of ul tag, i.e. li tags
ul.childElementCount;
ul.parentElement;
ul.children[2].previousElementSibling;//returns li that is of value ul.children[1].
ul.children[0].nextElementSibling;//returns li that is of value ul.children[1].
// Adding Elements: Pehle elements ko create krenge using document.createElement aur uske baad usko append kr denge by using following methods.
// document.createElement('p');
// appendChiId(element)
// append(element/string/text): hamesha last mein add krta hai.
// prepend(element): hamesha first mein  yaani starting mein add krta hai.
// insertAdjacent(where, element): ki exactly kaha pr add krna hai element ko ye specify kr sakte hai.  where ki 4 values hai:
// beforebegin: kisi element ke shuru hone se pehle specified element ko add kr do.
// afterbegin: kisi element ke shuru hone ke baad specified element ko add kr do.
// beforeend: kisi element ke khatam hone se pehle specified element ko add kr do.
// afterend: kisi element ke khatam hone ke baad specified element ko add kr do.
let newP = document.createElement('p');
newP.innerText="Hi! I'm a new p";
let body = document.querySelector('body');
body.appendChild(newP);//body ke andar as a child hamne us newP ko append kr diya. append yaani body ke ekdam end mein sabse last mein yeh append hoga.
newP.append("this is new text");//usi element newP mein direct ek string append kr di. isliye generally append ko zyada use krte hai than appendChild.
// Removing Elements:
// • removeChild(element): appendChild ki tarah ki kaam krega, but instead of adding, wo element ko remove kr dega.
// • remove(element): append ki tarah ki kaam krega, but instead of adding, wo element ko remove kr dega. More commonly used than removeChild.
body.removeChild(newP);//hat gya newP
// newP.remove();//same work krega
// body.remove();//isse pura body tag hi remove ho jayega. So use cautiously.
// Qsl. Create a new input and button element on the page using JavaScript only. Set the
// text of button to "Click me'
// Ans1. 
let button = document.createElement('button');
let input = document.createElement('input');
button.innerText = "Click me";
document.querySelector("body").append(input);
document.querySelector("body").append(button);
// Qs2. Add following attributes to the element :
// Change placeholder value of input to "username"
// Change the id of button to "btn'
//Ans2. 
button.setAttribute('id','btn');
input.setAttribute("placeholder","username");
// Qs3. Access the btn using the querySelector and button id. Change the button background 
// color to blue and text color to white.
//Ans3.
let btn = document.querySelector('#btn');
btn.classList.add("btnStyle");
// Qs4. Create an hl element on the page and set its text to "DOM Practice" underlined. 
// Change its color to purple.
//Ans4.
let h1 = document.createElement('h1');
h1.innerHTML = "<u>DOM Practice</u>";
document.querySelector('body').append(h1);
// Qs5. Create a p tag on the page and set its text to "Apna College Delta Practice",
// where Delta is bold.
//Ans5.
let p = document.createElement('p');
p.innerHTML = "Apna College <b>Delta</b> Practice";
document.querySelector("body").append(p);

// DOM Events:
// Events are signals that something has occurred. (user inputs I actions), triggered by either mouse or keyboard.
// onclick (when an element is clicked)
// onmouseenter (when mouse enters an element)
// let buton = document.querySelector('button');
// console.dir(buton);
// buton.onclick = function(){
//     console.log('button was clicked');
// };
let btns = document.querySelectorAll('button');
for(btn of btns){
    // btn.onclick = sayHello; //Note: yaha sayHello likha hai bina () ke. Agar () bhi uske end mein laga dete to function ek hi baar mein sabhi buttons ke liye execute ho jaata. 
    // btn.onmouseenter = function(){
    //     console.log('Mouse entered the button');
    btn.addEventListener("click", sayHello);
    btn.addEventListener("click", sayName);
    btn.addEventListener("dblclick", function(){
        console.log('You double clicked me!');
    });
}
function sayHello(){
    console.log('Hello!');
};
function sayName(){
    console.log('Apna College');
};
// Event Listener: Aisa method jo events ko listen krta hai(unke liye wait krta hai ki kab page pr event hoga aur kab mai us kaam ko perform krunga jo mere event ke andar likha hua hai, in place of callback)
// addEventListener
// element.addEventListener(event, callback) event could include: click, drag, keyboard key etc. aur callbacks hamare wo function hote hai jo as an argument dusre functions mein jaate hai. For a single object, we can make multiple event listeners, jo ki onclick aur onmouseenter se possible nhi tha.
// Bahut saare event listeners hote hai, you can look out for them on mdn.
