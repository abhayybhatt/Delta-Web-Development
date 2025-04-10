// Forms in React: The standard way with Forms is to use Controlled Components. So we make React state to be the "single source of truth".

// React mein form elements thoda differently behave krte hai as compared to other DOM elements like div, h3, p, etc. Kyuki ye form elements apni khud ki ek "internal state" maintain krte hai, yaani in elements ke pass kuch khudka internal data hota hai aur kuch default behaviours aate hai jo hamare liye desirable na ho. For ex: agr form submit krte time apan koisa event track krte ho, to ekdum se page refresh ho jaata hai aur information gayab ho jaati hai as soon as we submit the form, jo ki forms ka default behaviour hai. Aisi internal state hamare liye necessarily ho sakta hai ki desirable na ho. Agr is tarah har ek element apni internal state maintain krega, to fir React ki state ka point hi kya? Isliye hamein aise elements ko "Controlled Components" banana padta hai. To aisa krne se React state ke through ham form elements ki states ko control kr paye, Jisse ki hamari React state hi bas "single source of truth" ho. To form input ko react ki state ke saath associate kr denge. 

// From React docs: 
// In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState(). We can combine the two by making the React state be the "single source of truth". Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a "controlled component".

import { useState } from "react"

export default function Form(){
    // let [fullName, setFullName] = useState('') //ye to ho gya single input ke liye, ab multiple inputs ko handle krne ke liye:
    let [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        password: '',
    })
 
    // let handleNameChange = (event) => {
    //     // console.log(event.target.value) //event.target yaani kaunse element ke andar apan ne change kiya aur value yaani kya new ya updated value apne pass aayi.
    //     setFullName(event.target.value) //ab setFullName function ki help se apan fullName ki value change kr denge, jo bhi apan ab type krenge usse, ab apan input ke andar changes kr payenge. 

    //     // Internal Flow, changes ke baad kuch aisa hai: 
    //     // 1. sabse pehle input ko change kiya, input onChange event ko trigger kr rha hai.
    //     // 2. onChange ke evoke hone pr apan handleNameChange function ki taraf jaa rhe hai.
    //     // 3. handleNameChange method setFullName method ko evoke kr rha hai.
    //     // 4. setFullName apne fullName state varibale ke andar changes laa rha hai.
    //     // 5. fullName state variable ki value apne input element mein use ho rhi hai. To jaise hi fullName state variable ke andar change hua, waise hi React ke andar re-rendering hoti hai, yaani upar se neeche tak code re-execute krega. To wo fullName ki updated value input ke andar change le aayegi.

    //     // Thus, aisa krne se apan ne fullName state variable ko "single source of truth" bana diya, to ab input ke andar ki internal state dekhne ki need nhi hai, bas fullName state variable ki value ko dekh lo. Thus, ab apna input component jo hai wo ek "controlled component" ban gya.
    // }

    //Single function for handling multiple inputs:

    let handleInputChange = (event) => { //iske andar 2 values use honi hai: 1. Kaunsi field yaani kya change hua hai. 2. us field ki kya nayi value aayi hai. To agr kisi field ka name chahiye hota hai to wo event.target.name se pata chal jaata hai. Rahi baat value ki to woh to event.target.value se pata chal hi jayegi.
        // let fieldName = event.target.name //ab kyuki ye fieldName event.target ke name attribute mein aa rha hai to input elements mein ek name property bhi rakhni padegi.
        // console.log(fieldName)
        // let newValue = event.target.value 
        // console.log(newValue)
        // ab kya krna hai? -> formData ke andar hamein apne state variable ko find krna hai using fieldName, aur uske andar newValue ko assign kr dena hai.
        // Ab yha pr kyuki we are dealing with objects, isliye hamein sirf object ki key hi nhi, pura object hi reconstruct krna padta hai tabhi hamare object ke andar change valid maana jaata hai:
        setFormData((currData) => {
            // currData[fieldName] = newValue //currData ke andar fieldName ko access kr rhe hai using [] brackets. Yha .fieldName krke access nhi krna kyuki jab kisi variable ko [] krke acceess krte hai to usko apan kehte hai Computed property name, yaani aap ek property ko access krne ki koshish kr rhe ho, pr aapke pass us property ka exact naam nhi hai, aapke pass ek variable hai jismein us property ka naam hai. Jaise ki fullName hai, wo to nhi hai pr fieldName krke ek variable hai jiske pass ye naam ho sakta hai. Thus, agr pehle apan [] use krte hai to pehle us variable ki value evaluate hogi, aur baad mein wo value fir use hogi.
            // // So remember: Agr kisi object mein kabhi bhi kisi fieldName ko React mein access krna ho to we'll use computed property value. Ab = krke uski value hamne newValue set kr di hai. Pr sirf key change krna is not enough. Ab hamein pura object return bhi krna padega:

            // return {...currData} //currData ke andar pehle change kara aur fir currData ko hi spread krke ek naya object return kr diya hai.

            // Better way to write the same above 2 lines:
             return {...currData,  //currData spread krke return kr rhe hai, pr usmein kya change kr denge? -> currData ke andar jo [fieldName] hai, use apan uski new value assign krke bhej denge:
                // [fieldName]: newValue
                [event.target.name]: event.target.value //wahi cheez hai, bas ab variable mein set krne ki jagah direct values hi pass kr di.
             }

            // Ab jaise hi formData ke andar change hoga, state re-render hogi, yaani value ke andar change aayega. Thus, is baar apne input ke andar changes reflect krengi. 
        })
    }

    let handleSubmit = (event) => {
        event.preventDefault() //ab default behaviour form ka prevent ho jayega. Ab agr input values ko submission ke baad empty krna hai to  we'll have to set everything to a new empty object with those keys:
        console.log(formData)
        setFormData({
            fullName: '',
            userName: '',
            password: '',
        })

        // Ab kyuki default behaviours ko prevent kr rhe hai aur sab kuch apne according control krna hai to aise additional changes krte rehna padega form ke andar (A small side-effect of having all additional functionalities that we're getting with React.)
    }

    return (
        <form onSubmit={handleSubmit}> {/*abhi bhi form ko submit krne se saari information gayab ho jayegi. Is default behaviour ko prevent krne ke liye onSubmit event handler add kiya jaa sakta hai. */}
            {/* Form labels in React: normally, apan html mein "for" attribute use kr lete hai form mein, aur input mein wahi for ki value id mein de dete hai dono ko connect krne ke liye. Lekin Js mein for apna reserved keyword hota hai(for loop), isliye React mein instead of for, htmlFor is used for the same. */}
            <label htmlFor="fullname">Full Name: </label> {/*ab jaise hi is Full Name pr click krenge to apna input box highlight ho jayega. */}
            {/* <input id="fullname" placeholder="Enter your Full Name" type="text" value={fullName} onChange={handleNameChange}/> ab is form ke input element ko apan ne fullName state variable ke saath associate kr diya using value={fullName}. Yaani ab jo bhi input value aa rhi hogi form se, wo hamare fullName state variable mein store hogi. Ab multiple inputs ke liye formData.fullName krenge value ko:*/} 
            <input id="fullname" placeholder="Enter your Full Name" type="text" value={formData.fullName} onChange={handleInputChange} name="fullName"/> {/*Remember: jo bhi name property ki value denge, wo uske corresponding State variable se match krna hi chahiye, koi aur random value name ko nhi de sakte. Reason: agr yha name ki value fullName hogi, tabhi to handleInputChange function mein event.target.name ki value fullName aayegi. Yaani same value return hogi waha jo yha pr apan ne di hai name ko. Isliye is fullName name ko apan use krenge for accessing our key"fullName" present within the object. */}

            <br /><br />

            <label htmlFor="username">User Name: </label>
            <input id="username" type="text" placeholder="Enter your Username" value={formData.userName} onChange={handleInputChange} name="userName" />

            <br /><br />

            <label htmlFor="password">Password: </label>
            <input id="password" type="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} name="password" /> 
            <br /><br />
            <button>Submit</button>
        </form>
    )
}

// Note: Har input element ke saath hamein ek naya state variable associate krna padta hai. 

// Handling Multiple Inputs:
// We create a common handlelnputChange() for all elements:
// event.target.name -> changed field
// event.target.value -> new value of the field

// jab bhi hamare form mein multiple inputs hote hai(jo ki generally hote hi hai), to ham ek common inputHandler banane ki koshish krte hai. Yaani ek single function jo sabhi input elements ke onChange event pr invoke ho rha hoga. Har event object pr kya field change hui hai(target) aur us field mein kya nayi value aayi hai(value) hoti hi hai. To isi cheez ko hamein ek common function mein push krna hai. Aur iske saath apan ko alag-alag state variables banana to padega, pr apan ek aisa object bana sakte hai jiske andar saari state variables store ho jaye. To ek single object variable hamare form ke saare state variables ko track krega.