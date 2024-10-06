let btn = document.querySelector('button');
btn.addEventListener('click', function(){
    // console.log('generate random color');
    let h3 = document.querySelector('h3');
    let randomColor = getRandomColor();
    h3.innerText = randomColor;
    let div = document.querySelector('div');
    div.style.backgroundColor = randomColor;
    console.log('color updated');
});
function getRandomColor(){
    let red = Math.floor(Math.random()*255);// no need to add +1 here as range for rgb is 0-255.
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255);
    let color = `rgb(${red},${green},${blue})`;
    return color;
}
let p = document.querySelector('P');
p.addEventListener('click', function(){
    console.log('para has been clicked.');
});
let box = document.querySelector('.box');
box.addEventListener('mouseenter', function(){
    console.log('Mouse entered the box.');
});
// this in Event Listeners:
// When 'this' is used in a callback of event handler of something, it refers to that something. yaani jab ham kisi object ke event listener ya fir event handler ko create krte hai, to ham chahe to uske callback mein 'this' keyword ko use kr sakte hai, waha this ka matlab hoga wo specific object jiske liye event handler create hua hai.
p.addEventListener('click',function(){
    console.log(this.innerText);
    this.style.backgroundColor = 'coral';
});
function changeColor(){
    console.dir(this.innerText);
    this.style.backgroundColor = 'aqua';
};
let h1 = document.querySelector('h1');
let h2 = document.querySelector('h2');
h1.addEventListener('click', changeColor);
h2.addEventListener('click', changeColor);
let inp = document.querySelector('input');
inp.addEventListener('keydown',function(event){//keydown matlab key ko press krna. aur press krne ke baad jab key automatically upar aati hai yaani when key is released usko keyup kehte  hai.
    console.log("key: ",event.key);
    console.log("Code: ",event.code);
    console.log('key was pressed.')
});
// event object ek default object hota hai jo sabhi functions mein as an argument rehta hai. It has two special properties for keyboard Events. They are: code and key. Key batati hai ki screen ke upar print hokr kaunsi key visible hai, jaise 'a' likhne pr 'a' aayega, space key se '' aayega, agr ; print krenge to ; aayega, and so on. Aur code hamein us specific key ka code return krke dega, agr key '' dega to uska code hoga "Space", for ; it gives "Semicolon", for 'a' it's "KeyA" and so on.
// form events mein mein ek event 'submit' naam ka hota hai jispr ham callback apply kr sakte hai, using addEventListener. 
// Note: agr event se koi bhi default action perform ho rha hoga aur usko agar rokna hai then we use event.preventDefault(). 
let form = document.querySelector('form');
form.addEventListener('submit', function(event){
    event.preventDefault();// iski help se register pr click krne ke baad bhi ham /action url pr nhi jayenge.
    console.log('form submitted');
    // console.dir(inp);
    // console.log(inp.value);
    // let user = document.querySelector('#user');
    // let pass = document.querySelector('#pass');
    // even better approach when there are many objects of inp we cannot give every object an individal id, so use form object, then go to its elements collection from console.dir(form);
    // console.dir(form.elements);
    let user = this.elements[0]; //this yaani form object same to form.elements[0], aur [0] index pr user hai, aur [1] pr password in this case.
    let pass = this.elements[1];
    console.log(user.value);
    console.log(pass.value);
    alert(`Hi ${user.value}, your password is set to ${pass.value}`);
    
});
// Extracting form data: 
// in case of input attribute, uske innerText mein uski entered value store nhi hoti, but instead ek value naam ki property hoti hai usmein hoti hai value stored. you can check the same by console.dir(inp); 
// More Events:
// change event: The change event occurs when the value of an element has been changed (only works on <input>, <textarea>
// and <select> elements). To jab bhi kisi element mein change aaye usko track krne ke liye change event ko use krte hai. keyword= change.
user.addEventListener('change', function(){
    console.log('change event');
    console.log("final value = ", this.value);
}); 
// Note: change event sirf initial aur final values to track krta hai, har ek change(jaise apan aur text agr likh rhe ho user mein) ko track nhi krta bas initial aur final values ke beech ki state ko track krega.
// agr ham chahte hai ki har ek change track ho, jaise 'a' type kre to a track ho, 'b' type kre to b track ho, in that case we use input event. bas yhi main difference hai input and change event mein. 
// input event:The input event fires when the value of an <input> , <select> , or <textarea> element has been changed.
user.addEventListener('input', function(){
    console.log('input event');
    console.log("final value = ", this.value);
}); 
// Note: non-character or arrow keys don't trigger our input event.