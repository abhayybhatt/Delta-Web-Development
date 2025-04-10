// useEffect(): 
// • The Effect Hook lets you perform side effects in function components.
// • Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

// useEffect is a React Hook that lets you synchronize a component with an external system.

// Agr hamara koi bhi component first time render hota hai aur us case mein agr kuch kaam karwana ho to we use useEffect() hook. Ya jitne bhi time component render ho(n times), to nth time agr kuch bhi kaam krwana ho to we can use our useEffect() hook.
// Agr hamare state variable ke andar koi change hai jiske basis pr ham koi side effect laana chahte hai, to we use this hook. Koi bhi kaam krwana is case mein is known as side effect or Effect in React.

// Kuch change karana hai, chahe rendering ho ya  re-rendering ho, we'll be using useEffect() hook.
// 3 ways to use our useEffect hook: 
// 1. useEffect(function): useEffect ke parameter mein agr koisa function pass kra ho to. Is function ko apan 'setup' bhi kehte hai. Jaise hi state mein kuch change aayega, ya jaise hi component render ya re-render krega, waise hi ye setup function execute ho jayega. To koi bhi rendering hui, uska side effect kya hua? -> is setup function ka execute hona.
// 2. and 3. useEffect(setup, dependencies?): ye 2 parameters hote hai useEffect hook mein, jismein dependencies use krna is not necessary. Pr ye dependencies hoti kya hai? -> these dependencies are nothing but our state variables. Jab bhi koi state variable mein change aata hai to useEffect trigger hota hai, lekin agr apan chahte hai ki wo kisi specific state variable ki re-rendering mein hi trigger ho to uske liye we pass useEffect a dependency inside [] brackets. Ab ismein 2. case hai: [s1,s2,s3] , where s1,s2,s3 are state variables. 3. case hai: [] : yaani we're passing an empty array in dependencies parameter. Isse ye hota hai ki jab apna component first time render hota hai, sirf tabhi apna useEffect ka setup function execute hoga, re-rendering ke case mein nhi hoga.

import { useState, useEffect } from "react"

export default function NewCounter() {
    let [countx, setCountx] = useState(0)
    let [county, setCounty] = useState(0)

    let incCountx = () => {
        setCountx((currCount) => currCount + 1)
    }

    let incCounty = () => {
        setCounty((currCount) => currCount + 1)
    }

    // useEffect(function printSomething() { //agr component render ya re-render hua, to ye side-effect execute hoga.
    //     console.log('this is a side-effect.') //2 baar log hoga console mein kyuki main.jsx mein StrictMode enabled hai. 
    // })
    // useEffect(function printSomething() {
    //     console.log('this is a side-effect.')
    // }, [countx]) //sirf countx wale change pr hi ye function execute hoga.
    // useEffect(function printSomething() {
    //     console.log('this is a side-effect.')
    // }, [countx, county]) //ab dono state variable ke changes pr execute hoga.
    useEffect(function printSomething() {
        console.log('this is a side-effect.')
    }, []) //ab sirf rendering ke time ye function execute hoga, re-rendering mein nhi hoga.

    return (
        <div>
            <h3>Countx = {countx}</h3>
            <button onClick={incCountx}>+1</button>
            <h3>County = {county}</h3>
            <button onClick={incCounty}>+1</button>
        </div>
    )
}