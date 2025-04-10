// Events in React: Events are actions that can be detected by our application. For example, clicking a button, hovering over a link, or typing in a text box are all events. React lets you add event listeners to your components to handle these events. 
// Event Object: We can access the Event Object in Handler. The Event Object is a built-in object in JavaScript that contains the event details. It is passed as an argument to the event handler function.
// Handling Click Events: generally buttons pr hi click events lagate hai apan.
// Handling Non-Click Events: jaise double click, hover, etc. 

function handleClick(event){ //event listener jaisa bana rhe hai React mein.
    console.log('Hello')
    console.log(event) //event object print hoga. event object ke andar bahut saare pre-defined attributes aur methods hote hai. Inmein se ek popular method hai preventDefault() jo ki kisi bhi default behaviour ko rokne ke liye use hota hai. Jaise ki kisi form submit hone se rokne ke liye.
}

function handleMouseOver(){ {/*because we are handling an event, isliye yeh naam rakha hai.*/}
    console.log('Bye!')
}

function handleDblClick(){
    console.log('Double Clicked!')
}

export default function Button(){
    return (
        <div>
            <button onClick={handleClick}>Click me!</button> {/*onClick attribute ki help se ab ye as an event Listener ki tarah kaam krega.*/}
            <p onMouseOver={handleMouseOver}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, repudiandae laudantium at voluptate reiciendis tenetur debitis error sit vel ratione quam cumque nulla, ipsum, sequi maxime animi. Possimus, porro fugit.</p> {/* Jaise hi mouse hover krega <p> text pr, to Bye! print hoga. generally, 'on' add krke apne attribute ka naam likh sakte hai, aur fir us specific event ko handle krne ke liye function pass kr sakte hai.*/}
            <button onDoubleClick = {handleDblClick}>Double Click me!</button> {/*kabhi bhi apnne methods ko execute nhi krna hai jab wo event handling mein use aa rhe ho (handleDblClick()) x handleDblClick/ */}
        </div>
    )
}
