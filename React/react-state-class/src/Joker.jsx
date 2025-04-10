// Real-life Use Cases of useEffect hook (can also refer the official React documntation page for the same):

import { get } from "mongoose"
import { useEffect, useState } from "react"

// let's say hamare pass ek webpage hai jisko apan load kr rhe hai. To ho sakta hai ki load krte time(jab component first time render ho rha ho) hamein kuch resources chahiye ho, jaise ki kisi DB se data ko fetch krna. Ab ye to asynchronous operation hai, thus it isn't necessary ki wo ekdum se fetch ho jaye, jabtak usko kuch time lag rha ho fetch krne mein we can show some loading screen animation effect with the help of useEffect hook ki 3rd condition (empty [] pass kr dena in dependency place).

// Another use case: API Calls - Asynchronous Operations
// Ho sakta hai ki apan DB se kuch fetch kr rhe ho, ya mapbox se kuch fetch krke mapbox display kara rhe ho, ya google books ya google maps ki API use kr rhe ho, ye sabhi asynchronous operations hai. Let's make a 'Joker' component jo ki API calls ki help se jokes ko print krwata ho.

export default function Joker() {

    //ham baar-baar print karana chahte hai apna joke, so we'll make it a state variable: 
    let [joke, setJoke] = useState({}) //start mein empty object se initialize krenge.

    const URL = 'https://official-joke-api.appspot.com/random_joke'
    // API request bhejne ka tarika yha same hai as in Js. We'll be using fetch method:

    const getNewJoke = async () => { //kyuki api call jayegi isliye asynchronous hai.
        let response = await fetch(URL)
        let jsonResponse = await response.json() //is response ko json format mein change krenge.
        // console.log(jsonResponse) //ab ye joke ko object form mein return krega, usme se apne kaam ka hai setup aur punch line. Generally, joke mein pehle setup aata hai uske baad punch-line.
        setJoke({setup: jsonResponse.setup, punchline: jsonResponse.punchline}) //kyuki console log krke dekha hai, jsonResponse object mein setup aur punchline naam se 2 keys available thi, aur yhi apan ko chahiye the.
    }

    //Note: ek minor change aata hai useEffect ke andar jab apan asynchronous functions ko define krte hai: ek arrow function bana padta hai, uske andar apne async function ko define kro aur uske baad usi async function ko call kr do. Ye baat dhyaan mein rakhni padti hai.

    useEffect(() => { //a practical use case of useEffect Hook for API calls.
        async function getFirstJoke(){
        let response = await fetch(URL)
        let jsonResponse = await response.json()
        console.log(jsonResponse)
        setJoke({setup: jsonResponse.setup, punchline: jsonResponse.punchline})
    }
    getFirstJoke()    
    }, []) //ab har baar reload krne pr ek random joke bhi apne aap show ho jayega screen pr!

    return (
        <div>
            <h3>Joker!</h3>
            <h2>{joke.setup}</h2>
            <h2>{joke.punchline}</h2> 
            <button onClick={getNewJoke}>New Joke</button>
        </div>
    )
}

//sab chal rha hai, lekin ek dikkat hai - page refresh krne pr apan chahte hai ki ek naya random joke apne aap aa jaye screen pr, button click na krne pr bhi. Ho sakta hai  ki apan soche ki useState(getNewJoke) krke aisa ho jayega. Lekin jab apan browser ke components extension ke through dekhenge to Joker component ke hooks section mein apan ko State variable mein koi value nhi milegi, instead Promise milega. So Remember: useState mein initialization ke liye apan asynchronous function ko kabhi bhi pass nhi krte, kyuki unse hamein page ke UI mein uski value nhi dikhti. Isliye, agr first time initialization karana ho ya aisa hi koisa related kaam karana ho to we'll be using our useEffect hook.