// Hooks: Hooks were a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks are functions that let you “hook into” React state and lifecycle features from function components.
// Initial phase mein React mein componenets function ke form mein nhi bante the. Pehle jo components hote the they were used to be class components. Class components mein state aur lifecycle methods ka use hota tha. Lekin React 16.8 mein hooks introduce hue jisse apan state aur lifecycle methods ka use function components mein bhi kar sakte hai. Pehle sirf Class components mein kar sakte the. To ab basically apan apne functional components ke andar hi apne Hooks ko add karke saare features (including state) use kar sakte hai jo pehle sirf class components mein use ho sakte the. To aise around 15 Hooks hai, unmein se kuch important hooks hai jaise useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef, useImperativeHandle, useLayoutEffect, useDebugValue etc.

// NOTE: 1. Hooks ko component ke bahar nhi likh sakte. Hooks ko component ke andar hi likhna hota hai.
// 2. We can create multiple Hooks inside a component. 
// 3. Hooks ko conditionally use nhi kar sakte. Yani Hooks ko if-else ke andar use nhi kar sakte.

import { useState } from "react"

export default function Counter() {
    // let count = 0
    // function incCount(){
    //     count += 1
    //     console.log(count)
    // }
    // useState(): useState is a React Hook that lets you add a state variable to your component. It returns an array with two elements. The first element is the current state value, and the second element is a function that lets you update it. The useState() function is a named export from the 'react' package. Isliye isko import kara hai.
    // const [state, setState] = useState(initialState); //state yaani current state, setState yaani updated state(jis state mein change krna hai, isko updater function bhi kehte hai aur yeh hi component ki re-rendering ko trigger karata hai), aur initialState yaani initial state hota hai(0 in this count case).

    // let [stateVariable, setStateVariable] = useState(0) //array ko deconstruct kara jaa rha hai. Is tarah apan apna count state variable banate hai:
    let [count, setCount] = useState(0)  //initialization line.
    // console.log(arr)

    let incCount = () => {
        // setCount(count + 1) //yeh re-render ko trigger karata hai. Jaise hi aise setState function ko call kiya jaata hai, waise hi hamara pura component start se end tak re-render ho jaata hai, bas re-rendering mein initialization wali line ko ignore kiya jaata hai, aur baaki saara code ka part re-render hota hai. Hamara jo bhi state variable hota hai, uski value rendering stage mein update hoti hai, sirf method ko call krne se count ki value update nhi hoti. Aur re-render wali stage function call wali stage ke baad aati hai, is wajah se apan jab count ko console.log krte hai to hamare pass count ki ek value decreased aati hai! Agr count to "2" se update krte(count + 2), to 2 value kam aati.
        // console.log(count)

        // Callback in Updater Function: How to change state when it depends on the current value. 
        // agr apan setCount(count + 1) statement ko 4 baar likhe: 
        // setCount(count + 1)
        // setCount(count + 1)
        // setCount(count + 1)
        // to count value ko bhi by 4 increase hona chahiye tha, lekin aisa nhi hota. Kyuki setCount function is asynchronous in nature, isliye yeh ek hi time pe ek hi value ko update karta hai aur predictably behave nhi karta. To is case mein apan ek callback function ka use kar sakte hai, jisse apan ek hi time pe ek hi value ko update kar sake.
        // Updater function ke 2 specific cases hote hai: 
        // 1. Jab updater function jo nayi value ko la rha hai wo purani value pr depend krti hai(as in this case, purane count ke according hi nayi value aa rhi hai na!). Yaani new State ki value old State ki value pr depend krti hai. To in cases mein apan hamesha callback use krte hai for updating the state, Taaki apne pass predictable behaviour aaye. Jab ek asynchronous function work krta hai, uske baad hi dusra asynchronous function work krega. callback yaani updations ko function ke form mein define krna.
        // 2. Jab state ki new value kisi old value pr depend nhi krti, yaani koi random hi value set krni ho, to aise cases mein apan direct state ko update kr sakte hai, via normal workflow.

        setCount((currCount) => {
            return currCount + 1;
        })
        setCount((currCount) => {
            return currCount + 1;
        })
        // setCount(25) //ye dusre case ka example hai, jab koi random hi value set krni hoti hai. 

        // ab in callbacks se ye hoga ki jab pehla setCount function execute hoga uske baad hi dusra execute hoga. 
    }

    return (
        <div>
             <h3>Count = {count}</h3> {/* generally jo bhi variables apan components mein define krte hai, aur unke andar changes kiye jaate hai, to wo apne UI element ke andar koi changes lekr nhi aate. Kyuki count to increase ho rha hai, lekin apne DOM mein koi changes nhi aate, isliye aise mein updations kewal logic yani terminal ya console pr dikhega. Isliye, yha pr concept aata hai State ka. Agr ham koi aisa variable define kr rhe hai jiske andar agr koi changes hote hai to hamara component re-render ho, jaise yha count chal rhi hai to hamara jo h3 tag hai Counter component ka part wo pura re-render hona chahiye with the new updated value. NOTE: props in React are immutable. 
            To kisi bhi component ke liye apan state naam ka naya variable bana sakte hai jo ki apne aap mein ek built-in object hai usko define kr sakte hai. Agr is state ke andar changes aayenge to ye hamare component ko re-render kara dega, yaani pura function(Counter) re-execute hoga start se, thus usse count ki updated value return hogi hamare pass.*/}
            <button onClick={incCount}>Increase count </button>
        </div>
    )
}

// More about State: 
// 1. hamare component ki re-rendering tabhi hogi jab React hamare state ke varibale ke andar koi change ko detect krega. Yaani agr state ki value ke andar koi change hi nhi ho rha to aise mein uski re-rendering nhi hoti hai(as in 2nd case of updater function). Aisa krke React apne resources ko save krta hai by detecting ki koi change aaya bhi hai ya nhi state mein jo uski re-rendering karani pade.
// 2. jo apan initial value pass krte hai apne state variable ko(jaise yha 0 pass kara hai), uski jagah apan koi function bhi pass kr sakte hai -> 
function init(){
    console.log('Component is being initialized')
    return Math.random()
}
// let [count, setCount] = useState(init()) //yha pr init() function ko call kiya ja rha hai, aur uska return value count ke initial value ke roop mein set ho rha hai. Pr yha kuch alag hoga - Apan console mein observe krenge ki hamara console.log() wala statement har baar print hoga count increase krte(re-rendering) mein, jo ki nhi hona chahiye as it was an initialization statement. Pr jab bhi parentheses() ke saath apan aise function calls daalte hai initialization mein to unko bhi react execute krta hai. Thus, apne computer ki memory aur resources ko save krne ke liye ham nhi chahte ki wo function har baar execute ho, isliye apan function call ki jagah uska sirf reference pass kr dete hai(without parentheses):
// let [count, setCount] = useState(init) //yha pr init() function ka reference pass kiya ja rha hai, ab wo console.log() statement bas ek baar initialization hone pr hi execute hoga, baaki re-rendering mein nhi.